import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle } from 'lucide-react';
import type { BelgiumTaxT } from '@/translations/belgiumTax';
import type { TaxInputs, ActivityType } from '@/hooks/useBelgiumTaxCalculator';

interface Props {
  inputs: TaxInputs;
  updateInput: <K extends keyof TaxInputs>(key: K, value: TaxInputs[K]) => void;
  t: BelgiumTaxT;
}

export default function TaxForm({ inputs, updateInput, t }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-playfair">{t.formTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Activity Type */}
        <div className="space-y-2">
          <Label className="font-semibold">{t.activityType}</Label>
          <RadioGroup
            value={inputs.activityType}
            onValueChange={(v) => updateInput('activityType', v as ActivityType)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="primary" id="primary" />
              <Label htmlFor="primary" className="cursor-pointer">{t.activityPrimary}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="secondary" id="secondary" />
              <Label htmlFor="secondary" className="cursor-pointer">{t.activitySecondary}</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Annual Income */}
        <div className="space-y-2">
          <Label htmlFor="annualIncome" className="font-semibold">{t.annualIncome}</Label>
          <Input
            id="annualIncome"
            type="number"
            min={0}
            placeholder={t.annualIncomePlaceholder}
            value={inputs.annualIncome || ''}
            onChange={(e) => updateInput('annualIncome', Number(e.target.value) || 0)}
          />
        </div>

        {/* Deductible Costs */}
        <div className="space-y-2">
          <Label htmlFor="deductibleCosts" className="font-semibold">{t.deductibleCosts}</Label>
          <Input
            id="deductibleCosts"
            type="number"
            min={0}
            placeholder={t.deductibleCostsPlaceholder}
            value={inputs.deductibleCosts || ''}
            onChange={(e) => updateInput('deductibleCosts', Number(e.target.value) || 0)}
          />
        </div>

        {/* VAT Included */}
        <div className="space-y-2">
          <Label className="font-semibold">{t.vatIncluded}</Label>
          <RadioGroup
            value={inputs.vatIncluded ? 'yes' : 'no'}
            onValueChange={(v) => updateInput('vatIncluded', v === 'yes')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vatNo" />
              <Label htmlFor="vatNo" className="cursor-pointer">{t.vatNo}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="vatYes" />
              <Label htmlFor="vatYes" className="cursor-pointer">{t.vatYes}</Label>
            </div>
          </RadioGroup>
          <p className="text-xs text-muted-foreground flex items-start gap-1">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            {t.vatHint}
          </p>
        </div>

        {/* Personal Deductions */}
        <div className="space-y-2">
          <Label className="font-semibold">{t.hasDeductions}</Label>
          <RadioGroup
            value={inputs.hasPersonalDeductions ? 'yes' : 'no'}
            onValueChange={(v) => updateInput('hasPersonalDeductions', v === 'yes')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="deductNo" />
              <Label htmlFor="deductNo" className="cursor-pointer">{t.deductionsNo}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="deductYes" />
              <Label htmlFor="deductYes" className="cursor-pointer">{t.deductionsYes}</Label>
            </div>
          </RadioGroup>
          {inputs.hasPersonalDeductions && (
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              {t.deductionsHint}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
