import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useBelgiumTaxCalculator } from '@/hooks/useBelgiumTaxCalculator';
import TaxHero from '@/components/tax/TaxHero';
import TaxForm from '@/components/tax/TaxForm';
import TaxResults from '@/components/tax/TaxResults';
import TaxBreakdown from '@/components/tax/TaxBreakdown';
import TaxFAQ from '@/components/tax/TaxFAQ';
import TaxCTA from '@/components/tax/TaxCTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { getBelgiumTaxT } from '@/translations/belgiumTax';

export default function BelgiumTaxCalculatorPage() {
  const calc = useBelgiumTaxCalculator();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getBelgiumTaxT(language);

  const scrollToCalc = () => calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToInfo = () => infoRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        keywords="calculator taxe belgia, taxe independent belgia, contribuții sociale belgia, impozit belgia 2026"
      />
      <Navbar />
      <main id="main-content">
        <TaxHero
          result={calc.result}
          hasInput={calc.hasInput}
          onStartCalc={scrollToCalc}
          onHowItWorks={scrollToInfo}
          t={t}
        />

        {/* Info section anchor */}
        <div ref={infoRef} />

        <section ref={calculatorRef} className="py-16" id="calculator">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl font-playfair">
                {t.pageTitle}
              </h2>
              <Button variant="outline" size="sm" onClick={calc.reset} className="gap-2">
                <RotateCcw className="h-4 w-4" /> {t.reset}
              </Button>
            </div>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <TaxForm inputs={calc.inputs} updateInput={calc.updateInput} t={t} />
              </div>
              <div className="lg:col-span-2">
                <TaxResults result={calc.result} inputs={calc.inputs} hasInput={calc.hasInput} t={t} />
              </div>
            </div>
          </div>
        </section>

        <TaxBreakdown result={calc.result} hasInput={calc.hasInput} t={t} />
        <TaxCTA t={t} />
        <TaxFAQ t={t} />
      </main>
      <Footer />
    </>
  );
}
