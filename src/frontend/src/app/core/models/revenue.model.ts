export interface Revenue {
  id: string;
  communityId?: string;
  amount: number;
  description: string;
  category?: string;
  createdAt: string;
}

export interface CreateRevenueDto {
  amount: number | string;
  description: string;
  category?: string;
  communityId?: string;
}

