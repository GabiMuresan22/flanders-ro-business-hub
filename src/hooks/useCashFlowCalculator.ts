import { useState, useMemo } from 'react';

export interface CashFlowInputs {
  month: number;
  year: number;
  initialBalance: number;
  // Inflows
  salesRevenue: number;
  receivablesCollected: number;
  otherIncome: number;
  capitalContribution: number;
  vatCollected: number;
  // Outflows
  rent: number;
  salaries: number;
  socialContributions: number;
  accounting: number;
  utilities: number;
  marketing: number;
  transport: number;
  software: number;
  inventory: number;
  loanPayments: number;
  taxes: number;
  vatPayable: number;
  otherExpenses: number;
}

export interface StressParams {
  enabled: boolean;
  costIncrease: number;
  revenueDecrease: number;
  uncollectedReceivables: number;
}

export interface CashFlowResult {
  totalInflows: number;
  totalOutflows: number;
  operationalCashFlow: number;
  finalBalance: number;
  status: 'positive' | 'neutral' | 'negative';
}

const MONTHS_RO = [
  'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
  'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
];

export const getMonthName = (m: number) => MONTHS_RO[m - 1] || '';

export const defaultInputs: CashFlowInputs = {
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  initialBalance: 0,
  salesRevenue: 0,
  receivablesCollected: 0,
  otherIncome: 0,
  capitalContribution: 0,
  vatCollected: 0,
  rent: 0,
  salaries: 0,
  socialContributions: 0,
  accounting: 0,
  utilities: 0,
  marketing: 0,
  transport: 0,
  software: 0,
  inventory: 0,
  loanPayments: 0,
  taxes: 0,
  vatPayable: 0,
  otherExpenses: 0,
};

export const defaultStress: StressParams = {
  enabled: false,
  costIncrease: 10,
  revenueDecrease: 15,
  uncollectedReceivables: 20,
};

function calcResult(inputs: CashFlowInputs, stress?: StressParams): CashFlowResult {
  const revenueFactor = stress?.enabled ? (1 - stress.revenueDecrease / 100) : 1;
  const costFactor = stress?.enabled ? (1 + stress.costIncrease / 100) : 1;
  const receivableFactor = stress?.enabled ? (1 - stress.uncollectedReceivables / 100) : 1;

  const totalInflows =
    inputs.salesRevenue * revenueFactor +
    inputs.receivablesCollected * receivableFactor +
    inputs.otherIncome +
    inputs.capitalContribution +
    inputs.vatCollected * revenueFactor;

  const totalOutflows =
    (inputs.rent +
      inputs.salaries +
      inputs.socialContributions +
      inputs.accounting +
      inputs.utilities +
      inputs.marketing +
      inputs.transport +
      inputs.software +
      inputs.inventory +
      inputs.loanPayments +
      inputs.taxes +
      inputs.vatPayable +
      inputs.otherExpenses) * costFactor;

  const operationalCashFlow = totalInflows - totalOutflows;
  const finalBalance = inputs.initialBalance + operationalCashFlow;

  return {
    totalInflows,
    totalOutflows,
    operationalCashFlow,
    finalBalance,
    status: finalBalance > 500 ? 'positive' : finalBalance < 0 ? 'negative' : 'neutral',
  };
}

export function useCashFlowCalculator() {
  const [inputs, setInputs] = useState<CashFlowInputs>(defaultInputs);
  const [stress, setStress] = useState<StressParams>(defaultStress);

  const normalResult = useMemo(() => calcResult(inputs), [inputs]);
  const stressResult = useMemo(() => calcResult(inputs, { ...stress, enabled: true }), [inputs, stress]);
  const activeResult = useMemo(() => calcResult(inputs, stress), [inputs, stress]);

  const updateInput = (key: keyof CashFlowInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const updateStress = (key: keyof StressParams, value: number | boolean) => {
    setStress(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setInputs(defaultInputs);
    setStress(defaultStress);
  };

  return {
    inputs,
    stress,
    normalResult,
    stressResult,
    activeResult,
    updateInput,
    updateStress,
    reset,
    setInputs,
  };
}

export const formatEUR = (n: number) =>
  new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
