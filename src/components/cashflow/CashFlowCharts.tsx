import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatEUR, type CashFlowResult } from '@/hooks/useCashFlowCalculator';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  normalResult: CashFlowResult;
  stressResult: CashFlowResult;
  t: CashFlowTranslations;
}

export default function CashFlowCharts({ normalResult, stressResult, t }: Props) {
  const hasData = normalResult.totalInflows > 0 || normalResult.totalOutflows > 0;

  const monthLabels = [t.chartsMonth1, t.chartsMonth2, t.chartsMonth3, t.chartsMonth4, t.chartsMonth5, t.chartsMonth6];

  const barData = useMemo(() => {
    if (!hasData) return [];
    // Simulate 6 months with slight variance to make it dynamic
    return monthLabels.map((label, i) => {
      const growthFactor = 1 + (i * 0.03); // 3% monthly growth
      const seasonality = 1 + Math.sin((i / 6) * Math.PI) * 0.05;
      return {
        name: label,
        [t.chartsInflows]: Math.round(normalResult.totalInflows * growthFactor * seasonality),
        [t.chartsOutflows]: Math.round(normalResult.totalOutflows * (1 + i * 0.015)),
      };
    });
  }, [normalResult, hasData, t]);

  const lineData = useMemo(() => {
    if (!hasData) return [];
    let normalBalance = normalResult.finalBalance - normalResult.operationalCashFlow;
    let stressBalance = stressResult.finalBalance - stressResult.operationalCashFlow;

    return monthLabels.map((label, i) => {
      const growthFactor = 1 + (i * 0.03);
      const seasonality = 1 + Math.sin((i / 6) * Math.PI) * 0.05;
      const monthlyNormalCF = (normalResult.totalInflows * growthFactor * seasonality) - (normalResult.totalOutflows * (1 + i * 0.015));
      const monthlyStressCF = (stressResult.totalInflows * growthFactor * seasonality) - (stressResult.totalOutflows * (1 + i * 0.015));

      normalBalance += monthlyNormalCF;
      stressBalance += monthlyStressCF;

      return {
        name: label,
        [t.chartsBalance]: Math.round(normalBalance),
        [t.chartsBalanceStress]: Math.round(stressBalance),
      };
    });
  }, [normalResult, stressResult, hasData, t]);

  const fmtTooltip = (v: number) => formatEUR(v);

  if (!hasData) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-4">{t.chartsTitle}</h2>
          <p className="text-muted-foreground text-lg">{t.chartsNoData}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-2xl font-bold text-foreground text-center sm:text-3xl">{t.chartsTitle}</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t.chartsInflowsVsOutflows}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} className="text-xs" />
                    <Tooltip formatter={fmtTooltip} />
                    <Legend />
                    <Bar dataKey={t.chartsInflows} fill="#059669" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={t.chartsOutflows} fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t.chartsFinalBalance}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="normalGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} className="text-xs" />
                    <Tooltip formatter={fmtTooltip} />
                    <Legend />
                    <Area type="monotone" dataKey={t.chartsBalance} stroke="#2563eb" strokeWidth={2} fill="url(#normalGrad)" dot={{ r: 4 }} />
                    <Area type="monotone" dataKey={t.chartsBalanceStress} stroke="#f59e0b" strokeWidth={2} fill="url(#stressGrad)" dot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
