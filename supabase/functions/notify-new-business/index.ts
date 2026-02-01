import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "resend";

const ALLOWED_ORIGIN = "https://www.ro-businesshub.be";
const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jsonHeaders = { "Content-Type": "application/json", ...corsHeaders };

function getResend() {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");
  return new Resend(apiKey);
}

interface BusinessNotification {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  category: string;
  city: string;
}

const MAX_LENGTHS = {
  business_name: 100,
  owner_name: 100,
  email: 255,
  phone: 20,
  category: 50,
  city: 100,
} as const;

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication: only authenticated users can trigger admin notifications
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: jsonHeaders }
      );
    }
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authData?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: jsonHeaders }
      );
    }

    const body: unknown = await req.json();
    if (!body || typeof body !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: jsonHeaders }
      );
    }
    const { business_name, owner_name, email, phone, category, city } = body as BusinessNotification;

    // Validate required fields and lengths to prevent abuse
    const required = { business_name, owner_name, email, phone, category, city };
    for (const [key, value] of Object.entries(required)) {
      if (typeof value !== "string" || !value.trim()) {
        return new Response(
          JSON.stringify({ error: `Missing or invalid field: ${key}` }),
          { status: 400, headers: jsonHeaders }
        );
      }
      const maxLen = MAX_LENGTHS[key as keyof typeof MAX_LENGTHS];
      if (maxLen != null && value.length > maxLen) {
        return new Response(
          JSON.stringify({ error: `Field ${key} exceeds maximum length` }),
          { status: 400, headers: jsonHeaders }
        );
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: jsonHeaders }
      );
    }

    console.log("Sending new business notification email...");

    const resend = getResend();
    const emailResponse = await resend.emails.send({
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

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in notify-new-business function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

Deno.serve(handler);
