import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify the user is an admin
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(
      authHeader.replace('Bearer ', '')
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = claimsData.claims.sub as string;

    // Check admin role using service client
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    const { data: roleData } = await serviceClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { subject, content, fromEmail } = await req.json();

    if (!subject || !content) {
      return new Response(JSON.stringify({ error: 'Subject and content are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch all subscribers
    const { data: subscribers, error: subError } = await serviceClient
      .from('newsletter_subscribers')
      .select('email');

    if (subError) {
      console.error('Error fetching subscribers:', subError);
      return new Response(JSON.stringify({ error: 'Failed to fetch subscribers' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ error: 'No subscribers found', sent: 0 }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const unsubscribeBaseUrl = `${supabaseUrl}/functions/v1/unsubscribe-newsletter`;

    // Build branded HTML email per subscriber (with personalized unsubscribe link)
    const buildHtml = (subscriberEmail: string) => {
      const token = btoa(subscriberEmail);
      const unsubscribeUrl = `${unsubscribeBaseUrl}?token=${encodeURIComponent(token)}`;

      return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#002B7F;padding:30px 40px;text-align:center;border-radius:8px 8px 0 0;">
              <h1 style="margin:0;color:#FCD116;font-size:24px;font-weight:bold;">RO BusinessHub</h1>
              <p style="margin:8px 0 0;color:#ffffff;font-size:14px;">De Roemeense Gemeenschap in België</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color:#f8f9fa;padding:40px;border-left:1px solid #e9ecef;border-right:1px solid #e9ecef;">
              <h2 style="margin:0 0 20px;color:#1a1a1a;font-size:20px;">${safeSubject}</h2>
              <div style="color:#4a4a4a;font-size:15px;line-height:1.6;">
                ${content}
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#002B7F;padding:24px 40px;text-align:center;border-radius:0 0 8px 8px;">
              <p style="margin:0;color:#ffffff;font-size:12px;">
                &copy; ${new Date().getFullYear()} RO BusinessHub. All rights reserved.
              </p>
              <p style="margin:8px 0 0;color:#ffffff80;font-size:11px;">
                You received this email because you subscribed to our newsletter.
              </p>
              <p style="margin:12px 0 0;">
                <a href="${unsubscribeUrl}" style="color:#FCD116;font-size:12px;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
    };

    // Send emails in batches of 50
    const batchSize = 50;
    let sentCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      try {
        const res = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            batch.map(s => ({
              from: senderEmail,
              to: s.email,
              subject: subject,
              html: buildHtml(s.email),
              headers: {
                'List-Unsubscribe': `<${unsubscribeBaseUrl}?token=${encodeURIComponent(btoa(s.email))}>`,
              },
            }))
          ),
        });

        const resBody = await res.text();

        if (res.ok) {
          sentCount += batch.length;
        } else {
          console.error(`Batch send failed [${res.status}]:`, resBody);
          failedCount += batch.length;
          errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${resBody}`);
        }
      } catch (batchError) {
        console.error('Batch error:', batchError);
        failedCount += batch.length;
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${String(batchError)}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: sentCount > 0,
        sent: sentCount,
        failed: failedCount,
        total: subscribers.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Newsletter send error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
