import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CashFlowInputs } from '@/hooks/useCashFlowCalculator';
import { getMonthName } from '@/hooks/useCashFlowCalculator';

interface Props {
  inputs: CashFlowInputs;
  updateInput: (key: keyof CashFlowInputs, value: number) => void;
}

function NumField({ label, helper, value, onChange, placeholder }: {
  label: string; helper?: string; value: number; onChange: (v: number) => void; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <Input
        type="number"
        min={0}
        step={1}
        placeholder={placeholder || '0'}
        value={value || ''}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        className="tabular-nums"
      />
      {helper && <p className="text-xs text-muted-foreground">{helper}</p>}
    </div>
  );
}

export default function CashFlowForm({ inputs, updateInput }: Props) {
  return (
    <div className="space-y-6">
      {/* Period & initial balance */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">📅 Perioadă și sold inițial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Luna</Label>
              <Select value={String(inputs.month)} onValueChange={v => updateInput('month', Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{getMonthName(i + 1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">An</Label>
              <Select value={String(inputs.year)} onValueChange={v => updateInput('year', Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[2024, 2025, 2026, 2027].map(y => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <NumField
            label="Sold inițial (€)"
            helper="Cât aveai în cont la începutul lunii"
            value={inputs.initialBalance}
            onChange={v => updateInput('initialBalance', v)}
            placeholder="ex: 5000"
          />
        </CardContent>
      </Card>

      {/* Inflows */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-emerald-700">💰 Încasări (intrări de bani)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NumField label="Venituri din vânzări (€)" helper="Facturi încasate de la clienți" value={inputs.salesRevenue} onChange={v => updateInput('salesRevenue', v)} placeholder="ex: 8000" />
          <NumField label="Creanțe încasate (€)" helper="Sume restante primite de la debitori" value={inputs.receivablesCollected} onChange={v => updateInput('receivablesCollected', v)} placeholder="ex: 2000" />
          <NumField label="Alte încasări (€)" helper="Subvenții, dobânzi, venituri diverse" value={inputs.otherIncome} onChange={v => updateInput('otherIncome', v)} />
          <NumField label="Finanțare / aport capital (€)" helper="Bani investiți de tine sau de parteneri" value={inputs.capitalContribution} onChange={v => updateInput('capitalContribution', v)} />
          <NumField label="TVA încasat (€)" helper="TVA colectat pe facturile emise (opțional)" value={inputs.vatCollected} onChange={v => updateInput('vatCollected', v)} />
        </CardContent>
      </Card>

      <Separator />

      {/* Outflows */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-red-600">📤 Cheltuieli (ieșiri de bani)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <NumField label="Chirie (€)" helper="Sediu social, birou, depozit" value={inputs.rent} onChange={v => updateInput('rent', v)} placeholder="ex: 800" />
          <NumField label="Salarii (€)" helper="Salarii brute angajați" value={inputs.salaries} onChange={v => updateInput('salaries', v)} />
          <NumField label="Contribuții sociale (€)" helper="ONSS, cotizații patronale" value={inputs.socialContributions} onChange={v => updateInput('socialContributions', v)} />
          <NumField label="Contabilitate (€)" helper="Onorariu contabil" value={inputs.accounting} onChange={v => updateInput('accounting', v)} placeholder="ex: 250" />
          <NumField label="Utilități (€)" helper="Electricitate, apă, internet" value={inputs.utilities} onChange={v => updateInput('utilities', v)} />
          <NumField label="Marketing (€)" helper="Publicitate, Google Ads, social media" value={inputs.marketing} onChange={v => updateInput('marketing', v)} />
          <NumField label="Transport (€)" helper="Combustibil, lease, mentenanță" value={inputs.transport} onChange={v => updateInput('transport', v)} />
          <NumField label="Software / abonamente (€)" helper="Licențe, SaaS, instrumente" value={inputs.software} onChange={v => updateInput('software', v)} />
          <NumField label="Stocuri / marfă (€)" helper="Achiziții de produse pentru vânzare" value={inputs.inventory} onChange={v => updateInput('inventory', v)} />
          <NumField label="Rate / credite (€)" helper="Rambursări împrumuturi" value={inputs.loanPayments} onChange={v => updateInput('loanPayments', v)} />
          <NumField label="Taxe și impozite (€)" helper="Impozit pe venit, taxe locale" value={inputs.taxes} onChange={v => updateInput('taxes', v)} />
          <NumField label="TVA de plată (€)" helper="TVA datorat statului" value={inputs.vatPayable} onChange={v => updateInput('vatPayable', v)} />
          <NumField label="Alte cheltuieli (€)" helper="Orice altă ieșire de bani" value={inputs.otherExpenses} onChange={v => updateInput('otherExpenses', v)} className="sm:col-span-2" />
        </CardContent>
      </Card>
    </div>
  );
}
