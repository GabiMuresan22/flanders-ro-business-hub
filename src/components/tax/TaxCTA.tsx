import { Button } from '@/components/ui/button';
import { BookOpen, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BelgiumTaxT } from '@/translations/belgiumTax';

interface Props {
  t: BelgiumTaxT;
}

export default function TaxCTA({ t }: Props) {
  return (
    <section className="py-12 bg-romania-blue/5">
      <div className="container mx-auto px-4 max-w-2xl text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/resurse/taxe-independent-belgia-2026">
            <Button variant="default" size="lg" className="gap-2 w-full sm:w-auto h-auto whitespace-normal text-center py-3">
              <BookOpen className="h-5 w-5 shrink-0" />
              {t.ctaGuide}
            </Button>
          </Link>
          <Link to="/calculator-cash-flow">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <BarChart3 className="h-5 w-5" />
              {t.ctaCashFlow}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
