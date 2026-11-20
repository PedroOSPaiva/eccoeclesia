import { Injectable, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';
import {
  CreateLedgerEntryDto,
  LedgerEntry,
  LedgerEntryType,
  LedgerFinancialSummary,
} from '../models/ledger.model';

@Injectable({
  providedIn: 'root',
})
export class LedgerService extends BaseApiService<LedgerEntry, CreateLedgerEntryDto> {
  protected override get apiUrl(): string {
    return '/api/ledger';
  }

  // Alias para manter compatibilidade com componentes existentes
  readonly entries = this.items;

  private readonly _filterType = signal<LedgerEntryType | 'ALL'>('ALL');
  private readonly _dateRange = signal<{ start?: string; end?: string }>({});

  readonly filterType = this._filterType.asReadonly();
  readonly dateRange = this._dateRange.asReadonly();

  readonly totalIncome = computed<number>(() =>
    this._items()
      .filter((entry) => entry.type === 'INCOME')
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  );

  readonly totalExpense = computed<number>(() =>
    this._items()
      .filter((entry) => entry.type === 'EXPENSE')
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  );

  readonly netBalance = computed<number>(() => this.totalIncome() - this.totalExpense());

  readonly totalCount = computed<number>(() => this._items().length);

  readonly filteredEntries = computed<LedgerEntry[]>(() => {
    const selected = this._filterType();
    const list = this._items();
    if (selected === 'ALL') {
      return list;
    }
    return list.filter((item) => item.type === selected);
  });

  readonly recentEntries = computed<LedgerEntry[]>(() => {
    return [...this.filteredEntries()]
      .sort((a, b) => new Date(b.occurredOn).getTime() - new Date(a.occurredOn).getTime())
      .slice(0, 8);
  });

  readonly summary = computed<LedgerFinancialSummary>(() => ({
    totalIncome: this.totalIncome(),
    totalExpense: this.totalExpense(),
    netBalance: this.netBalance(),
    entryCount: this.totalCount(),
  }));

  loadEntries(start?: string, end?: string): Observable<LedgerEntry[]> {
    this._dateRange.set({ start, end });
    const params: Record<string, string> = {};
    if (start) params['start'] = start;
    if (end) params['end'] = end;
    return this.load(params);
  }

  createEntry(dto: CreateLedgerEntryDto): Observable<LedgerEntry> {
    return this.create(dto);
  }

  setFilterType(type: LedgerEntryType | 'ALL'): void {
    this._filterType.set(type);
  }

  refresh(): void {
    const range = this._dateRange();
    this.loadEntries(range.start, range.end).subscribe();
  }
}
