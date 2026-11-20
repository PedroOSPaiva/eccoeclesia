import { Injectable, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { CreateExpenseDto, Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends BaseApiService<Expense, CreateExpenseDto> {
  protected override get apiUrl(): string {
    return '/api/expenses';
  }

  // Alias para manter compatibilidade com componentes existentes
  readonly expenses = this.items;

  readonly totalAmount = computed<number>(() =>
    this._items().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  readonly count = computed<number>(() => this._items().length);

  loadExpenses(): Observable<Expense[]> {
    return this.load();
  }

  createExpense(dto: CreateExpenseDto): Observable<Expense> {
    return this.create(dto);
  }

  deleteExpense(id: string): Observable<void> {
    return this.delete(id);
  }
}
