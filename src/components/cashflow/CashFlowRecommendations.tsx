import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, ShieldCheck, PiggyBank, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import type { CashFlowResult } from '@/hooks/useCashFlowCalculator';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  result: CashFlowResult;
  t: CashFlowTranslations;
}

export default function CashFlowRecommendations({ result, t }: Props) {
  const negativeRecs = [
    { icon: <AlertTriangle className="h-5 w-5 text-amber-500" />, title: t.recNeg1Title, text: t.recNeg1Text },
    { icon: <Clock className="h-5 w-5 text-blue-500" />, title: t.recNeg2Title, text: t.recNeg2Text },
    { icon: <ShieldCheck className="h-5 w-5 text-red-500" />, title: t.recNeg3Title, text: t.recNeg3Text },
  ];

  const positiveRecs = [
    { icon: <PiggyBank className="h-5 w-5 text-emerald-600" />, title: t.recPos1Title, text: t.recPos1Text },
    { icon: <TrendingUp className="h-5 w-5 text-blue-600" />, title: t.recPos2Title, text: t.recPos2Text },
    { icon: <Lightbulb className="h-5 w-5 text-amber-500" />, title: t.recPos3Title, text: t.recPos3Text },
  ];

  const recs = result.status === 'negative' ? negativeRecs : positiveRecs;
  const isNeg = result.status === 'negative';

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t.recsTitle}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {isNeg ? t.recsNegativeSubtitle : t.recsPositiveSubtitle}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {recs.map(r => (
            <Card key={r.title} className="border-none shadow-sm">
              <CardContent className="pt-6 space-y-3">
                <div className="w-fit rounded-full bg-muted p-2.5">{r.icon}</div>
                <h3 className="font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
