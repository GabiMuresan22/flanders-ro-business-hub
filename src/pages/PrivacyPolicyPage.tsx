import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: January 2025",
      intro: "Romanian Business Hub ('we', 'us', or 'our') respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information in compliance with the General Data Protection Regulation (GDPR).",
      sections: [
        {
          title: "1. Data Controller",
          content: "Romanian Business Hub is the data controller responsible for your personal data. For any questions regarding data protection, please contact us at: contact@romanianbusinesshub.com"
        },
        {
          title: "2. Personal Data We Collect",
          content: "We collect the following types of personal data:\n\n• Contact Information: Name, email address, phone number\n• Business Information: Business name, address, description, category\n• Account Data: Email, password (encrypted), authentication data\n• Usage Data: IP address, browser type, pages visited, time spent\n• Communication Data: Messages sent through contact forms, reviews, reports"
        },
        {
          title: "3. Legal Basis for Processing",
          content: "We process your personal data based on:\n\n• Consent: When you subscribe to newsletters or submit forms\n• Contract Performance: To provide services you requested\n• Legitimate Interests: To improve our services and prevent fraud\n• Legal Obligations: To comply with applicable laws"
        },
        {
          title: "4. How We Use Your Data",
          content: "Your personal data is used to:\n\n• Provide and maintain our business directory services\n• Process and display business listings\n• Send newsletters (with your consent)\n• Respond to contact inquiries and reports\n• Improve user experience and website functionality\n• Ensure security and prevent fraud\n• Comply with legal obligations"
        },
        {
          title: "5. Data Sharing",
          content: "We may share your data with:\n\n• Supabase: Our database and authentication provider (GDPR compliant)\n• Email Service Providers: For sending newsletters and notifications\n• Analytics Tools: For website performance analysis (anonymized when possible)\n\nWe do not sell your personal data to third parties."
        },
        {
          title: "6. Data Retention",
          content: "We retain your personal data for as long as necessary:\n\n• Account data: Until account deletion is requested\n• Business listings: Until removal is requested\n• Contact messages: 2 years from submission\n• Newsletter subscriptions: Until unsubscription\n• Analytics data: Up to 14 months"
        },
        {
          title: "7. Your Rights Under GDPR",
          content: "You have the right to:\n\n• Access: Request a copy of your personal data\n• Rectification: Correct inaccurate or incomplete data\n• Erasure: Request deletion of your data ('right to be forgotten')\n• Restriction: Limit how we use your data\n• Portability: Receive your data in a structured format\n• Objection: Object to processing based on legitimate interests\n• Withdraw Consent: At any time for consent-based processing\n\nTo exercise these rights, contact us at contact@romanianbusinesshub.com"
        },
        {
          title: "8. Data Security",
          content: "We implement appropriate technical and organizational measures to protect your data:\n\n• Encryption: Data transmitted via HTTPS\n• Secure Storage: Industry-standard database security\n• Access Controls: Limited access to authorized personnel\n• Regular Security Audits: Ongoing monitoring and updates"
        },
        {
          title: "9. Cookies and Tracking",
          content: "We use cookies for:\n\n• Essential Cookies: Required for website functionality (e.g., authentication)\n• Analytics Cookies: To understand how visitors use our site (with consent)\n• Preference Cookies: To remember your language and settings\n\nYou can manage cookie preferences through our cookie consent banner."
        },
        {
          title: "10. International Data Transfers",
          content: "Your data may be transferred outside the European Economic Area (EEA). We ensure appropriate safeguards are in place, including:\n\n• Standard Contractual Clauses (SCCs)\n• Adequacy decisions by the European Commission\n• GDPR-compliant service providers"
        },
        {
          title: "11. Children's Privacy",
          content: "Our services are not intended for individuals under 16 years of age. We do not knowingly collect personal data from children."
        },
        {
          title: "12. Data Breach Notification",
          content: "In the event of a data breach that poses a risk to your rights and freedoms, we will notify:\n\n• The Belgian Data Protection Authority (APD/GBA) within 72 hours\n• Affected individuals without undue delay\n• Details about the breach and remedial actions"
        },
        {
          title: "13. Changes to This Policy",
          content: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of any changes."
        },
        {
          title: "14. Supervisory Authority",
          content: "If you believe we have not handled your data properly, you have the right to lodge a complaint with:\n\nBelgian Data Protection Authority (APD/GBA)\nRue de la Presse 35, 1000 Brussels, Belgium\nWebsite: www.autoriteprotectiondonnees.be\nEmail: contact@apd-gba.be"
        },
        {
          title: "15. Contact Us",
          content: "For questions about this privacy policy or data protection matters:\n\nEmail: contact@romanianbusinesshub.com\nAddress: Romanian Business Hub, West Flanders, Belgium"
        }
      ]
    },
    ro: {
      title: "Politica de Confidențialitate",
      lastUpdated: "Ultima actualizare: ianuarie 2025",
      intro: "Romanian Business Hub ('noi' sau 'al nostru') respectă confidențialitatea dvs. și se angajează să vă protejeze datele personale. Această politică de confidențialitate explică modul în care colectăm, utilizăm și protejăm informațiile dvs. în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).",
      sections: [
        {
          title: "1. Operator de Date",
          content: "Romanian Business Hub este operatorul de date responsabil pentru datele dvs. personale. Pentru orice întrebări privind protecția datelor, vă rugăm să ne contactați la: contact@romanianbusinesshub.com"
        },
        {
          title: "2. Datele Personale pe Care le Colectăm",
          content: "Colectăm următoarele tipuri de date personale:\n\n• Informații de Contact: Nume, adresă de email, număr de telefon\n• Informații despre Afacere: Nume, adresă, descriere, categorie\n• Date de Cont: Email, parolă (criptată), date de autentificare\n• Date de Utilizare: Adresă IP, tip browser, pagini vizitate, timp petrecut\n• Date de Comunicare: Mesaje trimise prin formulare de contact, recenzii, rapoarte"
        },
        {
          title: "3. Baza Legală pentru Prelucrare",
          content: "Prelucram datele dvs. personale pe baza:\n\n• Consimțământ: Când vă abonați la newsletter sau trimiteți formulare\n• Executarea Contractului: Pentru a furniza serviciile solicitate\n• Interese Legitime: Pentru a îmbunătăți serviciile și preveni fraudele\n• Obligații Legale: Pentru a respecta legile aplicabile"
        },
        {
          title: "4. Cum Folosim Datele Dvs.",
          content: "Datele dvs. personale sunt folosite pentru:\n\n• Furnizarea și menținerea serviciilor directorului de afaceri\n• Procesarea și afișarea listărilor de afaceri\n• Trimiterea de newslettere (cu consimțământul dvs.)\n• Răspunsul la întrebări și rapoarte de contact\n• Îmbunătățirea experienței utilizatorului și funcționalității site-ului\n• Asigurarea securității și prevenirea fraudelor\n• Respectarea obligațiilor legale"
        },
        {
          title: "5. Partajarea Datelor",
          content: "Putem partaja datele dvs. cu:\n\n• Supabase: Furnizorul nostru de baze de date și autentificare (conform GDPR)\n• Furnizori de Servicii Email: Pentru trimiterea de newslettere și notificări\n• Instrumente de Analiză: Pentru analiza performanței site-ului (anonimizate când este posibil)\n\nNu vindem datele dvs. personale către terți."
        },
        {
          title: "6. Păstrarea Datelor",
          content: "Păstrăm datele dvs. personale atât timp cât este necesar:\n\n• Date de cont: Până la solicitarea ștergerii contului\n• Listări de afaceri: Până la solicitarea eliminării\n• Mesaje de contact: 2 ani de la trimitere\n• Abonamente newsletter: Până la dezabonare\n• Date analitice: Până la 14 luni"
        },
        {
          title: "7. Drepturile Dvs. conform GDPR",
          content: "Aveți dreptul la:\n\n• Acces: Solicitați o copie a datelor dvs. personale\n• Rectificare: Corectați datele inexacte sau incomplete\n• Ștergere: Solicitați ștergerea datelor dvs. ('dreptul de a fi uitat')\n• Restricționare: Limitați modul în care folosim datele dvs.\n• Portabilitate: Primiți datele dvs. într-un format structurat\n• Opoziție: Opuneți-vă prelucrării bazate pe interese legitime\n• Retragerea Consimțământului: În orice moment pentru prelucrarea bazată pe consimțământ\n\nPentru a exercita aceste drepturi, contactați-ne la contact@romanianbusinesshub.com"
        },
        {
          title: "8. Securitatea Datelor",
          content: "Implementăm măsuri tehnice și organizatorice adecvate pentru a vă proteja datele:\n\n• Criptare: Date transmise prin HTTPS\n• Stocare Securizată: Securitate standard a bazei de date\n• Controale de Acces: Acces limitat la personalul autorizat\n• Audituri de Securitate Regulate: Monitorizare și actualizări continue"
        },
        {
          title: "9. Cookie-uri și Urmărire",
          content: "Folosim cookie-uri pentru:\n\n• Cookie-uri Esențiale: Necesare pentru funcționalitatea site-ului (ex. autentificare)\n• Cookie-uri Analitice: Pentru a înțelege cum vizitatorii folosesc site-ul (cu consimțământ)\n• Cookie-uri de Preferințe: Pentru a reține limba și setările dvs.\n\nPuteți gestiona preferințele cookie-urilor prin bannerul nostru de consimțământ."
        },
        {
          title: "10. Transferuri Internaționale de Date",
          content: "Datele dvs. pot fi transferate în afara Spațiului Economic European (SEE). Ne asigurăm că există garanții adecvate, inclusiv:\n\n• Clauze Contractuale Standard (SCC)\n• Decizii de adecvare ale Comisiei Europene\n• Furnizori de servicii conformi cu GDPR"
        },
        {
          title: "11. Confidențialitatea Copiilor",
          content: "Serviciile noastre nu sunt destinate persoanelor sub 16 ani. Nu colectăm cu bună știință date personale de la copii."
        },
        {
          title: "12. Notificarea Încălcării Datelor",
          content: "În cazul unei încălcări a datelor care prezintă un risc pentru drepturile și libertățile dvs., vom notifica:\n\n• Autoritatea Belgiană pentru Protecția Datelor (APD/GBA) în termen de 72 de ore\n• Persoanele afectate fără întârzieri nejustificate\n• Detalii despre încălcare și acțiunile corective"
        },
        {
          title: "13. Modificări ale Acestei Politici",
          content: "Putem actualiza această politică de confidențialitate din când în când. Modificările vor fi postate pe această pagină cu o dată de revizuire actualizată. Utilizarea continuă a serviciilor noastre constituie acceptarea oricăror modificări."
        },
        {
          title: "14. Autoritatea de Supraveghere",
          content: "Dacă credeți că nu am gestionat datele dvs. în mod corespunzător, aveți dreptul de a depune o plângere la:\n\nAutoritatea Belgiană pentru Protecția Datelor (APD/GBA)\nRue de la Presse 35, 1000 Bruxelles, Belgia\nSite web: www.autoriteprotectiondonnees.be\nEmail: contact@apd-gba.be"
        },
        {
          title: "15. Contactați-ne",
          content: "Pentru întrebări despre această politică de confidențialitate sau probleme de protecție a datelor:\n\nEmail: contact@romanianbusinesshub.com\nAdresă: Romanian Business Hub, Flandra de Vest, Belgia"
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content];

  return (
    <>
      <SEO
        title={`${currentContent.title} - Romanian Business Hub`}
        description="Privacy Policy and GDPR compliance information for Romanian Business Hub"
        canonicalUrl="/privacy-policy"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">{currentContent.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{currentContent.lastUpdated}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-foreground">{currentContent.intro}</p>
              
              {currentContent.sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <p className="text-foreground whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
