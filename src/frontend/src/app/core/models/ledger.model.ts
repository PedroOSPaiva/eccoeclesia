export type LedgerEntryType = 'INCOME' | 'EXPENSE';

export interface LedgerEntry {
  id: string;
  communityId?: string;
  memberId?: string;
  accountCode: string;
  referenceCode: string;
  costCenter: string;
  description: string;
  amount: number;
  type: LedgerEntryType;
  occurredOn: string; // Formato ISO YYYY-MM-DD
}

export interface CreateLedgerEntryDto {
  accountCode: string;
  referenceCode: string;
  costCenter: string;
  description: string;
  amount: number | string;
  type: LedgerEntryType;
  occurredOn?: string;
  communityId?: string;
  memberId?: string;
}

export interface LedgerFilter {
  start?: string;
  end?: string;
  type?: LedgerEntryType | 'ALL';
}

export interface LedgerFinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  entryCount: number;
}
