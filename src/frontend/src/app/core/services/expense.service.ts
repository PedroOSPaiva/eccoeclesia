import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { CreateExpenseDto, Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/expenses';

  private readonly _expenses = signal<Expense[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly expenses = this._expenses.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalAmount = computed<number>(() =>
    this._expenses().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  readonly count = computed<number>(() => this._expenses().length);

  loadExpenses(): Observable<Expense[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Expense[]>(this.apiUrl).pipe(
      tap({
        next: (data) => this._expenses.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao listar despesas.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createExpense(dto: CreateExpenseDto): Observable<Expense> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<Expense>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._expenses.update((list) => [created, ...list]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao registrar despesa.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  deleteExpense(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this._expenses.update((list) => list.filter((item) => item.id !== id)),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao remover despesa.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

