import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useCashFlowCalculator } from '@/hooks/useCashFlowCalculator';
import CashFlowHero from '@/components/cashflow/CashFlowHero';
import CashFlowEducation from '@/components/cashflow/CashFlowEducation';
import CashFlowForm from '@/components/cashflow/CashFlowForm';
import CashFlowResults from '@/components/cashflow/CashFlowResults';
import CashFlowStress from '@/components/cashflow/CashFlowStress';
import CashFlowCharts from '@/components/cashflow/CashFlowCharts';
import CashFlowRecommendations from '@/components/cashflow/CashFlowRecommendations';
import CashFlowLeadCapture from '@/components/cashflow/CashFlowLeadCapture';
import CashFlowFAQ from '@/components/cashflow/CashFlowFAQ';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCashFlowT } from '@/translations/cashflow';

export default function CashFlowCalculatorPage() {
  const calc = useCashFlowCalculator();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getCashFlowT(language);

  const scrollToCalc = () => calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToEducation = () => educationRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDescription}
        keywords="calculator cash flow, flux numerar, antreprenori români Belgia, cash flow firmă"
      />
      <Navbar />
      <main id="main-content">
        <CashFlowHero
          result={calc.activeResult}
          onStartCalc={scrollToCalc}
          onHowItWorks={scrollToEducation}
          t={t}
        />

        <div ref={educationRef}>
          <CashFlowEducation t={t} />
        </div>

        <section ref={calculatorRef} className="py-16" id="calculator">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {t.calculatorTitle}
              </h2>
              <Button variant="outline" size="sm" onClick={calc.reset} className="gap-2">
                <RotateCcw className="h-4 w-4" /> {t.reset}
              </Button>
            </div>
            <div className="grid gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <CashFlowForm inputs={calc.inputs} updateInput={calc.updateInput} t={t} />
              </div>
              <div className="lg:col-span-2">
                <CashFlowResults result={calc.activeResult} sticky t={t} />
              </div>
            </div>
          </div>
        </section>

        <CashFlowStress
          stress={calc.stress}
          updateStress={calc.updateStress}
          normalResult={calc.normalResult}
          stressResult={calc.stressResult}
          t={t}
        />

        <CashFlowCharts
          normalResult={calc.normalResult}
          stressResult={calc.stressResult}
          t={t}
        />

        <CashFlowRecommendations result={calc.activeResult} t={t} />

        <CashFlowLeadCapture t={t} />

        <CashFlowFAQ t={t} />
      </main>
      <Footer />
    </>
  );
}
