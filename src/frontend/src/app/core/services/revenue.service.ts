import { Injectable, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import { CreateRevenueDto, Revenue } from '../models/revenue.model';

@Injectable({
  providedIn: 'root',
})
export class RevenueService extends BaseApiService<Revenue, CreateRevenueDto> {
  protected override get apiUrl(): string {
    return '/api/revenues';
  }

  // Alias para manter compatibilidade com componentes existentes
  readonly revenues = this.items;

  readonly totalAmount = computed<number>(() =>
    this._items().reduce((sum, item) => sum + Number(item.amount || 0), 0)
  );

  readonly count = computed<number>(() => this._items().length);

  loadRevenues(start?: string, end?: string): Observable<Revenue[]> {
    const params: Record<string, string> = {};
    if (start) params['start'] = start;
    if (end) params['end'] = end;
    return this.load(params);
  }

  createRevenue(dto: CreateRevenueDto): Observable<Revenue> {
    return this.create(dto);
  }

  deleteRevenue(id: string): Observable<void> {
    return this.delete(id);
  }
}
