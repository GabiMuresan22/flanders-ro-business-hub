import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Phone, MapPin, Building2, ShieldCheck } from 'lucide-react';

const content = {
  en: {
    title: 'Legal Notice',
    subtitle: 'Impressum — mandatory information pursuant to Art. XII.4 of the Belgian Code of Economic Law',
    sections: [
      {
        heading: 'Editor & Operator',
        items: [
          { label: 'Name', value: 'Gabriel Muresan' },
          { label: 'Operating under', value: 'Romanian Business Hub' },
        ],
      },
      {
        heading: 'Registered Office',
        items: [
          { label: 'Address', value: 'Lucien Boekstalestraat 6, 8800 Roeselare, Belgium' },
        ],
      },
      {
        heading: 'Company Registration',
        items: [
          { label: 'Enterprise Number (CBE / KBO)', value: '1030.197.309' },
          { label: 'VAT Identification', value: 'BE 1030.197.309' },
        ],
      },
      {
        heading: 'Contact',
        items: [
          { label: 'Email', value: 'info@ro-businesshub.be', href: 'mailto:info@ro-businesshub.be' },
          { label: 'Phone', value: '+32 467 789 259', href: 'tel:+32467789259' },
        ],
      },
      {
        heading: 'Supervisory Authority',
        items: [
          { label: 'Authority', value: 'FPS Economy, SMEs, Self-Employed and Energy' },
          { label: 'Website', value: 'economie.fgov.be', href: 'https://economie.fgov.be' },
        ],
      },
    ],
    disclaimer: 'The information on this website is provided for general informational purposes only. Romanian Business Hub strives to keep the information up to date and accurate, but makes no warranties about the completeness, accuracy, or reliability of any information on this site.',
  },
  nl: {
    title: 'Wettelijke Vermeldingen',
    subtitle: 'Impressum — verplichte informatie conform Art. XII.4 van het Belgisch Wetboek van Economisch Recht',
    sections: [
      {
        heading: 'Redacteur & Exploitant',
        items: [
          { label: 'Naam', value: 'Gabriel Muresan' },
          { label: 'Handelend onder', value: 'Romanian Business Hub' },
        ],
      },
      {
        heading: 'Maatschappelijke Zetel',
        items: [
          { label: 'Adres', value: 'Lucien Boekstalestraat 6, 8800 Roeselare, België' },
        ],
      },
      {
        heading: 'Ondernemingsregistratie',
        items: [
          { label: 'Ondernemingsnummer (KBO)', value: '1030.197.309' },
          { label: 'BTW-identificatie', value: 'BE 1030.197.309' },
        ],
      },
      {
        heading: 'Contact',
        items: [
          { label: 'E-mail', value: 'info@ro-businesshub.be', href: 'mailto:info@ro-businesshub.be' },
          { label: 'Telefoon', value: '+32 467 789 259', href: 'tel:+32467789259' },
        ],
      },
      {
        heading: 'Toezichthoudende Autoriteit',
        items: [
          { label: 'Autoriteit', value: 'FOD Economie, KMO, Middenstand en Energie' },
          { label: 'Website', value: 'economie.fgov.be', href: 'https://economie.fgov.be' },
        ],
      },
    ],
    disclaimer: 'De informatie op deze website is uitsluitend bedoeld voor algemene informatiedoeleinden. Romanian Business Hub streeft ernaar de informatie actueel en correct te houden, maar geeft geen garanties over de volledigheid, nauwkeurigheid of betrouwbaarheid van de informatie op deze site.',
  },
  ro: {
    title: 'Mențiuni Legale',
    subtitle: 'Impressum — informații obligatorii conform Art. XII.4 din Codul belgian al Dreptului Economic',
    sections: [
      {
        heading: 'Editor & Operator',
        items: [
          { label: 'Nume', value: 'Gabriel Muresan' },
          { label: 'Activând sub denumirea', value: 'Romanian Business Hub' },
        ],
      },
      {
        heading: 'Sediu Social',
        items: [
          { label: 'Adresă', value: 'Lucien Boekstalestraat 6, 8800 Roeselare, Belgia' },
        ],
      },
      {
        heading: 'Înregistrare Comercială',
        items: [
          { label: 'Număr de întreprindere (CBE / KBO)', value: '1030.197.309' },
          { label: 'Identificare TVA', value: 'BE 1030.197.309' },
        ],
      },
      {
        heading: 'Contact',
        items: [
          { label: 'Email', value: 'info@ro-businesshub.be', href: 'mailto:info@ro-businesshub.be' },
          { label: 'Telefon', value: '+32 467 789 259', href: 'tel:+32467789259' },
        ],
      },
      {
        heading: 'Autoritate de Supraveghere',
        items: [
          { label: 'Autoritate', value: 'SPF Economie, PME, Indépendants et Énergie' },
          { label: 'Website', value: 'economie.fgov.be', href: 'https://economie.fgov.be' },
        ],
      },
    ],
    disclaimer: 'Informațiile de pe acest site sunt furnizate exclusiv în scopuri informative generale. Romanian Business Hub depune eforturi pentru a menține informațiile actualizate și corecte, dar nu oferă garanții privind caracterul complet, exactitatea sau fiabilitatea oricăror informații de pe acest site.',
  },
};

const sectionIcons = [Building2, MapPin, ShieldCheck, Mail, ShieldCheck];

const LegalNoticePage = () => {
  const { language } = useLanguage();
  const lang = language as keyof typeof content;
  const c = content[lang] ?? content.en;

  return (
    <>
      <SEO
        title={`${c.title} | Romanian Business Hub`}
        description={c.subtitle}
        noindex
      />
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-grow container mx-auto max-w-3xl px-4 py-12">

          {/* Header */}
          <div className="mb-10">
            <h1 className="font-playfair text-4xl font-bold text-foreground mb-3">
              {c.title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed border-l-4 border-romania-blue pl-4">
              {c.subtitle}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {c.sections.map((section, i) => {
              const Icon = sectionIcons[i] ?? ShieldCheck;
              return (
                <div key={i} className="bg-card rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-romania-blue/10 rounded-lg p-2">
                      <Icon className="h-5 w-5 text-romania-blue" />
                    </div>
                    <h2 className="font-playfair text-lg font-bold text-foreground">
                      {section.heading}
                    </h2>
                  </div>
                  <dl className="space-y-2">
                    {section.items.map((item, j) => (
                      <div key={j} className="flex flex-col sm:flex-row sm:gap-4">
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground sm:w-52 flex-shrink-0 pt-0.5">
                          {item.label}
                        </dt>
                        <dd className="text-foreground font-medium text-sm">
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-romania-blue hover:underline"
                            >
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-muted rounded-2xl p-6 text-sm text-muted-foreground leading-relaxed">
            {c.disclaimer}
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalNoticePage;
