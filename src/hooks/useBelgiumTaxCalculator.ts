import { useState, useMemo } from 'react';

export type ActivityType = 'primary' | 'secondary';

export interface TaxInputs {
  activityType: ActivityType;
  annualIncome: number;
  deductibleCosts: number;
  vatIncluded: boolean;
  hasPersonalDeductions: boolean;
}

export interface TaxResult {
  grossProfit: number;
  socialContributions: number;
  taxableBase: number;
  grossTax: number;
  taxFreeReduction: number;
  incomeTax: number;
  netIncome: number;
  reserveRecommended: number;
  reservePercent: number;
  effectiveTaxRate: number;
  brackets: { label: string; amount: number; rate: number; tax: number }[];
}

const TAX_FREE_AMOUNT = 10910;
const TAX_FREE_REDUCTION = TAX_FREE_AMOUNT * 0.25; // 2727.50

const BRACKETS = [
  { limit: 16320, rate: 0.25 },
  { limit: 28800, rate: 0.40 },
  { limit: 49840, rate: 0.45 },
  { limit: Infinity, rate: 0.50 },
];

function calculateProgressiveTax(taxableBase: number) {
  let remaining = taxableBase;
  let totalTax = 0;
  let prevLimit = 0;
  const brackets: TaxResult['brackets'] = [];

  for (const bracket of BRACKETS) {
    const width = bracket.limit === Infinity ? remaining : bracket.limit - prevLimit;
    const taxableInBracket = Math.min(remaining, width);
    if (taxableInBracket <= 0) break;

    const tax = taxableInBracket * bracket.rate;
    totalTax += tax;
    brackets.push({
      label: bracket.limit === Infinity
        ? `> €${prevLimit.toLocaleString('de-DE')}`
        : `€${prevLimit.toLocaleString('de-DE')} – €${bracket.limit.toLocaleString('de-DE')}`,
      amount: taxableInBracket,
      rate: bracket.rate,
      tax,
    });

    remaining -= taxableInBracket;
    prevLimit = bracket.limit;
  }

  return { totalTax, brackets };
}

export function computeTax(inputs: TaxInputs): TaxResult {
  const { annualIncome, deductibleCosts, vatIncluded } = inputs;

  // If VAT included, strip 21% VAT
  const incomeExVat = vatIncluded ? annualIncome / 1.21 : annualIncome;
  const grossProfit = Math.max(incomeExVat - deductibleCosts, 0);

  // Social contributions ~20.5%
  const socialContributions = grossProfit * 0.205;

  // Taxable base
  const taxableBase = Math.max(grossProfit - socialContributions, 0);

  // Progressive tax
  const { totalTax: grossTax, brackets } = calculateProgressiveTax(taxableBase);

  // Tax-free reduction
  const incomeTax = Math.max(grossTax - TAX_FREE_REDUCTION, 0);

  // Net income
  const netIncome = Math.max(grossProfit - socialContributions - incomeTax, 0);

  // Reserve
  const reserveRecommended = socialContributions + incomeTax;
  const reservePercent = grossProfit > 0 ? (reserveRecommended / grossProfit) * 100 : 0;
  const effectiveTaxRate = grossProfit > 0 ? (reserveRecommended / grossProfit) * 100 : 0;

  return {
    grossProfit,
    socialContributions,
    taxableBase,
    grossTax,
    taxFreeReduction: TAX_FREE_REDUCTION,
    incomeTax,
    netIncome,
    reserveRecommended,
    reservePercent,
    effectiveTaxRate,
    brackets,
  };
}

const defaultInputs: TaxInputs = {
  activityType: 'primary',
  annualIncome: 0,
  deductibleCosts: 0,
  vatIncluded: false,
  hasPersonalDeductions: false,
};

export function useBelgiumTaxCalculator() {
  const [inputs, setInputs] = useState<TaxInputs>(defaultInputs);

  const updateInput = <K extends keyof TaxInputs>(key: K, value: TaxInputs[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const result = useMemo(() => computeTax(inputs), [inputs]);

  const hasInput = inputs.annualIncome > 0;

  const reset = () => setInputs(defaultInputs);

  return { inputs, updateInput, result, hasInput, reset };
}
