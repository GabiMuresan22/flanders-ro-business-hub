import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';
import { formatEUR, type CashFlowResult, type StressParams } from '@/hooks/useCashFlowCalculator';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  stress: StressParams;
  updateStress: (key: keyof StressParams, value: number | boolean) => void;
  normalResult: CashFlowResult;
  stressResult: CashFlowResult;
  t: CashFlowTranslations;
}

export default function CashFlowStress({ stress, updateStress, normalResult, stressResult, t }: Props) {
  const gap = stressResult.finalBalance < 0 ? Math.abs(stressResult.finalBalance) : 0;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{t.stressTitle}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.stressSubtitle}</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{t.stressParamsTitle}</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="stress-toggle" className="text-sm">{t.stressEnable}</Label>
                <Switch id="stress-toggle" checked={stress.enabled} onCheckedChange={v => updateStress('enabled', v)} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <SliderField label={`${t.stressCostIncrease}: +${stress.costIncrease}%`} value={stress.costIncrease} onChange={v => updateStress('costIncrease', v)} max={50} />
            <SliderField label={`${t.stressRevenueDecrease}: -${stress.revenueDecrease}%`} value={stress.revenueDecrease} onChange={v => updateStress('revenueDecrease', v)} max={50} />
            <SliderField label={`${t.stressUncollected}: ${stress.uncollectedReceivables}%`} value={stress.uncollectedReceivables} onChange={v => updateStress('uncollectedReceivables', v)} max={100} />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <CompareCard icon={<TrendingDown className="h-5 w-5 text-red-500" />} title={`${t.stressCostIncrease} +${stress.costIncrease}%`} normal={formatEUR(normalResult.totalOutflows)} stressed={formatEUR(stressResult.totalOutflows)} normalLabel={t.stressNormal} stressLabel={t.stressStressed} />
          <CompareCard icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} title={`${t.stressRevenueDecrease} -${stress.revenueDecrease}%`} normal={formatEUR(normalResult.totalInflows)} stressed={formatEUR(stressResult.totalInflows)} normalLabel={t.stressNormal} stressLabel={t.stressStressed} />
          <CompareCard icon={<Clock className="h-5 w-5 text-blue-500" />} title={t.stressDelayed} normal={formatEUR(normalResult.finalBalance)} stressed={formatEUR(stressResult.finalBalance)} normalLabel={t.stressNormal} stressLabel={t.stressStressed} />
        </div>

        {gap > 0 && (
          <div className="max-w-xl mx-auto rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-red-700 font-semibold">⚠️ {t.stressDeficit}: {formatEUR(gap)}</p>
            <p className="text-sm text-red-600 mt-1">{t.stressDeficitWarning}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SliderField({ label, value, onChange, max }: { label: string; value: number; onChange: (v: number) => void; max: number }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Slider value={[value]} onValueChange={v => onChange(v[0])} max={max} step={1} className="w-full" />
    </div>
  );
}

function CompareCard({ icon, title, normal, stressed, normalLabel, stressLabel }: { icon: React.ReactNode; title: string; normal: string; stressed: string; normalLabel: string; stressLabel: string }) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="pt-5 space-y-3 text-center">
        <div className="mx-auto w-fit">{icon}</div>
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">{normalLabel}</p>
            <p className="font-semibold text-foreground">{normal}</p>
          </div>
          <div>
            <p className="text-muted-foreground">{stressLabel}</p>
            <p className="font-semibold text-red-600">{stressed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
