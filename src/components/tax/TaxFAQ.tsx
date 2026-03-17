import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { BelgiumTaxT } from '@/translations/belgiumTax';

interface Props {
  t: BelgiumTaxT;
}

export default function TaxFAQ({ t }: Props) {
  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold font-playfair text-center mb-8 text-foreground">{t.faqTitle}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
