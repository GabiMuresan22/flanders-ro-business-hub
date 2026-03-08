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

    // Use Lovable AI proxy for translation
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    for (const t of translations) {
      const translated = await translateWithLovableAI(lovableApiKey!, sourceText, t.lang);
      if (translated) {
        updates[t.field] = translated;
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

async function translateWithLovableAI(apiKey: string, text: string, targetLanguage: string): Promise<string | null> {
  try {
    // Use the Lovable AI gateway (OpenAI-compatible endpoint)
    const response = await fetch('https://lovable.dev/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-lite',
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Translate the following business description to ${targetLanguage}. Keep the same tone, formatting, and line breaks. Return ONLY the translated text, nothing else. Do not add any explanations or notes.`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`Lovable AI error (${targetLanguage}): ${response.status} - ${errText}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    return content || null;
  } catch (error) {
    console.error(`Translation failed for ${targetLanguage}:`, error);
    return null;
  }
}
