import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError, finalize } from 'rxjs';
import {
  CreateLedgerEntryDto,
  LedgerEntry,
  LedgerEntryType,
  LedgerFinancialSummary,
} from '../models/ledger.model';

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/ledger';

  // --- Estado Reativo Base (Signals Privados) ---
  private readonly _entries = signal<LedgerEntry[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _filterType = signal<LedgerEntryType | 'ALL'>('ALL');
  private readonly _dateRange = signal<{ start?: string; end?: string }>({});

  // --- Sinais Públicos Imutáveis (Read-only Signals) ---
  readonly entries = this._entries.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filterType = this._filterType.asReadonly();
  readonly dateRange = this._dateRange.asReadonly();

  // --- Sinais Computados Reativos (Computed State) ---

  /** Total consolidado de receitas (INCOME) */
  readonly totalIncome = computed<number>(() =>
    this._entries()
      .filter((entry) => entry.type === 'INCOME')
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  );

  /** Total consolidado de despesas (EXPENSE) */
  readonly totalExpense = computed<number>(() =>
    this._entries()
      .filter((entry) => entry.type === 'EXPENSE')
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0)
  );

  /** Saldo líquido do Razão (Receitas - Despesas) */
  readonly netBalance = computed<number>(() => this.totalIncome() - this.totalExpense());

  /** Quantidade total de lançamentos carregados */
  readonly totalCount = computed<number>(() => this._entries().length);

  /** Entradas filtradas de acordo com a seleção atual */
  readonly filteredEntries = computed<LedgerEntry[]>(() => {
    const selected = this._filterType();
    const list = this._entries();
    if (selected === 'ALL') {
      return list;
    }
    return list.filter((item) => item.type === selected);
  });

  /** Entradas mais recentes ordenadas por data decrescente (visão executiva) */
  readonly recentEntries = computed<LedgerEntry[]>(() => {
    return [...this.filteredEntries()]
      .sort((a, b) => new Date(b.occurredOn).getTime() - new Date(a.occurredOn).getTime())
      .slice(0, 8);
  });

  /** Resumo contábil estruturado */
  readonly summary = computed<LedgerFinancialSummary>(() => ({
    totalIncome: this.totalIncome(),
    totalExpense: this.totalExpense(),
    netBalance: this.netBalance(),
    entryCount: this.totalCount(),
  }));

  // --- Métodos de Negócio e Ações ---

  /**
   * Carrega os lançamentos do razão da API REST `/api/ledger`
   * com suporte a filtros opcionais de data inicial e final.
   */
  loadEntries(start?: string, end?: string): Observable<LedgerEntry[]> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    this._dateRange.set({ start, end });

    return this.http.get<LedgerEntry[]>(this.apiUrl, { params }).pipe(
      tap({
        next: (entries) => {
          this._entries.set(entries ?? []);
        },
        error: (err) => {
          const message = err?.error?.error || 'Erro ao carregar o razão contábil.';
          this._error.set(message);
        },
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }

  /**
   * Cria um novo lançamento contábil no razão via POST `/api/ledger`.
   * Atualiza imediatamente o estado reativo local se bem-sucedido.
   */
  createEntry(dto: CreateLedgerEntryDto): Observable<LedgerEntry> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<LedgerEntry>(this.apiUrl, dto).pipe(
      tap({
        next: (createdEntry) => {
          this._entries.update((current) => [createdEntry, ...current]);
        },
        error: (err) => {
          const message = err?.error?.error || 'Falha ao registrar lançamento no razão.';
          this._error.set(message);
        },
      }),
      finalize(() => {
        this._loading.set(false);
      })
    );
  }

  /**
   * Altera o filtro de tipo (INCOME, EXPENSE ou ALL)
   */
  setFilterType(type: LedgerEntryType | 'ALL'): void {
    this._filterType.set(type);
  }

  /**
   * Atualiza os dados com base no período atual configurado
   */
  refresh(): void {
    const range = this._dateRange();
    this.loadEntries(range.start, range.end).subscribe();
  }

  /**
   * Limpa o estado de erro
   */
  clearError(): void {
    this._error.set(null);
  }
}

