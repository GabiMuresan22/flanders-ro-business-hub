import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const CookiePolicyPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Cookie Policy",
      lastUpdated: "Last updated: January 2025",
      intro: "This Cookie Policy explains what cookies are, how Romanian Business Hub uses them, and your choices regarding cookies. By continuing to use our website, you consent to our use of cookies as described in this policy.",
      sections: [
        {
          title: "1. What Are Cookies?",
          content: "Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work, or work more efficiently, and to provide information to the site owners.\n\nCookies can be:\n• Session cookies: Temporary cookies that expire when you close your browser\n• Persistent cookies: Remain on your device for a set period or until you delete them\n• First-party cookies: Set by the website you are visiting\n• Third-party cookies: Set by a domain other than the one you are visiting"
        },
        {
          title: "2. How We Use Cookies",
          content: "Romanian Business Hub uses cookies for the following purposes:\n\n• Website functionality: To ensure the website operates correctly\n• Authentication: To keep you logged in during your session\n• Language preferences: To remember your language selection\n• Analytics: To understand how visitors use our site (with your consent)\n• Security: To protect against fraudulent activity"
        },
        {
          title: "3. Types of Cookies We Use",
          content: "Essential Cookies (Always Active)\nThese cookies are necessary for the website to function. They cannot be disabled.\n• Authentication session management\n• Security tokens\n• Language preference storage\n\nAnalytical / Performance Cookies (Requires Consent)\nThese cookies help us understand how visitors interact with our website.\n• Google Analytics: Tracks page views, session duration, and user behavior\n• These cookies collect anonymized data\n\nMarketing Cookies (Requires Consent)\nThese cookies may be used to deliver relevant advertisements.\n• Social media sharing features\n• Advertising network cookies"
        },
        {
          title: "4. Specific Cookies We Use",
          content: "Essential cookies:\n• cookieConsent – Stores your cookie preferences (expires: 1 year)\n• sb-access-token – Supabase authentication token (session)\n• sb-refresh-token – Supabase session refresh token (session)\n\nAnalytics cookies (with consent):\n• _ga – Google Analytics identifier (expires: 2 years)\n• _ga_* – Google Analytics session cookie (expires: 2 years)\n• _gid – Google Analytics daily identifier (expires: 24 hours)"
        },
        {
          title: "5. Third-Party Cookies",
          content: "We use services from third parties that may set cookies on your device:\n\n• Google Analytics (Alphabet Inc.): For website analytics. Privacy policy: https://policies.google.com/privacy\n• Supabase: For authentication and database services. Privacy policy: https://supabase.com/privacy\n\nWe do not control third-party cookies. Please refer to the respective privacy policies."
        },
        {
          title: "6. Your Cookie Choices",
          content: "You have the following options to manage cookies:\n\n• Cookie Consent Banner: When you first visit our website, you will see a cookie consent banner where you can accept or reject non-essential cookies.\n• Browser Settings: Most browsers allow you to block or delete cookies through their settings menu. Note that blocking essential cookies may affect website functionality.\n• Opt-Out Tools: You can opt out of Google Analytics tracking at https://tools.google.com/dlpage/gaoptout\n\nTo manage your preferences at any time, you can clear your browser cookies and the consent banner will reappear on your next visit."
        },
        {
          title: "7. Cookie Retention",
          content: "Different cookies are retained for different periods:\n\n• Session cookies: Deleted when you close your browser\n• Preference cookies: Up to 1 year\n• Analytics cookies: Up to 2 years (as set by Google Analytics)\n• Authentication cookies: Duration of your session\n\nYou can delete all cookies at any time through your browser settings."
        },
        {
          title: "8. Legal Basis",
          content: "Under the GDPR and ePrivacy Directive:\n\n• Essential cookies: Processed on the basis of legitimate interest (necessary for the website to function)\n• Analytics and marketing cookies: Processed on the basis of your consent\n\nYou can withdraw your consent at any time by clearing your cookie preferences."
        },
        {
          title: "9. Updates to This Policy",
          content: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with a new 'last updated' date. We encourage you to review this policy periodically."
        },
        {
          title: "10. Contact Us",
          content: "If you have questions about our use of cookies or this Cookie Policy, please contact us:\n\nEmail: contact@romanianbusinesshub.com\nAddress: Romanian Business Hub, West Flanders, Belgium"
        }
      ]
    },
    ro: {
      title: "Politica privind Cookie-urile",
      lastUpdated: "Ultima actualizare: ianuarie 2025",
      intro: "Această Politică privind Cookie-urile explică ce sunt cookie-urile, cum le folosește Romanian Business Hub și opțiunile dvs. în ceea ce privește cookie-urile. Prin continuarea utilizării site-ului nostru, consimțiți la utilizarea cookie-urilor conform acestei politici.",
      sections: [
        {
          title: "1. Ce sunt Cookie-urile?",
          content: "Cookie-urile sunt fișiere text mici plasate pe dispozitivul dvs. (computer, tabletă sau mobil) când vizitați un site web. Sunt utilizate pe scară largă pentru a face site-urile să funcționeze eficient și pentru a furniza informații proprietarilor de site-uri.\n\nCookie-urile pot fi:\n• Cookie-uri de sesiune: Cookie-uri temporare care expiră la închiderea browserului\n• Cookie-uri persistente: Rămân pe dispozitivul dvs. pentru o perioadă determinată\n• Cookie-uri de primă parte: Setate de site-ul pe care îl vizitați\n• Cookie-uri de terță parte: Setate de un domeniu diferit"
        },
        {
          title: "2. Cum folosim Cookie-urile",
          content: "Romanian Business Hub utilizează cookie-uri pentru:\n\n• Funcționalitatea site-ului: Pentru a asigura funcționarea corectă\n• Autentificare: Pentru a vă menține conectat în timpul sesiunii\n• Preferințe de limbă: Pentru a vă reține selecția limbii\n• Analiză: Pentru a înțelege cum vizitatorii folosesc site-ul (cu consimțământul dvs.)\n• Securitate: Pentru a proteja împotriva activităților frauduloase"
        },
        {
          title: "3. Tipuri de Cookie-uri Utilizate",
          content: "Cookie-uri Esențiale (Mereu Active)\nAceste cookie-uri sunt necesare pentru funcționarea site-ului și nu pot fi dezactivate.\n• Gestionarea sesiunii de autentificare\n• Token-uri de securitate\n• Stocarea preferințelor de limbă\n\nCookie-uri Analitice / de Performanță (Necesită Consimțământ)\nAceste cookie-uri ne ajută să înțelegem cum interacționează vizitatorii cu site-ul.\n• Google Analytics: Urmărește vizualizările paginilor și comportamentul utilizatorilor\n\nCookie-uri de Marketing (Necesită Consimțământ)\nAceste cookie-uri pot fi utilizate pentru publicitate relevantă.\n• Funcții de partajare pe rețele sociale\n• Cookie-uri de rețele publicitare"
        },
        {
          title: "4. Cookie-uri Specifice Utilizate",
          content: "Cookie-uri esențiale:\n• cookieConsent – Stochează preferințele dvs. de cookie-uri (expiră: 1 an)\n• sb-access-token – Token de autentificare Supabase (sesiune)\n• sb-refresh-token – Token de reînnoire sesiune Supabase (sesiune)\n\nCookie-uri analitice (cu consimțământ):\n• _ga – Identificator Google Analytics (expiră: 2 ani)\n• _ga_* – Cookie sesiune Google Analytics (expiră: 2 ani)\n• _gid – Identificator zilnic Google Analytics (expiră: 24 ore)"
        },
        {
          title: "5. Cookie-uri de Terță Parte",
          content: "Utilizăm servicii ale unor terți care pot seta cookie-uri pe dispozitivul dvs.:\n\n• Google Analytics (Alphabet Inc.): Pentru analiza site-ului. Politica de confidențialitate: https://policies.google.com/privacy\n• Supabase: Pentru servicii de autentificare și baze de date. Politica de confidențialitate: https://supabase.com/privacy\n\nNu controlăm cookie-urile terților. Vă rugăm să consultați politicile respective de confidențialitate."
        },
        {
          title: "6. Opțiunile dvs. privind Cookie-urile",
          content: "Aveți următoarele opțiuni pentru gestionarea cookie-urilor:\n\n• Banner de consimțământ pentru cookie-uri: La prima vizită veți vedea un banner unde puteți accepta sau respinge cookie-urile non-esențiale.\n• Setările browserului: Majoritatea browserelor vă permit să blocați sau să ștergeți cookie-urile.\n• Instrumente de dezabonare: Vă puteți dezabona de la urmărirea Google Analytics la https://tools.google.com/dlpage/gaoptout"
        },
        {
          title: "7. Retenția Cookie-urilor",
          content: "Cookie-urile sunt reținute pentru perioade diferite:\n\n• Cookie-uri de sesiune: Șterse la închiderea browserului\n• Cookie-uri de preferințe: Până la 1 an\n• Cookie-uri analitice: Până la 2 ani (conform Google Analytics)\n• Cookie-uri de autentificare: Durata sesiunii"
        },
        {
          title: "8. Baza Legală",
          content: "Conform GDPR și Directivei ePrivacy:\n\n• Cookie-uri esențiale: Prelucrate pe baza interesului legitim\n• Cookie-uri analitice și de marketing: Prelucrate pe baza consimțământului dvs.\n\nPuteți retrage consimțământul în orice moment ștergând preferințele cookie-urilor."
        },
        {
          title: "9. Actualizări ale Acestei Politici",
          content: "Putem actualiza această Politică privind Cookie-urile din când în când. Orice modificări vor fi postate pe această pagină cu o nouă dată de actualizare."
        },
        {
          title: "10. Contactați-ne",
          content: "Dacă aveți întrebări despre utilizarea cookie-urilor sau această politică:\n\nEmail: contact@romanianbusinesshub.com\nAdresă: Romanian Business Hub, Flandra de Vest, Belgia"
        }
      ]
    },
    nl: {
      title: "Cookiebeleid",
      lastUpdated: "Laatst bijgewerkt: januari 2025",
      intro: "Dit Cookiebeleid legt uit wat cookies zijn, hoe Romanian Business Hub deze gebruikt en welke keuzes u heeft met betrekking tot cookies. Door onze website te blijven gebruiken, stemt u in met ons gebruik van cookies zoals beschreven in dit beleid.",
      sections: [
        {
          title: "1. Wat zijn cookies?",
          content: "Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u een website bezoekt. Ze worden gebruikt om websites goed te laten werken en om informatie te verstrekken aan de eigenaren van de site.\n\nCookies kunnen zijn:\n• Sessiecookies: Tijdelijke cookies die verlopen wanneer u uw browser sluit\n• Permanente cookies: Blijven op uw apparaat voor een bepaalde periode\n• Eerstepartijcookies: Geplaatst door de website die u bezoekt\n• Derdepartijcookies: Geplaatst door een ander domein"
        },
        {
          title: "2. Hoe wij cookies gebruiken",
          content: "Romanian Business Hub gebruikt cookies voor:\n\n• Websitefunctionaliteit: Om ervoor te zorgen dat de website correct werkt\n• Authenticatie: Om u ingelogd te houden tijdens uw sessie\n• Taalvoorkeuren: Om uw taalkeuze te onthouden\n• Analyse: Om te begrijpen hoe bezoekers onze site gebruiken (met uw toestemming)\n• Beveiliging: Om te beschermen tegen frauduleuze activiteiten"
        },
        {
          title: "3. Soorten cookies die wij gebruiken",
          content: "Essentiële cookies (altijd actief)\nDeze cookies zijn noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld.\n• Beheer van authenticatiesessies\n• Beveiligingstokens\n• Opslag van taalvoorkeuren\n\nAnalytische / Prestatiecookies (vereist toestemming)\nDeze cookies helpen ons te begrijpen hoe bezoekers met onze website omgaan.\n• Google Analytics: Volgt paginaweergaven en gebruikersgedrag\n\nMarketingcookies (vereist toestemming)\nDeze cookies kunnen worden gebruikt voor relevante advertenties.\n• Functies voor delen op sociale media\n• Cookies van advertentienetwerken"
        },
        {
          title: "4. Specifieke cookies die wij gebruiken",
          content: "Essentiële cookies:\n• cookieConsent – Slaat uw cookievoorkeuren op (vervalt: 1 jaar)\n• sb-access-token – Supabase-authenticatietoken (sessie)\n• sb-refresh-token – Supabase-sessietoken (sessie)\n\nAnalytische cookies (met toestemming):\n• _ga – Google Analytics-identifier (vervalt: 2 jaar)\n• _ga_* – Google Analytics-sessiecookie (vervalt: 2 jaar)\n• _gid – Google Analytics dagelijkse identifier (vervalt: 24 uur)"
        },
        {
          title: "5. Derdepartijcookies",
          content: "Wij gebruiken diensten van derden die cookies op uw apparaat kunnen plaatsen:\n\n• Google Analytics (Alphabet Inc.): Voor websiteanalyse. Privacybeleid: https://policies.google.com/privacy\n• Supabase: Voor authenticatie- en databasediensten. Privacybeleid: https://supabase.com/privacy\n\nWij hebben geen controle over derdepartijcookies. Raadpleeg de respectievelijke privacybeleidsregels."
        },
        {
          title: "6. Uw cookiekeuzes",
          content: "U heeft de volgende opties om cookies te beheren:\n\n• Cookietoestemmingsbanner: Bij uw eerste bezoek ziet u een banner waar u niet-essentiële cookies kunt accepteren of weigeren.\n• Browserinstellingen: De meeste browsers staan u toe cookies te blokkeren of te verwijderen.\n• Opt-out tools: U kunt zich afmelden voor Google Analytics-tracking via https://tools.google.com/dlpage/gaoptout"
        },
        {
          title: "7. Bewaartermijn van cookies",
          content: "Cookies worden voor verschillende perioden bewaard:\n\n• Sessiecookies: Verwijderd wanneer u uw browser sluit\n• Voorkeurscookies: Tot 1 jaar\n• Analytische cookies: Tot 2 jaar (zoals ingesteld door Google Analytics)\n• Authenticatiecookies: Duur van uw sessie"
        },
        {
          title: "8. Rechtsgrondslag",
          content: "Onder de AVG en de ePrivacy-richtlijn:\n\n• Essentiële cookies: Verwerkt op basis van legitiem belang\n• Analytische en marketingcookies: Verwerkt op basis van uw toestemming\n\nU kunt uw toestemming op elk moment intrekken door uw cookievoorkeuren te wissen."
        },
        {
          title: "9. Updates van dit beleid",
          content: "Wij kunnen dit Cookiebeleid van tijd tot tijd bijwerken. Eventuele wijzigingen worden op deze pagina geplaatst met een nieuwe 'laatst bijgewerkt'-datum."
        },
        {
          title: "10. Contact",
          content: "Als u vragen heeft over ons gebruik van cookies of dit Cookiebeleid:\n\nE-mail: contact@romanianbusinesshub.com\nAdres: Romanian Business Hub, West-Vlaanderen, België"
        }
      ]
    }
  };

  const currentContent = content[language as keyof typeof content] ?? content.en;

  return (
    <>
      <SEO
        title={`${currentContent.title} - Romanian Business Hub`}
        description="Cookie Policy for Romanian Business Hub - learn how we use cookies and manage your preferences"
        canonicalUrl="/cookie-policy"
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

export default CookiePolicyPage;
