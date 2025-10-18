import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotification {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactNotification = await req.json();

    console.log("Sending new contact message notification email...");

    const emailResponse = await resend.emails.send({
      from: "Business Directory <onboarding@resend.dev>",
      to: ["admin@yourdomain.com"], // Replace with actual admin email
      subject: `New Contact Message: ${subject}`,
      html: `
        <h1>New Contact Message</h1>
        <p>A new contact message has been received.</p>
        
        <h2>Message Details:</h2>
        <ul>
          <li><strong>From:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>
        
        <h3>Message:</h3>
        <p>${message}</p>
        
        <p>Please log in to the admin dashboard to respond to this message.</p>
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
    console.error("Error in notify-new-contact function:", error);
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
