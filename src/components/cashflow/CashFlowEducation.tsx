import { ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  t: CashFlowTranslations;
}

export default function CashFlowEducation({ t }: Props) {
  const cards = [
    { icon: <ArrowDownCircle className="h-8 w-8 text-emerald-600" />, title: t.eduCard1Title, text: t.eduCard1Text },
    { icon: <ArrowUpCircle className="h-8 w-8 text-red-500" />, title: t.eduCard2Title, text: t.eduCard2Text },
    { icon: <Scale className="h-8 w-8 text-blue-600" />, title: t.eduCard3Title, text: t.eduCard3Text },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t.eduTitle}</h2>
          <p className="text-muted-foreground leading-relaxed">{t.eduDescription}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {cards.map(c => (
            <Card key={c.title} className="text-center border-none shadow-sm bg-background">
              <CardContent className="pt-6 space-y-3">
                <div className="mx-auto w-fit rounded-full bg-muted p-3">{c.icon}</div>
                <h3 className="font-semibold text-foreground text-lg">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
