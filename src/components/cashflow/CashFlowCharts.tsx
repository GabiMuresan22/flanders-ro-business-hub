import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatEUR, type CashFlowResult } from '@/hooks/useCashFlowCalculator';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  normalResult: CashFlowResult;
  stressResult: CashFlowResult;
  t: CashFlowTranslations;
}

export default function CashFlowCharts({ normalResult, stressResult, t }: Props) {
  const barData = [
    { name: t.chartsNormal, [t.chartsInflows]: Math.round(normalResult.totalInflows), [t.chartsOutflows]: Math.round(normalResult.totalOutflows) },
    { name: t.chartsStress, [t.chartsInflows]: Math.round(stressResult.totalInflows), [t.chartsOutflows]: Math.round(stressResult.totalOutflows) },
  ];

  const lineData = [
    { name: t.chartsNormal, [t.chartsBalance]: Math.round(normalResult.finalBalance) },
    { name: t.chartsStress, [t.chartsBalance]: Math.round(stressResult.finalBalance) },
  ];

  const fmtTooltip = (v: number) => formatEUR(v);

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
                  <LineChart data={lineData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis tickFormatter={v => `€${(v / 1000).toFixed(0)}k`} className="text-xs" />
                    <Tooltip formatter={fmtTooltip} />
                    <Line type="monotone" dataKey={t.chartsBalance} stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
