import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LedgerService } from '../core/services/ledger.service';
import { CreateLedgerEntryDto, LedgerEntryType } from '../core/models/ledger.model';
import { ReportService } from '../core/services/report.service';

@Component({
  selector: 'app-ledger-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe, DatePipe],
  template: `
    <div class="ledger-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Contabilidade & Governança</span>
          <h1>Livro Razão Contábil</h1>
          <p class="subtitle">Auditoria, conciliação e escrituração das movimentações da comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="onRefresh()" [disabled]="ledger.loading()">
            @if (ledger.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Atualizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleNewEntryForm()">
            + Novo Lançamento
          </button>
        </div>
      </header>

      <!-- Feedback de Erro ou Sucesso -->
      @if (ledger.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="ledger.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Novo Lançamento (Colapsável) -->
      @if (showNewEntry()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Novo Registro no Razão</h3>
            <button class="btn-close" (click)="toggleNewEntryForm()">&times;</button>
          </div>
          <form [formGroup]="entryForm" (ngSubmit)="submitEntry()" class="entry-form">
            <div class="form-row">
              <div class="field">
                <label for="type">Natureza</label>
                <select id="type" formControlName="type">
                  <option value="INCOME">Receita (Crédito / Entrada)</option>
                  <option value="EXPENSE">Despesa (Débito / Saída)</option>
                </select>
              </div>
              <div class="field">
                <label for="accountCode">Conta Contábil</label>
                <input id="accountCode" type="text" formControlName="accountCode" placeholder="Ex: 1.1.01" />
              </div>
              <div class="field">
                <label for="amount">Valor (R$)</label>
                <input id="amount" type="number" step="0.01" formControlName="amount" placeholder="0.00" />
              </div>
              <div class="field">
                <label for="occurredOn">Data</label>
                <input id="occurredOn" type="date" formControlName="occurredOn" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="description">Histórico / Descrição</label>
                <input id="description" type="text" formControlName="description" placeholder="Ex: Doação de campanha comunitária" />
              </div>
              <div class="field">
                <label for="costCenter">Centro de Custo</label>
                <input id="costCenter" type="text" formControlName="costCenter" placeholder="Ex: Pastoral Familiar" />
              </div>
              <div class="field">
                <label for="referenceCode">Cód. Referência</label>
                <input id="referenceCode" type="text" formControlName="referenceCode" placeholder="REF-001" />
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleNewEntryForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="entryForm.invalid || ledger.loading()">
                Efetivar Lançamento
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Painel de Filtros e Busca -->
      <section class="card filter-bar">
        <div class="filter-group">
          <label>Filtro por Natureza</label>
          <div class="pills">
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'ALL'"
              (click)="onFilterType('ALL')">
              Todos ({{ ledger.totalCount() }})
            </button>
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'INCOME'"
              (click)="onFilterType('INCOME')">
              Receitas
            </button>
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'EXPENSE'"
              (click)="onFilterType('EXPENSE')">
              Despesas
            </button>
          </div>
        </div>

        <div class="filter-group flex-1">
          <label for="searchTerm">Busca Rápida</label>
          <input
            id="searchTerm"
            type="search"
            [value]="searchTerm()"
            (input)="onSearchInput($event)"
            placeholder="Filtrar por descrição, conta ou centro de custo..."
          />
        </div>

        <div class="filter-actions">
          <button type="button" class="btn btn-secondary btn-sm" (click)="exportPdf()">PDF</button>
          <button type="button" class="btn btn-secondary btn-sm" (click)="exportCsv()">CSV</button>
        </div>
      </section>

      <!-- Totais Rápidos do Período -->
      <section class="summary-strip">
        <div class="summary-item">
          <span>Receitas</span>
          <strong class="text-income">{{ ledger.totalIncome() | currency:'BRL':'symbol':'1.2-2' }}</strong>
        </div>
        <div class="summary-item">
          <span>Despesas</span>
          <strong class="text-expense">{{ ledger.totalExpense() | currency:'BRL':'symbol':'1.2-2' }}</strong>
        </div>
        <div class="summary-item">
          <span>Saldo Líquido</span>
          <strong [class.text-income]="ledger.netBalance() >= 0" [class.text-expense]="ledger.netBalance() < 0">
            {{ ledger.netBalance() | currency:'BRL':'symbol':'1.2-2' }}
          </strong>
        </div>
      </section>

      <!-- Tabela Analítica -->
      <section class="card table-card">
        @if (ledger.loading() && ledger.entries().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando livro razão...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Conta</th>
                  <th>Referência</th>
                  <th>Centro de Custo</th>
                  <th>Histórico Contábil</th>
                  <th>Natureza</th>
                  <th class="text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                @for (entry of searchedEntries(); track entry.id) {
                  <tr>
                    <td class="col-date">{{ entry.occurredOn | date:'dd/MM/yyyy' }}</td>
                    <td><code>{{ entry.accountCode }}</code></td>
                    <td class="text-muted">{{ entry.referenceCode }}</td>
                    <td>{{ entry.costCenter }}</td>
                    <td><strong>{{ entry.description }}</strong></td>
                    <td>
                      @if (entry.type === 'INCOME') {
                        <span class="badge badge-income">Receita</span>
                      } @else {
                        <span class="badge badge-expense">Despesa</span>
                      }
                    </td>
                    <td class="text-right col-amount" [class.text-income]="entry.type === 'INCOME'" [class.text-expense]="entry.type === 'EXPENSE'">
                      @if (entry.type === 'INCOME') { + } @else { - }
                      {{ entry.amount | currency:'BRL':'symbol':'1.2-2' }}
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="empty-state">
                      <p>Nenhum lançamento contábil encontrado para o filtro aplicado.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `,
  styles: [`
    .ledger-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .entry-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .filter-bar { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: flex-end; }
    .filter-group { display: flex; flex-direction: column; gap: 0.35rem; }
    .filter-group label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .filter-group input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .pills { display: flex; gap: 0.3rem; background: #f1f5f9; padding: 0.2rem; border-radius: 6px; }
    .pill { background: transparent; border: none; font-size: 0.8rem; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer; color: #64748b; }
    .pill.active { background: #fff; color: #1d4ed8; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .filter-actions { display: flex; gap: 0.5rem; }
    .summary-strip { display: flex; gap: 1rem; flex-wrap: wrap; }
    .summary-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1.25rem; display: flex; flex-direction: column; gap: 0.2rem; flex: 1; min-width: 160px; }
    .summary-item span { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }
    .summary-item strong { font-size: 1.25rem; }
    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }
    .col-date { white-space: nowrap; color: #64748b; }
    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }
    .badge-income { background: #dcfce7; color: #15803d; }
    .badge-expense { background: #fee2e2; color: #b91c1c; }
    .text-income { color: #059669; }
    .text-expense { color: #dc2626; }
    .text-right { text-align: right; }
    .col-amount { font-weight: 600; font-variant-numeric: tabular-nums; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary { background: #1d4ed8; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-sm { padding: 0.4rem 0.75rem; font-size: 0.8rem; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }
    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LedgerPageComponent implements OnInit {
  protected readonly ledger = inject(LedgerService);
  private readonly report = inject(ReportService);
  private readonly fb = inject(FormBuilder);

  readonly start = input<string>();
  readonly end = input<string>();

  protected readonly showNewEntry = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);
  protected readonly searchTerm = signal<string>('');

  // Sinais computados para busca textual em memória sobre os registros filtrados
  protected readonly searchedEntries = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const list = this.ledger.filteredEntries();
    if (!term) return list;
    return list.filter((e) =>
      e.description.toLowerCase().includes(term) ||
      e.accountCode.toLowerCase().includes(term) ||
      e.costCenter.toLowerCase().includes(term) ||
      e.referenceCode.toLowerCase().includes(term)
    );
  });

  protected readonly entryForm = this.fb.group({
    type: ['INCOME' as LedgerEntryType, Validators.required],
    accountCode: ['1.1.01', Validators.required],
    referenceCode: ['REF-' + Math.floor(1000 + Math.random() * 9000), Validators.required],
    costCenter: ['Geral', Validators.required],
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    occurredOn: [new Date().toISOString().substring(0, 10), Validators.required],
  });

  ngOnInit(): void {
    this.ledger.loadEntries(this.start(), this.end()).subscribe();
  }

  onRefresh(): void {
    this.ledger.refresh();
  }

  onFilterType(type: LedgerEntryType | 'ALL'): void {
    this.ledger.setFilterType(type);
  }

  onSearchInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.searchTerm.set(val);
  }

  toggleNewEntryForm(): void {
    this.showNewEntry.update((v) => !v);
  }

  submitEntry(): void {
    if (this.entryForm.invalid) {
      this.entryForm.markAllAsTouched();
      return;
    }

    const val = this.entryForm.getRawValue();
    const dto: CreateLedgerEntryDto = {
      type: val.type!,
      accountCode: val.accountCode!,
      referenceCode: val.referenceCode!,
      costCenter: val.costCenter!,
      description: val.description!,
      amount: Number(val.amount),
      occurredOn: val.occurredOn!,
    };

    this.ledger.createEntry(dto).subscribe({
      next: () => {
        this.successMessage.set('Lançamento contábil registrado no razão com sucesso!');
        this.entryForm.patchValue({
          description: '',
          amount: '',
          referenceCode: 'REF-' + Math.floor(1000 + Math.random() * 9000),
        });
        this.showNewEntry.set(false);
      },
    });
  }

  exportPdf(): void {
    this.report.downloadLedgerPdf(this.start(), this.end());
  }

  exportCsv(): void {
    this.report.downloadLedgerCsv(this.start(), this.end());
  }
}
