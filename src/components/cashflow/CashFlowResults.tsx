import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Calculator, Wallet } from 'lucide-react';
import { formatEUR, type CashFlowResult } from '@/hooks/useCashFlowCalculator';
import { cn } from '@/lib/utils';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  result: CashFlowResult;
  sticky?: boolean;
  t: CashFlowTranslations;
}

export default function CashFlowResults({ result, sticky, t }: Props) {
  const statusConfig = {
    positive: { badge: t.resultsBadgePositive, variant: 'default' as const, className: 'bg-emerald-600 hover:bg-emerald-700' },
    neutral: { badge: t.resultsBadgeNeutral, variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-foreground' },
    negative: { badge: t.resultsBadgeNegative, variant: 'destructive' as const, className: '' },
  };

  const s = statusConfig[result.status];

  return (
    <Card className={cn(
      'border-2 transition-all',
      result.status === 'positive' && 'border-emerald-300',
      result.status === 'negative' && 'border-red-300',
      result.status === 'neutral' && 'border-yellow-300',
      sticky && 'lg:sticky lg:top-24'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{t.resultsTitle}</CardTitle>
          <Badge className={s.className}>{s.badge}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ResultRow icon={<TrendingUp className="h-4 w-4 text-emerald-600" />} label={t.totalInflows} value={formatEUR(result.totalInflows)} />
        <ResultRow icon={<TrendingDown className="h-4 w-4 text-red-500" />} label={t.totalOutflows} value={formatEUR(result.totalOutflows)} />
        <div className="border-t pt-3">
          <ResultRow icon={<Calculator className="h-4 w-4 text-blue-600" />} label={t.resultsOperational} value={formatEUR(result.operationalCashFlow)} bold />
        </div>
        <div className={cn(
          'rounded-lg p-4 text-center',
          result.status === 'positive' && 'bg-emerald-50',
          result.status === 'negative' && 'bg-red-50',
          result.status === 'neutral' && 'bg-yellow-50',
        )}>
          <div className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            <span className="text-sm font-medium text-muted-foreground">{t.resultsFinalBalance}</span>
          </div>
          <p className={cn(
            'text-3xl font-extrabold mt-1',
            result.status === 'positive' && 'text-emerald-700',
            result.status === 'negative' && 'text-red-600',
            result.status === 'neutral' && 'text-yellow-700',
          )}>
            {formatEUR(result.finalBalance)}
          </p>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          <strong>{t.resultsFormulaLabel}</strong> {t.resultsFormula}
        </p>
      </CardContent>
    </Card>
  );
}

function ResultRow({ icon, label, value, bold }: { icon: React.ReactNode; label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className={cn('text-sm', bold ? 'font-semibold text-foreground' : 'text-muted-foreground')}>{label}</span>
      </div>
      <span className={cn('tabular-nums', bold ? 'text-base font-bold text-foreground' : 'text-sm font-medium text-foreground')}>{value}</span>
    </div>
  );
}
