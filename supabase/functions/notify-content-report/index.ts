import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (c) => map[c] || c);
};

interface ReportPayload {
  reportId?: string;
  reporterEmail: string;
  reporterName: string;
  businessName: string;
  businessUrl: string;
  issueType: string;
  description: string;
  language?: 'ro' | 'en' | 'nl';
}

const subjects = {
  ro: 'Confirmare: am primit raportul tău',
  en: 'Confirmation: your report has been received',
  nl: 'Bevestiging: we hebben je melding ontvangen',
};

const buildUserEmail = (p: ReportPayload, lang: 'ro' | 'en' | 'nl') => {
  const intros = {
    ro: `Bună ${escapeHtml(p.reporterName)},<br><br>Am primit raportul tău despre <strong>${escapeHtml(p.businessName)}</strong>. În conformitate cu articolul 16 al Regulamentului UE privind Serviciile Digitale (DSA), vom analiza notificarea în mod prompt și diligent și îți vom comunica decizia noastră.`,
    en: `Hello ${escapeHtml(p.reporterName)},<br><br>We have received your report about <strong>${escapeHtml(p.businessName)}</strong>. In accordance with Article 16 of the EU Digital Services Act (DSA), we will review your notice expeditiously and diligently, and we will inform you of our decision.`,
    nl: `Hallo ${escapeHtml(p.reporterName)},<br><br>We hebben je melding ontvangen over <strong>${escapeHtml(p.businessName)}</strong>. In overeenstemming met artikel 16 van de EU Digital Services Act (DSA) zullen we je melding zorgvuldig en snel beoordelen en je op de hoogte brengen van onze beslissing.`,
  };
  const labels = {
    ro: { ref: 'Referință raport', cat: 'Categorie', desc: 'Descriere', url: 'Conținut raportat', closing: 'Mulțumim,<br>Echipa RO Business Hub' },
    en: { ref: 'Report reference', cat: 'Category', desc: 'Description', url: 'Reported content', closing: 'Thank you,<br>RO Business Hub Team' },
    nl: { ref: 'Meldingsreferentie', cat: 'Categorie', desc: 'Beschrijving', url: 'Gemelde inhoud', closing: 'Bedankt,<br>RO Business Hub Team' },
  };
  const l = labels[lang];
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1f2937;">
      <div style="background: #002B7F; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">RO Business Hub</h1>
      </div>
      <div style="padding: 24px; background: #ffffff;">
        <p style="font-size: 14px; line-height: 1.6;">${intros[lang]}</p>
        <table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          ${p.reportId ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${l.ref}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(p.reportId)}</td></tr>` : ''}
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${l.cat}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(p.issueType)}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><strong>${l.url}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e5e7eb;"><a href="${escapeHtml(p.businessUrl)}" style="color:#002B7F;">${escapeHtml(p.businessUrl)}</a></td></tr>
          <tr><td style="padding: 8px; vertical-align: top;"><strong>${l.desc}:</strong></td><td style="padding: 8px;">${escapeHtml(p.description).replace(/\n/g, '<br>')}</td></tr>
        </table>
        <p style="font-size: 13px; color: #6b7280;">${l.closing}</p>
      </div>
    </div>
  `;
};

const buildAdminEmail = (p: ReportPayload) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px;">
    <h2 style="color:#002B7F;">New DSA Content Report</h2>
    ${p.reportId ? `<p><strong>Report ID:</strong> ${escapeHtml(p.reportId)}</p>` : ''}
    <p><strong>Business:</strong> ${escapeHtml(p.businessName)}</p>
    <p><strong>URL:</strong> <a href="${escapeHtml(p.businessUrl)}">${escapeHtml(p.businessUrl)}</a></p>
    <p><strong>Reporter:</strong> ${escapeHtml(p.reporterName)} &lt;${escapeHtml(p.reporterEmail)}&gt;</p>
    <p><strong>Category:</strong> ${escapeHtml(p.issueType)}</p>
    <p><strong>Description:</strong></p>
    <blockquote style="border-left:3px solid #002B7F; padding-left:12px; color:#374151;">${escapeHtml(p.description).replace(/\n/g, '<br>')}</blockquote>
    <p style="color:#6b7280;font-size:12px;">Per DSA Art. 16, review expeditiously and notify the reporter of your decision.</p>
  </div>
`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const payload = (await req.json()) as ReportPayload;
    const lang = (payload.language && ['ro', 'en', 'nl'].includes(payload.language)) ? payload.language : 'ro';

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) throw new Error('RESEND_API_KEY missing');
    const resend = new Resend(resendKey);

    const FROM = 'RO Business Hub <info@ro-businesshub.be>';
    const ADMIN = 'info@ro-businesshub.be';

    // Confirmation to reporter (DSA Art. 16(4))
    await resend.emails.send({
      from: FROM,
      to: payload.reporterEmail,
      subject: subjects[lang],
      html: buildUserEmail(payload, lang),
    });

    // Notify admin
    await resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `[DSA Report] ${payload.businessName}`,
      html: buildAdminEmail(payload),
      reply_to: payload.reporterEmail,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
