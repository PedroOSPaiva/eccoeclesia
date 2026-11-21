import { Injectable, computed, signal } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { CreateConsumableDto, CreateDurableDto, InventoryItem } from '../models/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService extends BaseApiService<InventoryItem> {
  protected override get apiUrl(): string {
    return '/api/inventory';
  }

  // Alias para manter compatibilidade com componentes existentes
  private readonly _alerts = signal<InventoryItem[]>([]);
  readonly alerts = this._alerts.asReadonly();

  readonly totalItems = computed<number>(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly lowStockCount = computed<number>(() =>
    this._items().filter((i) => i.quantity <= i.minimumQuantity).length
  );

  loadItems(): Observable<InventoryItem[]> {
    return this.load();
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

  updateConsumable(id: string, dto: CreateConsumableDto): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<void>(`${this.apiUrl}/consumables/${id}`, dto).pipe(
      tap({
        next: () => this.loadItems().subscribe(),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao atualizar item consumível.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  updateDurable(id: string, dto: CreateDurableDto): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<void>(`${this.apiUrl}/durables/${id}`, dto).pipe(
      tap({
        next: () => this.loadItems().subscribe(),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao atualizar bem durável.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  recordMovement(id: string, type: string, action: 'entries' | 'exits', quantity: number): Observable<InventoryItem> {
    this._loading.set(true);
    this._error.set(null);

    const segment = type.toLowerCase().includes('durable') ? 'durables' : 'consumables';
    return this.http.post<InventoryItem>(`${this.apiUrl}/${segment}/${id}/${action}`, { quantity }).pipe(
      tap({
        next: () => {
          this.loadItems().subscribe();
          this.loadAlerts().subscribe();
        },
        error: (err) => this._error.set(err?.error?.error || `Erro ao registrar ${action === 'entries' ? 'entrada' : 'saída'} de estoque.`),
      }),
      finalize(() => this._loading.set(false))
    );
  }
}
