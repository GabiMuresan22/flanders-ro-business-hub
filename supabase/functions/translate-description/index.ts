/**
 * Translates business description RO → EN or NL using DeepL API.
 * Set secret: DEEPL_AUTH_KEY (DeepL Free: https://www.deepl.com/pro-api)
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_CHARS = 8000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const deeplKey = Deno.env.get('DEEPL_AUTH_KEY')?.trim();
  if (!deeplKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'NOT_CONFIGURED',
        message: 'DEEPL_AUTH_KEY is not set on the project.',
      }),
      { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !authData?.user) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: { text?: string; target?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const target = body.target === 'EN' || body.target === 'NL' ? body.target : null;

  if (!text || text.length < 10) {
    return new Response(JSON.stringify({ success: false, error: 'TEXT_TOO_SHORT' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!target) {
    return new Response(JSON.stringify({ success: false, error: 'INVALID_TARGET' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (text.length > MAX_CHARS) {
    return new Response(JSON.stringify({ success: false, error: 'TEXT_TOO_LONG' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Free plan: api-free.deepl.com — Pro: set DEEPL_USE_PRO=true
  const usePro = Deno.env.get('DEEPL_USE_PRO') === 'true';
  const deeplUrl = usePro
    ? 'https://api.deepl.com/v2/translate'
    : 'https://api-free.deepl.com/v2/translate';

  const res = await fetch(deeplUrl, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${deeplKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      source_lang: 'RO',
      target_lang: target,
      preserve_formatting: true,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error('DeepL error', res.status, errText);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'TRANSLATION_FAILED',
        message: 'DeepL API returned an error.',
      }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const data = (await res.json()) as {
    translations?: Array<{ text: string }>;
  };
  const translated = data.translations?.[0]?.text;
  if (!translated) {
    return new Response(JSON.stringify({ success: false, error: 'EMPTY_RESULT' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({ success: true, text: translated }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
