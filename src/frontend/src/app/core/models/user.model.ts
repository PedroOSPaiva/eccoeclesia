export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  birthDate?: string;
  address?: string;
  photoUrl?: string;
  roles: string[];
  authorities?: string[];
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  password?: string;
  fullName: string;
  birthDate?: string;
  address?: string;
  roles?: string[];
}

