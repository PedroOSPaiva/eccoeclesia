import { Injectable, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { BirthdaySummary, CreateBirthdayDto } from '../models/birthday.model';

@Injectable({
  providedIn: 'root',
})
export class BirthdayService extends BaseApiService<BirthdaySummary, CreateBirthdayDto> {
  protected override get apiUrl(): string {
    return '/api/birthdays';
  }

  // Alias para manter compatibilidade com componentes existentes
  readonly birthdays = this.items;

  readonly thisMonthBirthdays = computed<BirthdaySummary[]>(() =>
    this._items().filter((b) => b.daysUntilBirthday <= 30)
  );

  loadBirthdays(): Observable<BirthdaySummary[]> {
    return this.load();
  }

  createBirthday(dto: CreateBirthdayDto): Observable<BirthdaySummary> {
    return this.create(dto);
  }
}
