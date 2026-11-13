export interface Revenue {
  id: string;
  amount: number;
  description: string;
  category?: string;
  createdAt: string;
}

export interface CreateRevenueDto {
  amount: number | string;
  description: string;
  category?: string;
}

