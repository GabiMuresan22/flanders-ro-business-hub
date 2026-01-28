import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT = 5; // Max submissions per window
const RATE_LIMIT_WINDOW_HOURS = 24; // Per day

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

interface BusinessSubmission {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  description: string;
  category: string;
  website?: string;
  image_url?: string;
  opening_hours?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify JWT and get user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !authData?.user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = authData.user.id;

    // Get client IP for rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Check rate limit
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);

    const { count, error: countError } = await supabase
      .from('rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip)
      .eq('action_type', 'business_submission')
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
    const body: BusinessSubmission = await req.json();
    const { 
      business_name, owner_name, email, phone, address, 
      city, postal_code, description, category, website, 
      image_url, opening_hours 
    } = body;

    // Required field validation
    if (!business_name || !owner_name || !email || !phone || !address || !city || !postal_code || !description || !category) {
      return new Response(
        JSON.stringify({ success: false, error: 'All required fields must be provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Length validation
    if (business_name.length > 100 || owner_name.length > 100 || email.length > 255 || 
        phone.length > 20 || address.length > 200 || city.length > 100 || 
        postal_code.length > 20 || description.length > 2000 || category.length > 50) {
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
      action_type: 'business_submission',
    });

    // Insert business
    const { data: businessData, error: insertError } = await supabase
      .from('businesses')
      .insert({
        business_name,
        owner_name,
        email,
        phone,
        address,
        city,
        postal_code,
        description,
        category,
        website: website || null,
        image_url: image_url || null,
        status: 'pending',
        user_id: userId,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to submit business' }),
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
          subject: `New Business Submission: ${escapeHtml(business_name)}`,
          html: `
            <h1>New Business Submission</h1>
            <p>A new business has been submitted and is pending approval.</p>
            
            <h2>Business Details:</h2>
            <ul>
              <li><strong>Business Name:</strong> ${escapeHtml(business_name)}</li>
              <li><strong>Owner:</strong> ${escapeHtml(owner_name)}</li>
              <li><strong>Email:</strong> ${escapeHtml(email)}</li>
              <li><strong>Phone:</strong> ${escapeHtml(phone)}</li>
              <li><strong>Category:</strong> ${escapeHtml(category)}</li>
              <li><strong>City:</strong> ${escapeHtml(city)}</li>
            </ul>
            
            <p>Please log in to the admin dashboard to review and approve this submission.</p>
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
      JSON.stringify({ success: true, data: businessData }),
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
