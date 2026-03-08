import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { business_id } = await req.json();

    if (!business_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'business_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the business
    const { data: business, error: fetchError } = await supabase
      .from('businesses')
      .select('description, description_en, description_nl')
      .eq('id', business_id)
      .single();

    if (fetchError || !business) {
      return new Response(
        JSON.stringify({ success: false, error: 'Business not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const updates: Record<string, string> = {};
    const sourceText = business.description;

    if (!sourceText || sourceText.trim().length < 10) {
      return new Response(
        JSON.stringify({ success: true, message: 'Description too short to translate' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build translation prompts for missing languages
    const translations: { lang: string; field: string }[] = [];
    if (!business.description_en) translations.push({ lang: 'English', field: 'description_en' });
    if (!business.description_nl) translations.push({ lang: 'Dutch', field: 'description_nl' });

    if (translations.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'All translations already exist' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Translate all missing languages in a single prompt for efficiency
    const langList = translations.map(t => t.lang).join(' and ');
    const prompt = `Translate the following business description into ${langList}. 
Return ONLY a JSON object with the language as key and translated text as value, like:
${translations.map(t => `"${t.lang}": "translated text here"`).join(',\n')}

Keep the same tone, formatting, and line breaks. Do not add explanations.

Business description:
${sourceText}`;

    const translated = await callGeminiDirect(prompt);
    
    if (translated) {
      for (const t of translations) {
        if (translated[t.lang]) {
          updates[t.field] = translated[t.lang];
        }
      }
    }

    // Update the business with translations
    if (Object.keys(updates).length > 0) {
      const { error: updateError } = await supabase
        .from('businesses')
        .update(updates)
        .eq('id', business_id);

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to save translations' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, translated: Object.keys(updates) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function callGeminiDirect(prompt: string): Promise<Record<string, string> | null> {
  try {
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;
    // Use the Supabase project's AI proxy endpoint
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    
    const response = await fetch(`${supabaseUrl}/functions/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lovableApiKey}`,
        'x-lovable-model': 'google/gemini-2.5-flash-lite',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      // Fallback: try OpenAI-compatible format via the lovable proxy
      console.log('Primary AI call failed, trying alternative...');
      return await callGeminiFallback(prompt, lovableApiKey);
    }

    const data = await response.json();
    return parseTranslationResponse(data);
  } catch (error) {
    console.error('AI call failed:', error);
    return null;
  }
}

async function callGeminiFallback(prompt: string, apiKey: string): Promise<Record<string, string> | null> {
  try {
    // Try Google Generative Language API directly
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 2000 },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Gemini API error: ${response.status} - ${errText}`);
      return null;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return null;
    
    return parseJsonFromText(text);
  } catch (error) {
    console.error('Gemini fallback failed:', error);
    return null;
  }
}

function parseTranslationResponse(data: any): Record<string, string> | null {
  try {
    // Handle various response formats
    if (typeof data === 'string') return parseJsonFromText(data);
    if (data?.text) return parseJsonFromText(data.text);
    if (data?.choices?.[0]?.message?.content) return parseJsonFromText(data.choices[0].message.content);
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) return parseJsonFromText(data.candidates[0].content.parts[0].text);
    return null;
  } catch {
    return null;
  }
}

function parseJsonFromText(text: string): Record<string, string> | null {
  try {
    // Try to extract JSON from the text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch {
    console.error('Failed to parse translation JSON:', text);
    return null;
  }
}
