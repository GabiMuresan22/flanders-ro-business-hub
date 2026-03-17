import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BelgiumTaxT } from '@/translations/belgiumTax';
import type { TaxResult } from '@/hooks/useBelgiumTaxCalculator';

interface Props {
  result: TaxResult;
  hasInput: boolean;
  t: BelgiumTaxT;
}

function fmt(n: number) {
  return '€' + n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TaxBreakdown({ result, hasInput, t }: Props) {
  if (!hasInput) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-playfair">{t.breakdownTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground">{t.bracketRange}</th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground">{t.bracketAmount}</th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground">{t.bracketRate}</th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground">{t.bracketTax}</th>
                  </tr>
                </thead>
                <tbody>
                  {result.brackets.map((b, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-3">{b.label}</td>
                      <td className="py-2 px-3 text-right">{fmt(b.amount)}</td>
                      <td className="py-2 px-3 text-right">{(b.rate * 100).toFixed(0)}%</td>
                      <td className="py-2 px-3 text-right font-medium">{fmt(b.tax)}</td>
                    </tr>
                  ))}
                  <tr className="border-b border-border/50 text-green-700">
                    <td className="py-2 px-3" colSpan={3}>{t.taxFreeReduction}</td>
                    <td className="py-2 px-3 text-right font-medium">-{fmt(result.taxFreeReduction)}</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2 px-3" colSpan={3}>Total</td>
                    <td className="py-2 px-3 text-right text-romania-blue">{fmt(result.incomeTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
