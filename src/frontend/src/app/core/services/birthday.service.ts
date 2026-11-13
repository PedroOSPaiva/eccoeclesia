import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { BirthdaySummary, CreateBirthdayDto } from '../models/birthday.model';

@Injectable({
  providedIn: 'root',
})
export class BirthdayService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/birthdays';

  private readonly _birthdays = signal<BirthdaySummary[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly birthdays = this._birthdays.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly thisMonthBirthdays = computed<BirthdaySummary[]>(() =>
    this._birthdays().filter((b) => b.daysUntilBirthday <= 30)
  );

  loadBirthdays(): Observable<BirthdaySummary[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<BirthdaySummary[]>(this.apiUrl).pipe(
      tap({
        next: (data) => this._birthdays.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar aniversariantes.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createBirthday(dto: CreateBirthdayDto): Observable<BirthdaySummary> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<BirthdaySummary>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._birthdays.update((list) => [...list, created]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar aniversariante.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

