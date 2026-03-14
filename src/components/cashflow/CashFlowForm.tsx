import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CashFlowInputs } from '@/hooks/useCashFlowCalculator';
import type { CashFlowTranslations } from '@/translations/cashflow';

interface Props {
  inputs: CashFlowInputs;
  updateInput: (key: keyof CashFlowInputs, value: number) => void;
  t: CashFlowTranslations;
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

export default function CashFlowForm({ inputs, updateInput, t }: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{t.formPeriodTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">{t.formMonth}</Label>
              <Select value={String(inputs.month)} onValueChange={v => updateInput('month', Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {t.months.map((name: string, i: number) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">{t.formYear}</Label>
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
          <NumField label={t.formInitialBalance} helper={t.formInitialBalanceHelper} value={inputs.initialBalance} onChange={v => updateInput('initialBalance', v)} placeholder="ex: 5000" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-emerald-700">{t.formInflowsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <NumField label={t.formSalesRevenue} helper={t.formSalesRevenueHelper} value={inputs.salesRevenue} onChange={v => updateInput('salesRevenue', v)} placeholder="ex: 8000" />
          <NumField label={t.formReceivables} helper={t.formReceivablesHelper} value={inputs.receivablesCollected} onChange={v => updateInput('receivablesCollected', v)} placeholder="ex: 2000" />
          <NumField label={t.formOtherIncome} helper={t.formOtherIncomeHelper} value={inputs.otherIncome} onChange={v => updateInput('otherIncome', v)} />
          <NumField label={t.formCapital} helper={t.formCapitalHelper} value={inputs.capitalContribution} onChange={v => updateInput('capitalContribution', v)} />
          <NumField label={t.formVatCollected} helper={t.formVatCollectedHelper} value={inputs.vatCollected} onChange={v => updateInput('vatCollected', v)} />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-red-600">{t.formOutflowsTitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <NumField label={t.formRent} helper={t.formRentHelper} value={inputs.rent} onChange={v => updateInput('rent', v)} placeholder="ex: 800" />
          <NumField label={t.formSalaries} helper={t.formSalariesHelper} value={inputs.salaries} onChange={v => updateInput('salaries', v)} />
          <NumField label={t.formSocial} helper={t.formSocialHelper} value={inputs.socialContributions} onChange={v => updateInput('socialContributions', v)} />
          <NumField label={t.formAccounting} helper={t.formAccountingHelper} value={inputs.accounting} onChange={v => updateInput('accounting', v)} placeholder="ex: 250" />
          <NumField label={t.formUtilities} helper={t.formUtilitiesHelper} value={inputs.utilities} onChange={v => updateInput('utilities', v)} />
          <NumField label={t.formMarketing} helper={t.formMarketingHelper} value={inputs.marketing} onChange={v => updateInput('marketing', v)} />
          <NumField label={t.formTransport} helper={t.formTransportHelper} value={inputs.transport} onChange={v => updateInput('transport', v)} />
          <NumField label={t.formSoftware} helper={t.formSoftwareHelper} value={inputs.software} onChange={v => updateInput('software', v)} />
          <NumField label={t.formInventory} helper={t.formInventoryHelper} value={inputs.inventory} onChange={v => updateInput('inventory', v)} />
          <NumField label={t.formLoans} helper={t.formLoansHelper} value={inputs.loanPayments} onChange={v => updateInput('loanPayments', v)} />
          <NumField label={t.formTaxes} helper={t.formTaxesHelper} value={inputs.taxes} onChange={v => updateInput('taxes', v)} />
          <NumField label={t.formVatPayable} helper={t.formVatPayableHelper} value={inputs.vatPayable} onChange={v => updateInput('vatPayable', v)} />
          <div className="sm:col-span-2">
            <NumField label={t.formOtherExpenses} helper={t.formOtherExpensesHelper} value={inputs.otherExpenses} onChange={v => updateInput('otherExpenses', v)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
