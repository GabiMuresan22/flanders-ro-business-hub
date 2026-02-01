import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from "resend";

const ALLOWED_ORIGIN = 'https://www.ro-businesshub.be';
const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT = 3; // Max submissions
const RATE_LIMIT_WINDOW_HOURS = 1; // Per hour

// HTML escape function to prevent injection
const escapeHtml = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get client IP
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Check rate limit
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);

    const { count, error: countError } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('action_type', 'contact')
      .gte('created_at', windowStart.toISOString());

    if (countError) {
      console.error('Rate limit check error:', countError);
    }

    if (count !== null && count >= RATE_LIMIT) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Too many submissions. Please try again later.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse and validate input
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'All fields are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Basic validation
    if (name.length > 100 || email.length > 255 || subject.length > 200 || message.length > 2000) {
      return new Response(
        JSON.stringify({ success: false, error: 'Field exceeds maximum length' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record rate limit entry
    await supabase.from('rate_limits').insert({
      ip_address: ip,
      action_type: 'contact',
    });

    // Insert contact message
    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert({ name, email, subject, message });

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit message' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Send email notification to admin (non-blocking)
    try {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Business Directory <onboarding@resend.dev>",
          to: ["gabimuresan2289@gmail.com"],
          subject: `New Contact Message: ${escapeHtml(subject)}`,
          html: `
            <h1>New Contact Message</h1>
            <p>A new contact message has been received.</p>
            
            <h2>Message Details:</h2>
            <ul>
              <li><strong>From:</strong> ${escapeHtml(name)}</li>
              <li><strong>Email:</strong> ${escapeHtml(email)}</li>
              <li><strong>Subject:</strong> ${escapeHtml(subject)}</li>
            </ul>
            
            <h3>Message:</h3>
            <p>${escapeHtml(message)}</p>
            
            <p>Please log in to the admin dashboard to respond to this message.</p>
          `,
        });
        console.log("Admin notification email sent successfully");
      }
    } catch (emailError) {
      // Log but don't fail the submission
      console.error("Failed to send notification email:", emailError);
    }

    // Cleanup old rate limit entries periodically (1% chance per request)
    if (Math.random() < 0.01) {
      await supabase.rpc('cleanup_old_rate_limits');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
