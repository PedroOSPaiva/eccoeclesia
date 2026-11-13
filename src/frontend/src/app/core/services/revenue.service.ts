import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { CreateRevenueDto, Revenue } from '../models/revenue.model';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/revenues';

  private readonly _revenues = signal<Revenue[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly revenues = this._revenues.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalAmount = computed<number>(() =>
    this._revenues().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  readonly count = computed<number>(() => this._revenues().length);

  loadRevenues(start?: string, end?: string): Observable<Revenue[]> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    return this.http.get<Revenue[]>(this.apiUrl, { params }).pipe(
      tap({
        next: (data) => this._revenues.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao listar receitas.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createRevenue(dto: CreateRevenueDto): Observable<Revenue> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<Revenue>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._revenues.update((list) => [created, ...list]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao registrar receita.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  deleteRevenue(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this._revenues.update((list) => list.filter((item) => item.id !== id)),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao remover receita.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

