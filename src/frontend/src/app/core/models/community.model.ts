export interface Community {
  id: string;
  name: string;
  code: string;
  isMainParish: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCommunityDto {
  name: string;
  code?: string;
  isMainParish?: boolean;
}
