export interface BirthdaySummary {
  id: string;
  name: string;
  birthDate: string;
  ministry: string;
  contact: string;
  nextBirthday: string;
  turningAge: number;
  daysUntilBirthday: number;
}

export interface CreateBirthdayDto {
  name: string;
  birthDate: string;
  ministry: string;
  contact: string;
}

