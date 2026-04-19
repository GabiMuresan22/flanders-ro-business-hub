import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAntiSpam } from "@/hooks/useAntiSpam";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReportIssueDialogProps {
  businessId: string;
  businessName: string;
}

type Lang = "ro" | "en" | "nl";

const t = {
  ro: {
    button: "Raportează",
    title: "Raportează un conținut",
    description: "Notifică-ne despre conținut presupus ilegal sau incorect privind {name}. Conform articolului 16 din Regulamentul UE privind Serviciile Digitale (DSA), vom analiza raportul prompt și te vom informa despre decizie.",
    contentUrl: "URL-ul conținutului raportat",
    name: "Numele tău",
    email: "Adresa ta de email",
    issueType: "Categoria notificării",
    issuePlaceholder: "Selectează categoria",
    cats: {
      illegal_content: "Conținut ilegal",
      incorrect_info: "Informații incorecte",
      closed_business: "Afacere închisă",
      wrong_location: "Locație/adresă greșită",
      wrong_contact: "Contact greșit",
      inappropriate: "Conținut inadecvat",
      ip_violation: "Încălcare drepturi de proprietate intelectuală",
      scam: "Fraudă / înșelătorie",
      other: "Altele",
    },
    explanation: "Explică de ce consideri conținutul ilegal sau incorect",
    explanationPh: "Furnizează detalii clare și complete despre motivul notificării...",
    goodFaith: "Confirm, în bună-credință, că informațiile și acuzațiile din această notificare sunt exacte și complete.",
    privacy: "Datele tale (nume, email) sunt prelucrate exclusiv pentru a procesa această notificare conform DSA și a-ți comunica decizia. Vezi Politica de Confidențialitate pentru detalii.",
    cancel: "Anulează",
    submit: "Trimite raportul",
    submitting: "Se trimite...",
    success: "Raport trimis",
    successDesc: "Mulțumim. Ai primit pe email o confirmare a notificării. Vom analiza raportul în cel mai scurt timp.",
    missing: "Informații lipsă",
    missingDesc: "Te rugăm să completezi toate câmpurile obligatorii.",
    goodFaithRequired: "Trebuie să confirmi declarația de bună-credință pentru a trimite raportul.",
    error: "Eroare",
    errorDesc: "Trimiterea a eșuat. Încearcă din nou.",
  },
  en: {
    button: "Report",
    title: "Report content",
    description: "Notify us about allegedly illegal or incorrect content regarding {name}. Pursuant to Article 16 of the EU Digital Services Act (DSA), we will review your notice expeditiously and inform you of our decision.",
    contentUrl: "URL of the reported content",
    name: "Your name",
    email: "Your email address",
    issueType: "Notice category",
    issuePlaceholder: "Select category",
    cats: {
      illegal_content: "Illegal content",
      incorrect_info: "Incorrect information",
      closed_business: "Business closed",
      wrong_location: "Wrong location/address",
      wrong_contact: "Wrong contact details",
      inappropriate: "Inappropriate content",
      ip_violation: "Intellectual property infringement",
      scam: "Scam / fraud",
      other: "Other",
    },
    explanation: "Explain why you consider the content illegal or incorrect",
    explanationPh: "Provide a clear and complete explanation of the reasons for your notice...",
    goodFaith: "I confirm, in good faith, that the information and allegations contained in this notice are accurate and complete.",
    privacy: "Your data (name, email) is processed solely to handle this notice under the DSA and to communicate our decision to you. See the Privacy Policy for details.",
    cancel: "Cancel",
    submit: "Submit report",
    submitting: "Submitting...",
    success: "Report submitted",
    successDesc: "Thank you. A confirmation has been sent to your email. We will review your report promptly.",
    missing: "Missing information",
    missingDesc: "Please fill in all required fields.",
    goodFaithRequired: "You must confirm the good-faith statement to submit the report.",
    error: "Error",
    errorDesc: "Submission failed. Please try again.",
  },
  nl: {
    button: "Melden",
    title: "Inhoud melden",
    description: "Meld ons vermeend illegale of onjuiste inhoud over {name}. Op grond van artikel 16 van de EU Digital Services Act (DSA) zullen we je melding zorgvuldig beoordelen en je informeren over onze beslissing.",
    contentUrl: "URL van de gemelde inhoud",
    name: "Je naam",
    email: "Je e-mailadres",
    issueType: "Categorie van de melding",
    issuePlaceholder: "Kies categorie",
    cats: {
      illegal_content: "Illegale inhoud",
      incorrect_info: "Onjuiste informatie",
      closed_business: "Bedrijf gesloten",
      wrong_location: "Verkeerde locatie/adres",
      wrong_contact: "Verkeerde contactgegevens",
      inappropriate: "Ongepaste inhoud",
      ip_violation: "Inbreuk op intellectueel eigendom",
      scam: "Oplichting / fraude",
      other: "Andere",
    },
    explanation: "Leg uit waarom je de inhoud illegaal of onjuist vindt",
    explanationPh: "Geef een duidelijke en volledige uitleg van de redenen voor je melding...",
    goodFaith: "Ik bevestig te goeder trouw dat de informatie en beweringen in deze melding juist en volledig zijn.",
    privacy: "Je gegevens (naam, e-mail) worden alleen verwerkt om deze melding op grond van de DSA te behandelen en onze beslissing aan je mee te delen. Zie het Privacybeleid voor details.",
    cancel: "Annuleren",
    submit: "Melding versturen",
    submitting: "Versturen...",
    success: "Melding verzonden",
    successDesc: "Bedankt. Een bevestiging is naar je e-mail gestuurd. We beoordelen je melding zo snel mogelijk.",
    missing: "Ontbrekende informatie",
    missingDesc: "Vul alle verplichte velden in.",
    goodFaithRequired: "Je moet de verklaring te goeder trouw bevestigen om de melding te versturen.",
    error: "Fout",
    errorDesc: "Verzenden mislukt. Probeer opnieuw.",
  },
};

export const ReportIssueDialog = ({ businessId, businessName }: ReportIssueDialogProps) => {
  const { language } = useLanguage();
  const lang = (["ro", "en", "nl"].includes(language) ? language : "ro") as Lang;
  const tr = t[lang];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [goodFaith, setGoodFaith] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { honeypotField, validateSubmission } = useAntiSpam();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = await validateSubmission();
    if (!validation.isValid) {
      toast({ title: tr.error, description: validation.error, variant: "destructive" });
      return;
    }

    if (!name || !email || !issueType || !description) {
      toast({ title: tr.missing, description: tr.missingDesc, variant: "destructive" });
      return;
    }
    if (!goodFaith) {
      toast({ title: tr.missing, description: tr.goodFaithRequired, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const contentUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: inserted, error } = await supabase
        .from("business_reports")
        .insert({
          business_id: businessId,
          user_id: user?.id || null,
          reporter_email: email,
          reporter_name: name,
          issue_type: issueType,
          description,
          acknowledged_good_faith: goodFaith,
          content_url: contentUrl,
        })
        .select("id")
        .single();

      if (error) throw error;

      // Fire confirmation email (DSA Art. 16(4)) — non-blocking for UX
      supabase.functions
        .invoke("notify-content-report", {
          body: {
            reportId: inserted?.id,
            reporterEmail: email,
            reporterName: name,
            businessName,
            businessUrl: contentUrl,
            issueType: tr.cats[issueType as keyof typeof tr.cats] ?? issueType,
            description,
            language: lang,
          },
        })
        .catch((err) => {
          if (import.meta.env.DEV) console.error("notify-content-report failed", err);
        });

      toast({ title: tr.success, description: tr.successDesc });

      setName("");
      setEmail("");
      setIssueType("");
      setDescription("");
      setGoodFaith(false);
      setOpen(false);
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error submitting report:", error);
      toast({ title: tr.error, description: tr.errorDesc, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <AlertTriangle className="h-4 w-4 mr-2" />
          {tr.button}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tr.title}</DialogTitle>
          <DialogDescription>
            {tr.description.replace("{name}", businessName)}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input {...honeypotField} onChange={(e) => honeypotField.onChange(e.target.value)} />

          <div className="space-y-2">
            <Label htmlFor="content-url">{tr.contentUrl}</Label>
            <Input
              id="content-url"
              value={typeof window !== "undefined" ? window.location.href : ""}
              readOnly
              className="bg-muted text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reporter-name">{tr.name} *</Label>
              <Input id="reporter-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reporter-email">{tr.email} *</Label>
              <Input id="reporter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue-type">{tr.issueType} *</Label>
            <Select value={issueType} onValueChange={setIssueType} required>
              <SelectTrigger id="issue-type">
                <SelectValue placeholder={tr.issuePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(tr.cats).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{tr.explanation} *</Label>
            <Textarea
              id="description"
              placeholder={tr.explanationPh}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 p-3">
            <Checkbox
              id="good-faith"
              checked={goodFaith}
              onCheckedChange={(v) => setGoodFaith(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="good-faith" className="text-sm font-normal leading-snug cursor-pointer">
              {tr.goodFaith} *
            </Label>
          </div>

          <p className="text-xs text-muted-foreground">{tr.privacy}</p>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {tr.cancel}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tr.submitting : tr.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
