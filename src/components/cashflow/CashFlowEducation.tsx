import { ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const cards = [
  {
    icon: <ArrowDownCircle className="h-8 w-8 text-emerald-600" />,
    title: 'Încasări',
    text: 'Banii care intră în firmă: vânzări, creanțe recuperate, aport de capital sau alte surse de venit.',
  },
  {
    icon: <ArrowUpCircle className="h-8 w-8 text-red-500" />,
    title: 'Cheltuieli',
    text: 'Banii care ies din firmă: chirii, salarii, furnizori, taxe, credite și costuri operaționale.',
  },
  {
    icon: <Scale className="h-8 w-8 text-blue-600" />,
    title: 'Sold net',
    text: 'Diferența dintre încasări și cheltuieli. Un sold pozitiv înseamnă lichiditate sănătoasă.',
  },
];

export default function CashFlowEducation() {
  return (
    <section id="how-it-works" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ce este cash flow-ul și de ce contează?
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cash flow-ul (fluxul de numerar) reflectă mișcarea reală a banilor în firma ta. Spre deosebire de profit, care este un concept contabil, cash flow-ul arată dacă ai suficienți bani disponibili pentru a plăti facturile, salariile și furnizorii la timp. Monitorizarea lunară a cash flow-ului te ajută să iei decizii financiare mai bune și să eviți blocajele de lichiditate.
          </p>
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
