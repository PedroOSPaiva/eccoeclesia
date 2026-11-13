import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { CreateConsumableDto, CreateDurableDto, InventoryItem } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/inventory';

  private readonly _items = signal<InventoryItem[]>([]);
  private readonly _alerts = signal<InventoryItem[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly alerts = this._alerts.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalItems = computed<number>(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly lowStockCount = computed<number>(() =>
    this._items().filter((i) => i.quantity <= i.minimumQuantity).length
  );

  loadItems(): Observable<InventoryItem[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<InventoryItem[]>(this.apiUrl).pipe(
      tap({
        next: (data) => this._items.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar inventário.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  loadAlerts(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/alerts`).pipe(
      tap({
        next: (data) => this._alerts.set(data ?? []),
      })
    );
  }

  createConsumable(dto: CreateConsumableDto): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<void>(`${this.apiUrl}/consumables`, dto).pipe(
      tap({
        next: () => this.loadItems().subscribe(),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar item consumível.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createDurable(dto: CreateDurableDto): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<void>(`${this.apiUrl}/durables`, dto).pipe(
      tap({
        next: () => this.loadItems().subscribe(),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar bem durável.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

