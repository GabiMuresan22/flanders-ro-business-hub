import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Support both GET (from email link) and POST
    let email: string | null = null;

    if (req.method === 'GET') {
      const url = new URL(req.url);
      const token = url.searchParams.get('token');
      if (token) {
        // Token is base64-encoded email
        try {
          email = atob(token);
        } catch {
          email = null;
        }
      }
    } else {
      const body = await req.json();
      email = body.email || null;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Return a user-friendly HTML page for GET requests
      if (req.method === 'GET') {
        return new Response(unsubscribePageHtml('Invalid unsubscribe link.', false), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Delete the subscriber
    const { error } = await supabase
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email.toLowerCase());

    if (error) {
      console.error('Unsubscribe error:', error);
      if (req.method === 'GET') {
        return new Response(unsubscribePageHtml('Something went wrong. Please try again later.', false), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      return new Response(JSON.stringify({ error: 'Failed to unsubscribe' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Success
    if (req.method === 'GET') {
      return new Response(unsubscribePageHtml('You have been successfully unsubscribed from our newsletter.', true), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function unsubscribePageHtml(message: string, success: boolean): string {
  const icon = success
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe - RO BusinessHub</title>
  <style>
    body { margin:0; padding:0; font-family:Arial,Helvetica,sans-serif; background:#f8f9fa; display:flex; align-items:center; justify-content:center; min-height:100vh; }
    .card { background:white; border-radius:12px; padding:48px; max-width:480px; text-align:center; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
    .icon { margin-bottom:24px; }
    h1 { color:#002B7F; font-size:24px; margin:0 0 16px; }
    p { color:#4a4a4a; font-size:16px; line-height:1.5; margin:0 0 24px; }
    a { display:inline-block; background:#002B7F; color:white; text-decoration:none; padding:12px 32px; border-radius:8px; font-weight:bold; }
    a:hover { background:#001d56; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>RO BusinessHub</h1>
    <p>${message}</p>
    <a href="https://www.ro-businesshub.be">Back to Website</a>
  </div>
</body>
</html>`;
}
