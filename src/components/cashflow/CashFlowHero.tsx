import { ArrowDown, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatEUR, type CashFlowResult } from '@/hooks/useCashFlowCalculator';
import { cn } from '@/lib/utils';

interface Props {
  result: CashFlowResult;
  onStartCalc: () => void;
  onHowItWorks: () => void;
}

export default function CashFlowHero({ result, onStartCalc, onHowItWorks }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              Calculator Cash Flow
              <span className="block text-primary">pentru antreprenori români în Belgia</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
              Calculează rapid câți bani intră, câți ies și dacă firma ta rămâne pe plus în fiecare lună.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={onStartCalc} className="gap-2 text-base">
                <ArrowDown className="h-4 w-4" /> Începe calculul
              </Button>
              <Button size="lg" variant="outline" onClick={onHowItWorks} className="text-base">
                Vezi cum funcționează
              </Button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4">
            <SummaryCard
              icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
              label="Total încasări"
              value={formatEUR(result.totalInflows)}
              color="bg-emerald-50 border-emerald-200"
            />
            <SummaryCard
              icon={<TrendingDown className="h-5 w-5 text-red-500" />}
              label="Total cheltuieli"
              value={formatEUR(result.totalOutflows)}
              color="bg-red-50 border-red-200"
            />
            <SummaryCard
              icon={<Wallet className="h-5 w-5 text-blue-600" />}
              label="Cash flow net"
              value={formatEUR(result.operationalCashFlow)}
              color="bg-blue-50 border-blue-200"
            />
            <SummaryCard
              label="Sold final"
              value={formatEUR(result.finalBalance)}
              color={cn(
                result.status === 'positive' && 'bg-emerald-50 border-emerald-300',
                result.status === 'negative' && 'bg-red-50 border-red-300',
                result.status === 'neutral' && 'bg-yellow-50 border-yellow-300'
              )}
              badge={
                result.status === 'positive' ? '✅ Pozitiv' :
                result.status === 'negative' ? '🔴 Negativ' : '🟡 Neutru'
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ icon, label, value, color, badge }: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  color: string;
  badge?: string;
}) {
  return (
    <Card className={cn('p-4 border transition-shadow hover:shadow-md', color)}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      {badge && <span className="mt-1 inline-block text-xs font-semibold">{badge}</span>}
    </Card>
  );
}
