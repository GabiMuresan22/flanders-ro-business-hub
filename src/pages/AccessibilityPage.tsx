import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const AccessibilityPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Accessibility Statement",
      lastUpdated: "Last updated: February 2026",
      intro: "Romanian Business Hub is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.",
      sections: [
        {
          title: "1. Commitment to Accessibility",
          content: "We are committed to making our website accessible to the widest possible audience, including those with disabilities. Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards."
        },
        {
          title: "2. Measures to Support Accessibility",
          content: "Romanian Business Hub takes the following measures to ensure accessibility:\n\n• Include accessibility as part of our mission statement\n• Integrate accessibility into our procurement practices\n• Provide ongoing accessibility training for our staff\n• Assign clear accessibility goals and responsibilities\n• Include people with disabilities in our design personas"
        },
        {
          title: "3. Accessibility Features",
          content: "Our website includes the following accessibility features:\n\n• Semantic HTML markup for proper document structure\n• ARIA labels and landmarks for screen reader users\n• Keyboard navigation support throughout the site\n• Skip to main content link for keyboard users\n• Focus indicators for interactive elements\n• Alternative text for images\n• Proper heading hierarchy (H1-H6)\n• Sufficient color contrast ratios\n• Responsive design for various screen sizes\n• Form labels and error messages\n• No auto-playing media\n• Readable fonts and adjustable text sizes"
        },
        {
          title: "4. Conformance Status",
          content: "The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.\n\nRomanian Business Hub is partially conformant with WCAG 2.1 Level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard."
        },
        {
          title: "5. Known Limitations",
          content: "Despite our best efforts to ensure accessibility of Romanian Business Hub, there may be some limitations:\n\n• Some third-party content may not be fully accessible\n• User-generated content (business listings, reviews) may not meet accessibility standards\n• Some older PDF documents may not be fully accessible\n• Some images uploaded by users may lack appropriate alternative text\n\nWe continue to work on improving these areas."
        },
        {
          title: "6. Technical Specifications",
          content: "Accessibility of Romanian Business Hub relies on the following technologies:\n\n• HTML5\n• CSS3\n• JavaScript\n• ARIA (Accessible Rich Internet Applications)\n• React framework\n• Radix UI components (designed with accessibility in mind)\n\nThese technologies are relied upon for conformance with the accessibility standards used."
        },
        {
          title: "7. Assessment Approach",
          content: "Romanian Business Hub assessed the accessibility of this website by the following approaches:\n\n• Self-evaluation using automated testing tools\n• Manual testing with keyboard navigation\n• Screen reader testing (NVDA, JAWS)\n• Color contrast analysis\n• Responsive design testing\n• User feedback collection"
        },
        {
          title: "8. Supported Browsers and Assistive Technologies",
          content: "Our website is designed to be compatible with:\n\n**Browsers:**\n• Chrome (latest version)\n• Firefox (latest version)\n• Safari (latest version)\n• Edge (latest version)\n\n**Assistive Technologies:**\n• Screen readers (JAWS, NVDA, VoiceOver)\n• Screen magnification software\n• Speech recognition software\n• Keyboard-only navigation"
        },
        {
          title: "9. Keyboard Navigation",
          content: "You can navigate our website using a keyboard:\n\n• **Tab** - Move forward through interactive elements\n• **Shift + Tab** - Move backward through interactive elements\n• **Enter/Space** - Activate buttons and links\n• **Arrow keys** - Navigate through menus and dropdowns\n• **Esc** - Close modals and dialogs\n• **Skip to Main Content** link appears when tabbing from the top of the page"
        },
        {
          title: "10. Text Size and Contrast",
          content: "To improve readability:\n\n• Use your browser's zoom function (Ctrl/Cmd + or -)\n• Adjust text size in your browser settings\n• Use browser extensions for enhanced contrast\n• Our color combinations meet WCAG AA contrast requirements\n• Text can be resized up to 200% without loss of functionality"
        },
        {
          title: "11. Third-Party Content",
          content: "Some content on our website comes from third parties:\n\n• Embedded maps (Google Maps)\n• Social media embeds\n• Analytics tools (Google Analytics)\n• User-generated content\n\nWe cannot guarantee the accessibility of third-party content, but we encourage our content providers to make their content accessible."
        },
        {
          title: "12. Feedback and Contact Information",
          content: "We welcome your feedback on the accessibility of Romanian Business Hub. If you encounter accessibility barriers:\n\n**Email:** accessibility@ro-businesshub.be\n**Phone:** +32 467 78 92 59\n**Address:** Romanian Business Hub, 8800 Roeselare, West Flanders, Belgium\n\nPlease provide:\n• URL of the page with the issue\n• Description of the problem\n• Assistive technology you are using (if applicable)\n• Your contact information for follow-up\n\nWe aim to respond to accessibility feedback within 5 business days."
        },
        {
          title: "13. Formal Complaints",
          content: "If you are not satisfied with our response to your accessibility concerns, you may file a complaint with:\n\n**Belgian Institute for Equality between Women and Men**\nRue Ernest Blerot 1\n1070 Brussels, Belgium\nWebsite: igvm-iefh.belgium.be\nEmail: egalite.hommesfemmes@iefh.belgique.be\n\nYou may also contact:\n\n**Belgian Disability Forum**\nChaussée de Charleroi 95\n1060 Brussels, Belgium\nWebsite: www.bdf.belgium.be"
        },
        {
          title: "14. Continuous Improvement",
          content: "We are committed to ongoing accessibility improvements:\n\n• Regular accessibility audits\n• User testing with people with disabilities\n• Staff training on accessibility best practices\n• Staying updated with WCAG guidelines\n• Implementing user feedback\n• Testing new features for accessibility before launch"
        },
        {
          title: "15. Accessibility Resources",
          content: "For more information about web accessibility:\n\n• W3C Web Accessibility Initiative: www.w3.org/WAI/\n• Web Content Accessibility Guidelines: www.w3.org/WAI/WCAG21/quickref/\n• Belgian accessibility legislation: www.ejustice.just.fgov.be\n• Accessibility tools and resources: www.a11yproject.com"
        },
        {
          title: "16. Updates to This Statement",
          content: "This accessibility statement was created on February 2026. We review and update this statement regularly to reflect current accessibility status and ongoing improvements."
        }
      ]
    },
    ro: {
      title: "Declarație de Accesibilitate",
      lastUpdated: "Ultima actualizare: februarie 2026",
      intro: "Romanian Business Hub se angajează să asigure accesibilitatea digitală pentru persoanele cu dizabilități. Îmbunătățim continuu experiența utilizatorului pentru toată lumea și aplicăm standardele de accesibilitate relevante.",
      sections: [
        {
          title: "1. Angajament pentru Accesibilitate",
          content: "Ne angajăm să facem site-ul nostru accesibil pentru cel mai larg public posibil, inclusiv pentru persoanele cu dizabilități. Scopul nostru este să ne conformăm standardelor Web Content Accessibility Guidelines (WCAG) 2.1 Nivel AA."
        },
        {
          title: "2. Măsuri pentru Sprijinirea Accesibilității",
          content: "Romanian Business Hub ia următoarele măsuri pentru a asigura accesibilitatea:\n\n• Includem accesibilitatea ca parte a declarației noastre de misiune\n• Integrăm accesibilitatea în practicile noastre de achiziție\n• Oferim formare continuă în accesibilitate pentru personalul nostru\n• Atribuim obiective și responsabilități clare de accesibilitate\n• Includem persoane cu dizabilități în personajele noastre de design"
        },
        {
          title: "3. Caracteristici de Accesibilitate",
          content: "Site-ul nostru include următoarele caracteristici de accesibilitate:\n\n• Marcare HTML semantică pentru structura corectă a documentului\n• Etichete și repere ARIA pentru utilizatorii de cititor de ecran\n• Suport pentru navigarea cu tastatura pe tot site-ul\n• Link de salt la conținutul principal pentru utilizatorii de tastatură\n• Indicatori de focus pentru elementele interactive\n• Text alternativ pentru imagini\n• Ierarhie corectă a titlurilor (H1-H6)\n• Rapoarte suficiente de contrast de culoare\n• Design responsive pentru diverse dimensiuni de ecran\n• Etichete de formular și mesaje de eroare\n• Fără media cu redare automată\n• Fonturi lizibile și dimensiuni de text ajustabile"
        },
        {
          title: "4. Stare de Conformitate",
          content: "Ghidurile de Accesibilitate a Conținutului Web (WCAG) definesc cerințele pentru designeri și dezvoltatori pentru a îmbunătăți accesibilitatea pentru persoanele cu dizabilități. Definește trei niveluri de conformitate: Nivel A, Nivel AA și Nivel AAA.\n\nRomanian Business Hub este parțial conform cu WCAG 2.1 Nivel AA. Parțial conform înseamnă că unele părți ale conținutului nu se conformează complet standardului de accesibilitate."
        },
        {
          title: "5. Limitări Cunoscute",
          content: "În ciuda eforturilor noastre de a asigura accesibilitatea Romanian Business Hub, pot exista unele limitări:\n\n• Unele conținuturi terțe pot să nu fie complet accesibile\n• Conținutul generat de utilizatori (liste de afaceri, recenzii) poate să nu îndeplinească standardele de accesibilitate\n• Unele documente PDF mai vechi pot să nu fie complet accesibile\n• Unele imagini încărcate de utilizatori pot să nu aibă text alternativ adecvat\n\nContinuăm să lucrăm la îmbunătățirea acestor domenii."
        },
        {
          title: "6. Specificații Tehnice",
          content: "Accesibilitatea Romanian Business Hub se bazează pe următoarele tehnologii:\n\n• HTML5\n• CSS3\n• JavaScript\n• ARIA (Aplicații Internet Bogate Accesibile)\n• Framework React\n• Componente Radix UI (proiectate cu accesibilitate în minte)\n\nAceste tehnologii sunt folosite pentru conformitatea cu standardele de accesibilitate utilizate."
        },
        {
          title: "7. Abordare de Evaluare",
          content: "Romanian Business Hub a evaluat accesibilitatea acestui site web prin următoarele abordări:\n\n• Auto-evaluare folosind instrumente de testare automatizate\n• Testare manuală cu navigarea cu tastatura\n• Testare cu cititor de ecran (NVDA, JAWS)\n• Analiză de contrast de culoare\n• Testare design responsive\n• Colectare de feedback de la utilizatori"
        },
        {
          title: "8. Browsere și Tehnologii Asistate Suportate",
          content: "Site-ul nostru este proiectat să fie compatibil cu:\n\n**Browsere:**\n• Chrome (ultima versiune)\n• Firefox (ultima versiune)\n• Safari (ultima versiune)\n• Edge (ultima versiune)\n\n**Tehnologii Asistate:**\n• Cititoare de ecran (JAWS, NVDA, VoiceOver)\n• Software de mărire a ecranului\n• Software de recunoaștere vocală\n• Navigare doar cu tastatura"
        },
        {
          title: "9. Navigare cu Tastatura",
          content: "Puteți naviga pe site-ul nostru folosind tastatura:\n\n• **Tab** - Mutați-vă înainte prin elementele interactive\n• **Shift + Tab** - Mutați-vă înapoi prin elementele interactive\n• **Enter/Space** - Activați butoane și linkuri\n• **Săgeți** - Navigați prin meniuri și liste derulante\n• **Esc** - Închideți ferestre modale și dialoguri\n• Link **Salt la Conținutul Principal** apare când apăsați tab de sus a paginii"
        },
        {
          title: "10. Dimensiunea Textului și Contrast",
          content: "Pentru a îmbunătăți lizibilitatea:\n\n• Folosiți funcția de zoom a browserului (Ctrl/Cmd + sau -)\n• Ajustați dimensiunea textului în setările browserului\n• Folosiți extensii de browser pentru contrast îmbunătățit\n• Combinațiile noastre de culori îndeplinesc cerințele de contrast WCAG AA\n• Textul poate fi redimensionat până la 200% fără pierderea funcționalității"
        },
        {
          title: "11. Conținut Terț",
          content: "Unele conținuturi pe site-ul nostru provin de la terți:\n\n• Hărți încorporate (Google Maps)\n• Încorporări de rețele sociale\n• Instrumente de analiză (Google Analytics)\n• Conținut generat de utilizatori\n\nNu putem garanta accesibilitatea conținutului terț, dar încurajăm furnizorii noștri de conținut să facă conținutul lor accesibil."
        },
        {
          title: "12. Feedback și Informații de Contact",
          content: "Primim cu plăcere feedback-ul dvs. despre accesibilitatea Romanian Business Hub. Dacă întâmpinați bariere de accesibilitate:\n\n**Email:** accessibility@ro-businesshub.be\n**Telefon:** +32 467 78 92 59\n**Adresă:** Romanian Business Hub, 8800 Roeselare, Flandra de Vest, Belgia\n\nVă rugăm să furnizați:\n• URL-ul paginii cu problema\n• Descrierea problemei\n• Tehnologia asistată pe care o folosiți (dacă este cazul)\n• Informațiile dvs. de contact pentru urmărire\n\nÎncercăm să răspundem la feedback-ul de accesibilitate în 5 zile lucrătoare."
        },
        {
          title: "13. Plângeri Formale",
          content: "Dacă nu sunteți mulțumit de răspunsul nostru la preocupările dvs. de accesibilitate, puteți depune o plângere la:\n\n**Institutul Belgian pentru Egalitatea între Femei și Bărbați**\nRue Ernest Blerot 1\n1070 Bruxelles, Belgia\nSite web: igvm-iefh.belgium.be\nEmail: egalite.hommesfemmes@iefh.belgique.be\n\nDe asemenea, puteți contacta:\n\n**Forumul Belgian pentru Dizabilități**\nChaussée de Charleroi 95\n1060 Bruxelles, Belgia\nSite web: www.bdf.belgium.be"
        },
        {
          title: "14. Îmbunătățire Continuă",
          content: "Ne angajăm la îmbunătățiri continue de accesibilitate:\n\n• Audituri regulate de accesibilitate\n• Testare cu utilizatori cu dizabilități\n• Formare a personalului în cele mai bune practici de accesibilitate\n• Rămânerea la curent cu ghidurile WCAG\n• Implementarea feedback-ului utilizatorilor\n• Testarea caracteristicilor noi pentru accesibilitate înainte de lansare"
        },
        {
          title: "15. Resurse de Accesibilitate",
          content: "Pentru mai multe informații despre accesibilitatea web:\n\n• Inițiativa de Accesibilitate Web W3C: www.w3.org/WAI/\n• Ghiduri de Accesibilitate a Conținutului Web: www.w3.org/WAI/WCAG21/quickref/\n• Legislația belgiană de accesibilitate: www.ejustice.just.fgov.be\n• Instrumente și resurse de accesibilitate: www.a11yproject.com"
        },
        {
          title: "16. Actualizări la Această Declarație",
          content: "Această declarație de accesibilitate a fost creată în februarie 2026. Revizuim și actualizăm această declarație în mod regulat pentru a reflecta starea curentă de accesibilitate și îmbunătățirile în curs."
        }
      ]
    },
    nl: {
      title: "Toegankelijkheidsverklaring",
      lastUpdated: "Laatst bijgewerkt: februari 2026",
      intro: "Romanian Business Hub zet zich in voor het waarborgen van digitale toegankelijkheid voor mensen met een beperking. We verbeteren voortdurend de gebruikerservaring voor iedereen en passen de relevante toegankelijkheidsnormen toe.",
      sections: [
        {
          title: "1. Toewijding aan Toegankelijkheid",
          content: "We zijn toegewijd om onze website toegankelijk te maken voor het breedst mogelijke publiek, inclusief mensen met een beperking. Ons doel is te voldoen aan de Web Content Accessibility Guidelines (WCAG) 2.1 Level AA-normen."
        },
        {
          title: "2. Maatregelen ter Ondersteuning van Toegankelijkheid",
          content: "Romanian Business Hub neemt de volgende maatregelen om toegankelijkheid te waarborgen:\n\n• Toegankelijkheid opnemen als onderdeel van onze missieverklaring\n• Toegankelijkheid integreren in onze inkooppraktijken\n• Voortdurende toegankelijkheidstraining bieden voor ons personeel\n• Duidelijke toegankelijkheidsdoelen en verantwoordelijkheden toewijzen\n• Mensen met een beperking opnemen in onze ontwerppersona's"
        },
        {
          title: "3. Toegankelijkheidsfuncties",
          content: "Onze website bevat de volgende toegankelijkheidsfuncties:\n\n• Semantische HTML-markering voor correcte documentstructuur\n• ARIA-labels en landmarks voor schermlezers\n• Toetsenbordnavigatie-ondersteuning op de hele site\n• Spring naar hoofdinhoud-link voor toetsenbordgebruikers\n• Focus-indicatoren voor interactieve elementen\n• Alternatieve tekst voor afbeeldingen\n• Juiste kopjenhiërarchie (H1-H6)\n• Voldoende kleurcontrastverhoudingen\n• Responsief ontwerp voor verschillende schermformaten\n• Formulierlabels en foutmeldingen\n• Geen automatisch afspelende media\n• Leesbare lettertypen en aanpasbare tekstgroottes"
        },
        {
          title: "4. Conformiteitsstatus",
          content: "De Web Content Accessibility Guidelines (WCAG) definieert vereisten voor ontwerpers en ontwikkelaars om de toegankelijkheid voor mensen met een beperking te verbeteren. Het definieert drie conformiteitsniveaus: Level A, Level AA en Level AAA.\n\nRomanian Business Hub is gedeeltelijk conform WCAG 2.1 Level AA. Gedeeltelijk conform betekent dat sommige delen van de inhoud niet volledig voldoen aan de toegankelijkheidsnorm."
        },
        {
          title: "5. Bekende Beperkingen",
          content: "Ondanks onze inspanningen om de toegankelijkheid van Romanian Business Hub te waarborgen, kunnen er enkele beperkingen zijn:\n\n• Sommige inhoud van derden is mogelijk niet volledig toegankelijk\n• Door gebruikers gegenereerde inhoud (bedrijfsvermeldingen, beoordelingen) voldoet mogelijk niet aan toegankelijkheidsnormen\n• Sommige oudere PDF-documenten zijn mogelijk niet volledig toegankelijk\n• Sommige door gebruikers geüploade afbeeldingen missen mogelijk geschikte alternatieve tekst\n\nWe blijven werken aan het verbeteren van deze gebieden."
        },
        {
          title: "6. Technische Specificaties",
          content: "De toegankelijkheid van Romanian Business Hub is afhankelijk van de volgende technologieën:\n\n• HTML5\n• CSS3\n• JavaScript\n• ARIA (Accessible Rich Internet Applications)\n• React framework\n• Radix UI-componenten (ontworpen met toegankelijkheid in gedachten)\n\nDeze technologieën worden gebruikt voor conformiteit met de gebruikte toegankelijkheidsnormen."
        },
        {
          title: "7. Beoordelingsaanpak",
          content: "Romanian Business Hub heeft de toegankelijkheid van deze website beoordeeld door de volgende benaderingen:\n\n• Zelfevaluatie met geautomatiseerde testtools\n• Handmatig testen met toetsenbordnavigatie\n• Schermlezertest (NVDA, JAWS)\n• Kleurcontrastanalyse\n• Responsief ontwerptesten\n• Verzameling van gebruikersfeedback"
        },
        {
          title: "8. Ondersteunde Browsers en Hulptechnologieën",
          content: "Onze website is ontworpen om compatibel te zijn met:\n\n**Browsers:**\n• Chrome (nieuwste versie)\n• Firefox (nieuwste versie)\n• Safari (nieuwste versie)\n• Edge (nieuwste versie)\n\n**Hulptechnologieën:**\n• Schermlezers (JAWS, NVDA, VoiceOver)\n• Schermvergrotingssoftware\n• Spraakherkenningssoftware\n• Toetsenbord-alleen navigatie"
        },
        {
          title: "9. Toetsenbordnavigatie",
          content: "U kunt op onze website navigeren met een toetsenbord:\n\n• **Tab** - Vooruit bewegen door interactieve elementen\n• **Shift + Tab** - Achteruit bewegen door interactieve elementen\n• **Enter/Space** - Knoppen en links activeren\n• **Pijltoetsen** - Navigeren door menu's en dropdowns\n• **Esc** - Modals en dialogen sluiten\n• **Spring naar hoofdinhoud**-link verschijnt bij tabben vanaf de bovenkant van de pagina"
        },
        {
          title: "10. Tekstgrootte en Contrast",
          content: "Om de leesbaarheid te verbeteren:\n\n• Gebruik de zoomfunctie van uw browser (Ctrl/Cmd + of -)\n• Pas de tekstgrootte aan in uw browserinstellingen\n• Gebruik browserextensies voor verbeterd contrast\n• Onze kleurencombinaties voldoen aan WCAG AA-contrastvereisten\n• Tekst kan tot 200% worden vergroot zonder functionaliteitsverlies"
        },
        {
          title: "11. Inhoud van Derden",
          content: "Sommige inhoud op onze website komt van derden:\n\n• Ingesloten kaarten (Google Maps)\n• Social media-embeds\n• Analysetools (Google Analytics)\n• Door gebruikers gegenereerde inhoud\n\nWe kunnen de toegankelijkheid van inhoud van derden niet garanderen, maar we moedigen onze contentproviders aan om hun inhoud toegankelijk te maken."
        },
        {
          title: "12. Feedback en Contactinformatie",
          content: "We verwelkomen uw feedback over de toegankelijkheid van Romanian Business Hub. Als u toegankelijkheidsbarrières tegenkomt:\n\n**E-mail:** accessibility@ro-businesshub.be\n**Telefoon:** +32 467 78 92 59\n**Adres:** Romanian Business Hub, 8800 Roeselare, West-Vlaanderen, België\n\nGeef alstublieft:\n• URL van de pagina met het probleem\n• Beschrijving van het probleem\n• Hulptechnologie die u gebruikt (indien van toepassing)\n• Uw contactgegevens voor opvolging\n\nWe streven ernaar om binnen 5 werkdagen te reageren op toegankelijkheidsfeedback."
        },
        {
          title: "13. Formele Klachten",
          content: "Als u niet tevreden bent met ons antwoord op uw toegankelijkheidsproblemen, kunt u een klacht indienen bij:\n\n**Belgisch Instituut voor gelijkheid van vrouwen en mannen**\nRue Ernest Blerot 1\n1070 Brussel, België\nWebsite: igvm-iefh.belgium.be\nE-mail: egalite.hommesfemmes@iefh.belgique.be\n\nU kunt ook contact opnemen met:\n\n**Belgisch Forum voor Personen met een Handicap**\nChaussée de Charleroi 95\n1060 Brussel, België\nWebsite: www.bdf.belgium.be"
        },
        {
          title: "14. Continue Verbetering",
          content: "We zijn toegewijd aan voortdurende toegankelijkheidsverbeteringen:\n\n• Regelmatige toegankelijkheidsaudits\n• Gebruikerstesten met mensen met een beperking\n• Personeelstraining over best practices op het gebied van toegankelijkheid\n• Bijblijven met WCAG-richtlijnen\n• Implementeren van gebruikersfeedback\n• Nieuwe functies testen op toegankelijkheid voor lancering"
        },
        {
          title: "15. Toegankelijkheidsbronnen",
          content: "Voor meer informatie over webtoegankel ijkheid:\n\n• W3C Web Accessibility Initiative: www.w3.org/WAI/\n• Web Content Accessibility Guidelines: www.w3.org/WAI/WCAG21/quickref/\n• Belgische toegankelijkheidswetgeving: www.ejustice.just.fgov.be\n• Toegankelijkheidstools en -bronnen: www.a11yproject.com"
        },
        {
          title: "16. Updates van Deze Verklaring",
          content: "Deze toegankelijkheidsverklaring is opgesteld in februari 2026. We herzien en actualiseren deze verklaring regelmatig om de huidige toegankelijkheidsstatus en voortdurende verbeteringen weer te geven."
        }
      ]
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  return (
    <>
      <SEO
        title={`${t.title} - Romanian Business Hub`}
        description="Accessibility statement for Romanian Business Hub. Learn about our commitment to digital accessibility, WCAG compliance, and how we support users with disabilities."
        keywords="accessibility statement, WCAG, web accessibility, disability access, inclusive design, Romanian Business Hub"
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

export default AccessibilityPage;
