import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BusinessNotification {
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  category: string;
  city: string;
}

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
    const { business_name, owner_name, email, phone, category, city }: BusinessNotification = await req.json();

    console.log("Sending new business notification email...");

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
