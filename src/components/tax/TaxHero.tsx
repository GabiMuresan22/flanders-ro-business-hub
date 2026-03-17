import { Button } from '@/components/ui/button';
import { Calculator, ArrowDown } from 'lucide-react';
import type { BelgiumTaxT } from '@/translations/belgiumTax';
import type { TaxResult } from '@/hooks/useBelgiumTaxCalculator';

interface Props {
  result: TaxResult;
  hasInput: boolean;
  onStartCalc: () => void;
  onHowItWorks: () => void;
  t: BelgiumTaxT;
}

export default function TaxHero({ result, hasInput, onStartCalc, onHowItWorks, t }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-romania-blue via-romania-blue/90 to-romania-blue/80 text-white py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm">
            <Calculator className="h-4 w-4" />
            <span>2026</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
            {t.heroTitle}{' '}
            <span className="text-romania-yellow">{t.heroTitleHighlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-romania-yellow text-black hover:bg-romania-yellow/90 font-semibold gap-2"
              onClick={onStartCalc}
            >
              <Calculator className="h-5 w-5" />
              {t.heroCtaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 gap-2"
              onClick={onHowItWorks}
            >
              <ArrowDown className="h-5 w-5" />
              {t.heroCtaSecondary}
            </Button>
          </div>

          {hasInput && (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { label: t.grossProfit, value: result.grossProfit },
                { label: t.socialContributions, value: result.socialContributions },
                { label: t.incomeTax, value: result.incomeTax },
                { label: t.netIncome, value: result.netIncome },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-xs text-white/60 mb-1">{item.label}</p>
                  <p className="text-lg font-bold">€{item.value.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
