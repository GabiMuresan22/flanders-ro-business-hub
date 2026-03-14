import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, ShieldCheck, PiggyBank, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import type { CashFlowResult } from '@/hooks/useCashFlowCalculator';

interface Props {
  result: CashFlowResult;
}

const negativeRecs = [
  { icon: <AlertTriangle className="h-5 w-5 text-amber-500" />, title: 'Renegociază termenele de plată', text: 'Cere furnizorilor termene mai lungi și clienților termene mai scurte pentru a echilibra fluxul de numerar.' },
  { icon: <Clock className="h-5 w-5 text-blue-500" />, title: 'Reduce cheltuielile neesențiale', text: 'Analizează fiecare categorie de cheltuieli și elimină sau amână ce nu este urgent.' },
  { icon: <ShieldCheck className="h-5 w-5 text-red-500" />, title: 'Pregătește o linie de credit', text: 'Discută cu banca despre o facilitate de overdraft înainte de a ajunge la blocaj financiar.' },
];

const positiveRecs = [
  { icon: <PiggyBank className="h-5 w-5 text-emerald-600" />, title: 'Constituie o rezervă de urgență', text: 'Pune deoparte echivalentul a 3 luni de cheltuieli fixe într-un cont separat.' },
  { icon: <TrendingUp className="h-5 w-5 text-blue-600" />, title: 'Reinvestește inteligent', text: 'Alocă surplus-ul în marketing, echipamente sau dezvoltare profesională pentru a crește afacerea.' },
  { icon: <Lightbulb className="h-5 w-5 text-amber-500" />, title: 'Analizează ROI-ul investițiilor', text: 'Măsoară rentabilitatea fiecărei cheltuieli pentru a optimiza alocarea bugetului.' },
];

export default function CashFlowRecommendations({ result }: Props) {
  const recs = result.status === 'negative' ? negativeRecs : positiveRecs;
  const isNeg = result.status === 'negative';

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            💡 Recomandări inteligente
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {isNeg
              ? 'Cash flow-ul tău este negativ. Iată ce poți face concret:'
              : 'Cash flow-ul tău arată bine! Iată cum poți maximiza avantajul:'}
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
