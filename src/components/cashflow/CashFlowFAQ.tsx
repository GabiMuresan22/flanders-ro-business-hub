import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Ce este cash flow-ul?',
    a: 'Cash flow-ul (fluxul de numerar) reprezintă mișcarea reală a banilor în și din firma ta. Spre deosebire de profit, care este un concept contabil, cash flow-ul reflectă cât de mulți bani lichizi ai disponibili efectiv într-un anumit moment.',
  },
  {
    q: 'Care este diferența dintre cash flow și profit?',
    a: 'Profitul este diferența dintre venituri și cheltuieli conform contabilității. Cash flow-ul arată cât de mulți bani intră și ies efectiv din contul firmei. O firmă poate fi profitabilă pe hârtie, dar să nu aibă bani lichizi dacă clienții plătesc cu întârziere sau stocurile sunt mari.',
  },
  {
    q: 'Cum calculez cash flow-ul lunar?',
    a: 'Adună toate încasările lunii (vânzări, creanțe colectate, alte intrări) și scade toate plățile (chirii, salarii, furnizori, taxe). Diferența este cash flow-ul operațional. Adaugă soldul inițial pentru a obține soldul final.',
  },
  {
    q: 'De ce poate o firmă să fie profitabilă, dar fără bani?',
    a: 'Aceasta se întâmplă frecvent din cauza decalajului temporal: facturezi clienți pe 60 de zile, dar plătești furnizorii pe 30 de zile. Investițiile în stocuri sau echipamente consumă lichidități fără a apărea imediat ca pierderi contabile.',
  },
  {
    q: 'Ce este un scenariu de stres financiar?',
    a: 'Un scenariu de stres simulează situații nefavorabile (costuri mai mari, venituri mai mici, creanțe neîncasate) pentru a vedea dacă firma ta poate supraviețui financiar. Este un instrument de planificare care te ajută să fii pregătit pentru perioadele dificile.',
  },
];

export default function CashFlowFAQ() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-2xl space-y-8">
        <h2 className="text-2xl font-bold text-foreground text-center sm:text-3xl">
          ❓ Întrebări frecvente
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
