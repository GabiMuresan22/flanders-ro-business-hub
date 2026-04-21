import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, MapPin, Building2, ShieldCheck, Server } from 'lucide-react';

const content = {
  en: {
    title: 'Legal Notice',
    sections: [
      {
        heading: 'Editor & Operator',
        items: [
          { label: 'Name', value: 'Gabriel Muresan' },
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
        heading: 'Hosting & Infrastructure',
        items: [
          { label: 'Hosting Platform', value: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA' },
          { label: 'Database Provider', value: 'Supabase Inc., 970 Summer St, Stamford, CT 06905, USA' },
        ],
      },
      {
        heading: 'Supervisory Authority',
        items: [
          { label: 'Authority', value: 'FPS Economy, SMEs, Self-Employed and Energy' },
        ],
      },
    ],
  },
  nl: {
    title: 'Wettelijke Vermeldingen',
    sections: [
      {
        heading: 'Redacteur & Exploitant',
        items: [
          { label: 'Naam', value: 'Gabriel Muresan' },
        ],
      },
      {
        heading: 'Maatschappelijke Zetel',
        items: [
          { label: 'Adres', value: 'Lucien Boekstalestraat 6, 8800 Roeselare, Belgi\u00eb' },
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
        heading: 'Hosting & Infrastructuur',
        items: [
          { label: 'Hosting Platform', value: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA' },
          { label: 'Database Provider', value: 'Supabase Inc., 970 Summer St, Stamford, CT 06905, USA' },
        ],
      },
      {
        heading: 'Toezichthoudende Autoriteit',
        items: [
          { label: 'Autoriteit', value: 'FOD Economie, KMO, Middenstand en Energie' },
        ],
      },
    ],
  },
  ro: {
    title: 'Men\u021biuni Legale',
    sections: [
      {
        heading: 'Editor & Operator',
        items: [
          { label: 'Nume', value: 'Gabriel Muresan' },
        ],
      },
      {
        heading: 'Sediu Social',
        items: [
          { label: 'Adres\u0103', value: 'Lucien Boekstalestraat 6, 8800 Roeselare, Belgia' },
        ],
      },
      {
        heading: '\u00cenregistrare Comercial\u0103',
        items: [
          { label: 'Num\u0103r de \u00eentreprindere (CBE / KBO)', value: '1030.197.309' },
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
        heading: 'G\u0103zduire \u0219i Infrastructur\u0103',
        items: [
          { label: 'Platform\u0103 G\u0103zduire', value: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, SUA' },
          { label: 'Furnizor Baz\u0103 de Date', value: 'Supabase Inc., 970 Summer St, Stamford, CT 06905, SUA' },
        ],
      },
      {
        heading: 'Autoritate de Supraveghere',
        items: [
          { label: 'Autoritate', value: 'FPS Economy, SMEs, Self-Employed and Energy' },
        ],
      },
    ],
  },
};

const sectionIcons = [Building2, MapPin, ShieldCheck, Mail, Server, ShieldCheck];

const LegalNoticePage = () => {
  const { language } = useLanguage();
  const lang = language as keyof typeof content;
  const c = content[lang] ?? content.en;

  return (
    <>
      <SEO
        title={`${c.title} | Romanian Business Hub`}
        description="Editor & Operator, registered office, enterprise and VAT details, contact information, hosting and infrastructure providers, and supervisory authority."
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

        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalNoticePage;
