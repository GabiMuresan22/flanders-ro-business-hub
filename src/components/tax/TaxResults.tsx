import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import type { BelgiumTaxT } from '@/translations/belgiumTax';
import type { TaxResult, TaxInputs } from '@/hooks/useBelgiumTaxCalculator';

interface Props {
  result: TaxResult;
  inputs: TaxInputs;
  hasInput: boolean;
  t: BelgiumTaxT;
}

function fmt(n: number) {
  return '€' + n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TaxResults({ result, inputs, hasInput, t }: Props) {
  if (!hasInput) {
    return (
      <Card className="sticky top-24">
        <CardContent className="py-12 text-center">
          <Info className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">{t.noDataYet}</p>
        </CardContent>
      </Card>
    );
  }

  const showHighTax = result.reservePercent > 35;
  const showLowIncome = result.netIncome < 20000 && result.netIncome > 0;
  const showSecondary = inputs.activityType === 'secondary';

  return (
    <div className="space-y-4 sticky top-24">
      <Card className="border-2 border-romania-blue/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-playfair flex items-center gap-2">
            {t.resultsTitle}
            <Badge variant="secondary" className="text-xs">
              {result.effectiveTaxRate.toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResultRow icon={<TrendingUp className="h-4 w-4 text-green-600" />} label={t.grossProfit} value={fmt(result.grossProfit)} className="text-foreground" />
          <ResultRow icon={<TrendingDown className="h-4 w-4 text-orange-500" />} label={t.socialContributions} value={`-${fmt(result.socialContributions)}`} className="text-orange-600" />
          <ResultRow icon={<TrendingDown className="h-4 w-4 text-red-500" />} label={t.incomeTax} value={`-${fmt(result.incomeTax)}`} className="text-red-600" />
          <hr className="border-border" />
          <ResultRow icon={<TrendingUp className="h-4 w-4 text-romania-blue" />} label={t.netIncome} value={fmt(result.netIncome)} className="text-romania-blue font-bold text-lg" />
          <div className="bg-romania-yellow/10 rounded-lg p-3 mt-2">
            <p className="text-sm font-semibold text-foreground">{t.reserveRecommended}</p>
            <p className="text-lg font-bold text-romania-blue">{fmt(result.reserveRecommended)}</p>
            <p className="text-xs text-muted-foreground">{result.reservePercent.toFixed(1)}% {t.effectiveTaxRate.toLowerCase()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Smart Messages */}
      {(showHighTax || showLowIncome || showSecondary) && (
        <Card className="bg-muted/50">
          <CardContent className="py-4 space-y-3">
            {showHighTax && (
              <SmartMessage icon={<AlertTriangle className="h-4 w-4 text-orange-500" />} text={t.highTaxMessage} />
            )}
            {showLowIncome && (
              <SmartMessage icon={<Info className="h-4 w-4 text-romania-blue" />} text={t.lowIncomeMessage} />
            )}
            {showSecondary && (
              <SmartMessage icon={<Info className="h-4 w-4 text-muted-foreground" />} text={t.secondaryMessage} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-2">{t.disclaimer}</p>
    </div>
  );
}

function ResultRow({ icon, label, value, className }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon} {label}
      </span>
      <span className={className}>{value}</span>
    </div>
  );
}

function SmartMessage({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
