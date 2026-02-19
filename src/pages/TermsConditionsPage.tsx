import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const TermsConditionsPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated: February 2026",
      intro: "Welcome to Romanian Business Hub. By accessing and using our website, you agree to comply with and be bound by the following terms and conditions.",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using the Romanian Business Hub website ('the Service'), you agree to be bound by these Terms and Conditions ('Terms'). If you do not agree with any part of these terms, you may not use our Service."
        },
        {
          title: "2. Description of Service",
          content: "Romanian Business Hub provides:\n\n• A business directory for Romanian businesses in West Flanders, Belgium\n• Search and discovery features for businesses\n• User registration and business listing submission\n• Contact forms and newsletter subscription\n• Resources and guides for the Romanian community"
        },
        {
          title: "3. User Accounts",
          content: "To submit a business listing, you must:\n\n• Create an account with a valid email address\n• Provide accurate and complete information\n• Maintain the security of your account credentials\n• Be at least 18 years old or have parental consent\n• Accept responsibility for all activities under your account\n\nYou may not:\n• Create multiple accounts\n• Use another person's account without permission\n• Share your account credentials\n• Use automated systems to create accounts"
        },
        {
          title: "4. Business Listings",
          content: "When submitting a business listing, you agree to:\n\n• Provide accurate and truthful information\n• Only list businesses you own or are authorized to represent\n• Update information when it changes\n• Comply with all applicable laws and regulations\n• Not include offensive, misleading, or illegal content\n• Not engage in spam or fraudulent activities\n\nWe reserve the right to:\n• Review and approve all business listings\n• Edit or remove listings that violate these terms\n• Suspend or terminate accounts that violate our policies\n• Remove listings without prior notice if necessary"
        },
        {
          title: "5. Intellectual Property Rights",
          content: "Content Ownership:\n\n• You retain ownership of content you submit\n• By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on our platform\n• Our website design, logo, and original content are protected by copyright and trademark laws\n• You may not copy, reproduce, or distribute our content without written permission"
        },
        {
          title: "6. User Conduct",
          content: "You agree not to:\n\n• Violate any applicable laws or regulations\n• Infringe on others' intellectual property rights\n• Post false, misleading, or defamatory content\n• Harass, threaten, or abuse other users\n• Transmit viruses, malware, or harmful code\n• Attempt to gain unauthorized access to our systems\n• Scrape or collect data without permission\n• Interfere with the proper functioning of the Service"
        },
        {
          title: "7. Reviews and Comments",
          content: "Users may submit reviews and comments. By doing so, you agree that:\n\n• Reviews must be based on personal experience\n• Reviews must be honest and not misleading\n• You will not post fake or fraudulent reviews\n• You will not be compensated for positive reviews\n• We reserve the right to remove inappropriate reviews\n• We are not responsible for user-generated content"
        },
        {
          title: "8. Prohibited Activities",
          content: "The following activities are strictly prohibited:\n\n• Posting spam or unsolicited advertisements\n• Listing businesses without proper authorization\n• Using the Service for illegal purposes\n• Attempting to manipulate search rankings\n• Creating fake businesses or reviews\n• Impersonating others or misrepresenting affiliations\n• Collecting user information without consent"
        },
        {
          title: "9. Third-Party Links and Services",
          content: "Our Service may contain links to third-party websites and services:\n\n• We are not responsible for third-party content\n• Links do not imply endorsement\n• Third-party sites have their own terms and privacy policies\n• Use third-party services at your own risk"
        },
        {
          title: "10. Disclaimer of Warranties",
          content: "The Service is provided 'as is' and 'as available' without warranties of any kind:\n\n• We do not guarantee uninterrupted or error-free service\n• We do not warrant the accuracy of business information\n• We do not guarantee specific results from using the Service\n• We are not responsible for user-generated content\n• Use of the Service is at your own risk"
        },
        {
          title: "11. Limitation of Liability",
          content: "To the maximum extent permitted by law:\n\n• We are not liable for indirect, incidental, or consequential damages\n• Our total liability is limited to the amount you paid to use the Service (if any)\n• We are not liable for losses resulting from:\n  - Unauthorized access to your account\n  - Service interruptions or errors\n  - Third-party actions\n  - User-generated content\n  - Business transactions between users and businesses"
        },
        {
          title: "12. Indemnification",
          content: "You agree to indemnify and hold harmless Romanian Business Hub, its owners, employees, and affiliates from:\n\n• Claims arising from your use of the Service\n• Violations of these Terms\n• Violations of third-party rights\n• Content you submit to the Service\n• Your business activities listed on the Service"
        },
        {
          title: "13. Termination",
          content: "We may terminate or suspend your account and access to the Service:\n\n• Immediately, without prior notice\n• For any violation of these Terms\n• For fraudulent or illegal activity\n• At our sole discretion\n\nYou may terminate your account at any time by:\n• Contacting us at info@ro-businesshub.be\n• Using account deletion features if available\n\nUpon termination:\n• Your right to use the Service ceases immediately\n• Your business listings may be removed\n• Certain provisions of these Terms survive termination"
        },
        {
          title: "14. Modifications to Service and Terms",
          content: "We reserve the right to:\n\n• Modify or discontinue the Service at any time\n• Change these Terms at any time\n• Update pricing or features\n• Remove or add functionality\n\nChanges will be effective upon posting. Continued use of the Service after changes constitutes acceptance of the modified Terms."
        },
        {
          title: "15. Privacy and Data Protection",
          content: "Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal data in accordance with GDPR."
        },
        {
          title: "16. Governing Law and Jurisdiction",
          content: "These Terms are governed by:\n\n• Belgian law\n• The courts of West Flanders, Belgium have exclusive jurisdiction\n• Any disputes will be resolved in Belgian courts\n• If any provision is found invalid, other provisions remain in effect"
        },
        {
          title: "17. Contact Information",
          content: "For questions about these Terms and Conditions:\n\nEmail: info@ro-businesshub.be\nAddress: Romanian Business Hub\n8800 Roeselare, West Flanders, Belgium\nPhone: +32 467 78 92 59"
        },
        {
          title: "18. Entire Agreement",
          content: "These Terms, together with our Privacy Policy, constitute the entire agreement between you and Romanian Business Hub regarding the use of the Service."
        }
      ]
    },
    ro: {
      title: "Termeni și Condiții",
      lastUpdated: "Ultima actualizare: februarie 2026",
      intro: "Bun venit la Romanian Business Hub. Accesând și utilizând site-ul nostru, sunteți de acord să respectați și să fiți obligat de următorii termeni și condiții.",
      sections: [
        {
          title: "1. Acceptarea Termenilor",
          content: "Prin accesarea sau utilizarea site-ului Romanian Business Hub ('Serviciul'), sunteți de acord să fiți obligat de acești Termeni și Condiții ('Termeni'). Dacă nu sunteți de acord cu orice parte a acestor termeni, nu puteți utiliza Serviciul nostru."
        },
        {
          title: "2. Descrierea Serviciului",
          content: "Romanian Business Hub oferă:\n\n• Un director de afaceri pentru afacerile românești din Flandra de Vest, Belgia\n• Funcții de căutare și descoperire pentru afaceri\n• Înregistrare utilizator și trimitere listă de afaceri\n• Formulare de contact și abonare newsletter\n• Resurse și ghiduri pentru comunitatea românească"
        },
        {
          title: "3. Conturi de Utilizator",
          content: "Pentru a trimite o listă de afaceri, trebuie să:\n\n• Creați un cont cu o adresă de email validă\n• Furnizați informații precise și complete\n• Mențineți securitatea acreditărilor contului dvs.\n• Aveți cel puțin 18 ani sau aveți consimțământul părinților\n• Acceptați responsabilitatea pentru toate activitățile din contul dvs.\n\nNu aveți voie să:\n• Creați conturi multiple\n• Folosiți contul altei persoane fără permisiune\n• Distribuiți acreditările contului dvs.\n• Folosiți sisteme automate pentru a crea conturi"
        },
        {
          title: "4. Listări de Afaceri",
          content: "Când trimiteți o listă de afaceri, sunteți de acord să:\n\n• Furnizați informații precise și reale\n• Listați doar afaceri pe care le dețineți sau pe care sunteți autorizat să le reprezentați\n• Actualizați informațiile când se schimbă\n• Respectați toate legile și reglementările aplicabile\n• Nu includeți conținut ofensator, înșelător sau ilegal\n• Nu vă angajați în spam sau activități frauduloase\n\nNe rezervăm dreptul de a:\n• Revizui și aproba toate listările de afaceri\n• Edita sau elimina listări care încalcă acești termeni\n• Suspenda sau închide conturi care încalcă politicile noastre\n• Elimina listări fără notificare prealabilă dacă este necesar"
        },
        {
          title: "5. Drepturi de Proprietate Intelectuală",
          content: "Proprietatea Conținutului:\n\n• Rămâneți proprietarul conținutului pe care îl trimiteți\n• Prin trimiterea conținutului, ne acordați o licență neexclusivă, mondială, gratuită pentru a folosi, afișa și distribui conținutul dvs. pe platforma noastră\n• Design-ul site-ului nostru, logo-ul și conținutul original sunt protejate de legile drepturilor de autor și mărcilor comerciale\n• Nu puteți copia, reproduce sau distribui conținutul nostru fără permisiune scrisă"
        },
        {
          title: "6. Conduita Utilizatorului",
          content: "Sunteți de acord să nu:\n\n• Încălcați legile sau reglementările aplicabile\n• Încălcați drepturile de proprietate intelectuală ale altora\n• Postați conținut fals, înșelător sau defăimător\n• Hărțuiți, amenințați sau abuzați alți utilizatori\n• Transmiteți viruși, malware sau cod dăunător\n• Încercați să obțineți acces neautorizat la sistemele noastre\n• Colectați date fără permisiune\n• Interferați cu funcționarea corectă a Serviciului"
        },
        {
          title: "7. Recenzii și Comentarii",
          content: "Utilizatorii pot trimite recenzii și comentarii. Procedând astfel, sunteți de acord că:\n\n• Recenziile trebuie să fie bazate pe experiență personală\n• Recenziile trebuie să fie oneste și nu înșelătoare\n• Nu veți posta recenzii false sau frauduloase\n• Nu veți fi compensat pentru recenzii pozitive\n• Ne rezervăm dreptul de a elimina recenzii necorespunzătoare\n• Nu suntem responsabili pentru conținutul generat de utilizatori"
        },
        {
          title: "8. Activități Interzise",
          content: "Următoarele activități sunt strict interzise:\n\n• Postarea de spam sau publicitate nesolicită\n• Listarea de afaceri fără autorizare corespunzătoare\n• Folosirea Serviciului în scopuri ilegale\n• Încercarea de a manipula clasamentele de căutare\n• Crearea de afaceri sau recenzii false\n• Personificarea altora sau denaturarea afilierilor\n• Colectarea informațiilor utilizatorilor fără consimțământ"
        },
        {
          title: "9. Link-uri și Servicii ale Terților",
          content: "Serviciul nostru poate conține link-uri către site-uri și servicii ale terților:\n\n• Nu suntem responsabili pentru conținutul terților\n• Link-urile nu implică aprobare\n• Site-urile terților au propriile lor termeni și politici de confidențialitate\n• Folosiți serviciile terților pe propriul risc"
        },
        {
          title: "10. Declinarea Garanțiilor",
          content: "Serviciul este furnizat 'așa cum este' și 'după cum este disponibil' fără garanții de niciun fel:\n\n• Nu garantăm un serviciu neîntrerupt sau fără erori\n• Nu garantăm acuratețea informațiilor despre afaceri\n• Nu garantăm rezultate specifice din utilizarea Serviciului\n• Nu suntem responsabili pentru conținutul generat de utilizatori\n• Utilizarea Serviciului este pe propriul risc"
        },
        {
          title: "11. Limitarea Răspunderii",
          content: "În măsura maximă permisă de lege:\n\n• Nu suntem răspunzători pentru daune indirecte, accidentale sau consecutive\n• Răspunderea noastră totală este limitată la suma pe care ați plătit-o pentru a utiliza Serviciul (dacă există)\n• Nu suntem răspunzători pentru pierderi rezultate din:\n  - Acces neautorizat la contul dvs.\n  - Întreruperi sau erori ale serviciului\n  - Acțiuni ale terților\n  - Conținut generat de utilizatori\n  - Tranzacții comerciale între utilizatori și afaceri"
        },
        {
          title: "12. Indemnizație",
          content: "Sunteți de acord să despăgubiți și să protejați Romanian Business Hub, proprietarii, angajații și afiliatii săi de:\n\n• Reclamații rezultate din utilizarea Serviciului\n• Încălcări ale acestor Termeni\n• Încălcări ale drepturilor terților\n• Conținut pe care îl trimiteți către Serviciu\n• Activitățile dvs. de afaceri listate pe Serviciu"
        },
        {
          title: "13. Încetare",
          content: "Putem închide sau suspenda contul și accesul la Serviciu:\n\n• Imediat, fără notificare prealabilă\n• Pentru orice încălcare a acestor Termeni\n• Pentru activitate frauduloasă sau ilegală\n• La propria noastră discreție\n\nPuteți închide contul în orice moment prin:\n• Contactându-ne la info@ro-businesshub.be\n• Folosind funcțiile de ștergere a contului dacă sunt disponibile\n\nÎn urma încheierii:\n• Dreptul dvs. de a utiliza Serviciul încetează imediat\n• Listările dvs. de afaceri pot fi eliminate\n• Anumite prevederi ale acestor Termeni supraviețuiesc încheierii"
        },
        {
          title: "14. Modificări ale Serviciului și Termenilor",
          content: "Ne rezervăm dreptul de a:\n\n• Modifica sau întrerupe Serviciul în orice moment\n• Schimba acești Termeni în orice moment\n• Actualiza prețurile sau funcțiile\n• Elimina sau adăuga funcționalități\n\nSchimbările vor intra în vigoare la postare. Utilizarea continuă a Serviciului după modificări constituie acceptarea Termenilor modificați."
        },
        {
          title: "15. Confidențialitate și Protecția Datelor",
          content: "Utilizarea Serviciului este, de asemenea, guvernată de Politica noastră de Confidențialitate. Vă rugăm să consultați Politica noastră de Confidențialitate pentru a înțelege cum colectăm, folosim și protejăm datele dvs. personale în conformitate cu GDPR."
        },
        {
          title: "16. Legea Aplicabilă și Jurisdicție",
          content: "Acești Termeni sunt guvernați de:\n\n• Legea belgiană\n• Instanțele Flandrei de Vest, Belgia au jurisdicție exclusivă\n• Orice dispute vor fi soluționate în instanțele belgiene\n• Dacă orice prevedere este găsită invalidă, celelalte prevederi rămân în vigoare"
        },
        {
          title: "17. Informații de Contact",
          content: "Pentru întrebări despre acești Termeni și Condiții:\n\nEmail: info@ro-businesshub.be\nAdresă: Romanian Business Hub\n8800 Roeselare, Flandra de Vest, Belgia\nTelefon: +32 467 78 92 59"
        },
        {
          title: "18. Întregul Acord",
          content: "Acești Termeni, împreună cu Politica noastră de Confidențialitate, constituie întregul acord între dvs. și Romanian Business Hub în ceea ce privește utilizarea Serviciului."
        }
      ]
    },
    nl: {
      title: "Algemene Voorwaarden",
      lastUpdated: "Laatst bijgewerkt: februari 2026",
      intro: "Welkom bij Romanian Business Hub. Door toegang te krijgen tot en gebruik te maken van onze website, gaat u akkoord met de volgende algemene voorwaarden.",
      sections: [
        {
          title: "1. Aanvaarding van Voorwaarden",
          content: "Door toegang te krijgen tot of gebruik te maken van de Romanian Business Hub-website ('de Service'), gaat u ermee akkoord gebonden te zijn aan deze Algemene Voorwaarden ('Voorwaarden'). Als u het niet eens bent met een deel van deze voorwaarden, mag u onze Service niet gebruiken."
        },
        {
          title: "2. Beschrijving van de Service",
          content: "Romanian Business Hub biedt:\n\n• Een bedrijvengids voor Roemeense bedrijven in West-Vlaanderen, België\n• Zoek- en ontdekkingsfuncties voor bedrijven\n• Gebruikersregistratie en inzending van bedrijfsvermeldingen\n• Contactformulieren en nieuwsbriefabonnementen\n• Bronnen en gidsen voor de Roemeense gemeenschap"
        },
        {
          title: "3. Gebruikersaccounts",
          content: "Om een bedrijfsvermelding in te dienen, moet u:\n\n• Een account aanmaken met een geldig e-mailadres\n• Nauwkeurige en volledige informatie verstrekken\n• De beveiliging van uw accountgegevens handhaven\n• Minstens 18 jaar oud zijn of ouderlijke toestemming hebben\n• Verantwoordelijkheid accepteren voor alle activiteiten onder uw account\n\nU mag niet:\n• Meerdere accounts aanmaken\n• Het account van een ander gebruiken zonder toestemming\n• Uw accountgegevens delen\n• Geautomatiseerde systemen gebruiken om accounts aan te maken"
        },
        {
          title: "4. Bedrijfsvermeldingen",
          content: "Bij het indienen van een bedrijfsvermelding gaat u ermee akkoord om:\n\n• Nauwkeurige en waarheidsgetrouwe informatie te verstrekken\n• Alleen bedrijven te vermelden die u bezit of die u geautoriseerd bent te vertegenwoordigen\n• Informatie bij te werken wanneer deze verandert\n• Alle toepasselijke wetten en voorschriften na te leven\n• Geen beledigende, misleidende of illegale inhoud op te nemen\n• Niet deel te nemen aan spam of frauduleuze activiteiten\n\nWij behouden ons het recht voor om:\n• Alle bedrijfsvermeldingen te beoordelen en goed te keuren\n• Vermeldingen die deze voorwaarden schenden te bewerken of te verwijderen\n• Accounts die ons beleid schenden op te schorten of te beëindigen\n• Vermeldingen zonder voorafgaande kennisgeving te verwijderen indien nodig"
        },
        {
          title: "5. Intellectuele Eigendomsrechten",
          content: "Eigendom van Inhoud:\n\n• U behoudt het eigendom van inhoud die u indient\n• Door inhoud in te dienen, verleent u ons een niet-exclusieve, wereldwijde, royaltyvrije licentie om uw inhoud op ons platform te gebruiken, weer te geven en te distribueren\n• Ons websiteontwerp, logo en oorspronkelijke inhoud zijn beschermd door auteursrecht en merkenwetten\n• U mag onze inhoud niet kopiëren, reproduceren of distribueren zonder schriftelijke toestemming"
        },
        {
          title: "6. Gebruikersgedrag",
          content: "U gaat ermee akkoord om niet:\n\n• Toepasselijke wetten of voorschriften te schenden\n• Inbreuk te maken op intellectuele eigendomsrechten van anderen\n• Valse, misleidende of lasterlijke inhoud te plaatsen\n• Andere gebruikers lastig te vallen, te bedreigen of te misbruiken\n• Virussen, malware of schadelijke code te verzenden\n• Te proberen ongeautoriseerde toegang tot onze systemen te krijgen\n• Gegevens te scrapen of verzamelen zonder toestemming\n• De goede werking van de Service te verstoren"
        },
        {
          title: "7. Beoordelingen en Opmerkingen",
          content: "Gebruikers kunnen beoordelingen en opmerkingen indienen. Door dit te doen, gaat u ermee akkoord dat:\n\n• Beoordelingen moeten gebaseerd zijn op persoonlijke ervaring\n• Beoordelingen moeten eerlijk en niet misleidend zijn\n• U geen valse of frauduleuze beoordelingen zult plaatsen\n• U niet zult worden gecompenseerd voor positieve beoordelingen\n• Wij het recht behouden om ongepaste beoordelingen te verwijderen\n• Wij niet verantwoordelijk zijn voor door gebruikers gegenereerde inhoud"
        },
        {
          title: "8. Verboden Activiteiten",
          content: "De volgende activiteiten zijn ten strengste verboden:\n\n• Spam of ongevraagde advertenties plaatsen\n• Bedrijven vermelden zonder juiste autorisatie\n• De Service gebruiken voor illegale doeleinden\n• Proberen zoekrangschikkingen te manipuleren\n• Valse bedrijven of beoordelingen creëren\n• Anderen imiteren of affiliaties verkeerd voorstellen\n• Gebruikersinformatie verzamelen zonder toestemming"
        },
        {
          title: "9. Links en Diensten van Derden",
          content: "Onze Service kan links naar websites en diensten van derden bevatten:\n\n• Wij zijn niet verantwoordelijk voor inhoud van derden\n• Links impliceren geen goedkeuring\n• Websites van derden hebben hun eigen voorwaarden en privacybeleid\n• Gebruik diensten van derden op eigen risico"
        },
        {
          title: "10. Afwijzing van Garanties",
          content: "De Service wordt geleverd 'zoals deze is' en 'zoals beschikbaar' zonder garanties van welke aard dan ook:\n\n• Wij garanderen geen ononderbroken of foutloze service\n• Wij garanderen niet de nauwkeurigheid van bedrijfsinformatie\n• Wij garanderen geen specifieke resultaten van het gebruik van de Service\n• Wij zijn niet verantwoordelijk voor door gebruikers gegenereerde inhoud\n• Gebruik van de Service is op eigen risico"
        },
        {
          title: "11. Beperking van Aansprakelijkheid",
          content: "Voor zover maximaal toegestaan door de wet:\n\n• Wij zijn niet aansprakelijk voor indirecte, incidentele of gevolgschade\n• Onze totale aansprakelijkheid is beperkt tot het bedrag dat u hebt betaald voor het gebruik van de Service (indien van toepassing)\n• Wij zijn niet aansprakelijk voor verliezen die voortvloeien uit:\n  - Ongeautoriseerde toegang tot uw account\n  - Service-onderbrekingen of fouten\n  - Acties van derden\n  - Door gebruikers gegenereerde inhoud\n  - Zakelijke transacties tussen gebruikers en bedrijven"
        },
        {
          title: "12. Vrijwaring",
          content: "U gaat ermee akkoord Romanian Business Hub, haar eigenaren, werknemers en gelieerde ondernemingen te vrijwaren en schadeloos te stellen van:\n\n• Claims die voortvloeien uit uw gebruik van de Service\n• Schendingen van deze Voorwaarden\n• Schendingen van rechten van derden\n• Inhoud die u indient bij de Service\n• Uw zakelijke activiteiten die op de Service worden vermeld"
        },
        {
          title: "13. Beëindiging",
          content: "Wij kunnen uw account en toegang tot de Service beëindigen of opschorten:\n\n• Onmiddellijk, zonder voorafgaande kennisgeving\n• Voor elke schending van deze Voorwaarden\n• Voor frauduleuze of illegale activiteit\n• Naar eigen goeddunken\n\nU kunt uw account op elk moment beëindigen door:\n• Contact met ons op te nemen via info@ro-businesshub.be\n• Account verwijderingsfuncties te gebruiken indien beschikbaar\n\nNa beëindiging:\n• Uw recht om de Service te gebruiken eindigt onmiddellijk\n• Uw bedrijfsvermeldingen kunnen worden verwijderd\n• Bepaalde bepalingen van deze Voorwaarden blijven van kracht na beëindiging"
        },
        {
          title: "14. Wijzigingen in Service en Voorwaarden",
          content: "Wij behouden ons het recht voor om:\n\n• De Service op elk moment te wijzigen of stop te zetten\n• Deze Voorwaarden op elk moment te wijzigen\n• Prijzen of functies bij te werken\n• Functionaliteit te verwijderen of toe te voegen\n\nWijzigingen worden van kracht na plaatsing. Voortgezet gebruik van de Service na wijzigingen betekent aanvaarding van de gewijzigde Voorwaarden."
        },
        {
          title: "15. Privacy en Gegevensbescherming",
          content: "Uw gebruik van de Service wordt ook beheerst door ons Privacybeleid. Raadpleeg ons Privacybeleid om te begrijpen hoe we uw persoonlijke gegevens verzamelen, gebruiken en beschermen in overeenstemming met de AVG."
        },
        {
          title: "16. Toepasselijk Recht en Jurisdictie",
          content: "Deze Voorwaarden worden beheerst door:\n\n• Belgisch recht\n• De rechtbanken van West-Vlaanderen, België hebben exclusieve jurisdictie\n• Eventuele geschillen worden opgelost in Belgische rechtbanken\n• Als een bepaling ongeldig wordt bevonden, blijven andere bepalingen van kracht"
        },
        {
          title: "17. Contactinformatie",
          content: "Voor vragen over deze Algemene Voorwaarden:\n\nE-mail: info@ro-businesshub.be\nAdres: Romanian Business Hub\n8800 Roeselare, West-Vlaanderen, België\nTelefoon: +32 467 78 92 59"
        },
        {
          title: "18. Volledige Overeenkomst",
          content: "Deze Voorwaarden vormen samen met ons Privacybeleid de volledige overeenkomst tussen u en Romanian Business Hub met betrekking tot het gebruik van de Service."
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <>
      <SEO
        title={`${t.title} - Romanian Business Hub`}
        description="Terms and Conditions for using the Romanian Business Hub directory. Learn about user rights, business listing policies, and platform guidelines."
        keywords="terms and conditions, user agreement, business listing terms, platform policies, Romanian Business Hub"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-playfair text-4xl font-bold mb-2 text-romania-blue">{t.title}</h1>
            <p className="text-gray-600 mb-8">{t.lastUpdated}</p>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <p className="text-gray-700 leading-relaxed">{t.intro}</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {t.sections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl text-romania-blue">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsConditionsPage;
