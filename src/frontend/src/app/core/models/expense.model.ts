export interface Expense {
  id: string;
  amount: number;
  description: string;
  category?: string;
  createdAt: string;
}

export interface CreateExpenseDto {
  amount: number | string;
  description: string;
  category?: string;
}

