export interface Member {
  id: string;
  communityId: string;
  name: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  ministry?: string;
  status: string; // 'ACTIVE' | 'INACTIVE' | 'ATIVO' | 'INATIVO'
  inactiveReason?: string;
  createdAt?: string;
  updatedAt?: string;
  isSteward?: boolean;
}

export interface CreateMemberDto {
  communityId: string;
  name: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  ministry?: string;
  status?: string;
  inactiveReason?: string;
  isSteward?: boolean;
}
