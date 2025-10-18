import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { business_name, owner_name, email, phone, category, city }: BusinessNotification = await req.json();

    console.log("Sending new business notification email...");

    const emailResponse = await resend.emails.send({
      from: "Business Directory <onboarding@resend.dev>",
      to: ["admin@yourdomain.com"], // Replace with actual admin email
      subject: `New Business Submission: ${business_name}`,
      html: `
        <h1>New Business Submission</h1>
        <p>A new business has been submitted and is pending approval.</p>
        
        <h2>Business Details:</h2>
        <ul>
          <li><strong>Business Name:</strong> ${business_name}</li>
          <li><strong>Owner:</strong> ${owner_name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Category:</strong> ${category}</li>
          <li><strong>City:</strong> ${city}</li>
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
  } catch (error: any) {
    console.error("Error in notify-new-business function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
