import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevenueService } from '../core/services/revenue.service';
import { CreateRevenueDto } from '../core/models/revenue.model';

@Component({
  selector: 'app-revenues-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe],
  template: `
    <div class="revenues-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Entradas & Dízimos</span>
          <h1>Controle de Receitas</h1>
          <p class="subtitle">Gestão de dízimos, ofertas, campanhas e doações da comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="revenueService.loading()">
            Atualizar
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleNewRevenueForm()">
            + Registrar Receita
          </button>
        </div>
      </header>

      @if (revenueService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="revenueService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Nova Receita -->
      @if (showNewForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Nova Receita</h3>
            <button class="btn-close" (click)="toggleNewRevenueForm()">&times;</button>
          </div>
          <form [formGroup]="revenueForm" (ngSubmit)="submitRevenue()" class="revenue-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="description">Descrição</label>
                <input id="description" type="text" formControlName="description" placeholder="Ex: Dízimo ofertado na missa dominical" />
              </div>
              <div class="field">
                <label for="amount">Valor (R$)</label>
                <input id="amount" type="number" step="0.01" formControlName="amount" placeholder="0.00" />
              </div>
              <div class="field">
                <label for="category">Categoria</label>
                <select id="category" formControlName="category">
                  <option value="Dízimo">Dízimo</option>
                  <option value="Oferta">Oferta</option>
                  <option value="Doação">Doação</option>
                  <option value="Evento">Evento / Quermesse</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleNewRevenueForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="revenueForm.invalid || revenueService.loading()">
                Confirmar Receita
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Card de Resumo -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Total de Receitas Arrecadadas</span>
          <strong class="value text-income">{{ revenueService.totalAmount() | currency:'BRL':'symbol':'1.2-2' }}</strong>
          <span class="hint">{{ revenueService.count() }} entrada(s) ativa(s)</span>
        </div>
      </section>

      <!-- Tabela de Receitas -->
      <section class="card table-card">
        @if (revenueService.loading() && revenueService.revenues().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando receitas...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Data Registro</th>
                  <th class="text-right">Valor</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (item of revenueService.revenues(); track item.id) {
                  <tr>
                    <td><strong>{{ item.description }}</strong></td>
                    <td>
                      <span class="badge">{{ item.category || 'Geral' }}</span>
                    </td>
                    <td class="col-date">{{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="text-right col-amount text-income">
                      + {{ item.amount | currency:'BRL':'symbol':'1.2-2' }}
                    </td>
                    <td class="text-right">
                      <button type="button" class="btn-action-delete" (click)="deleteItem(item.id)" title="Remover receita">
                        Excluir
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="empty-state">
                      <p>Nenhuma receita registrada até o momento.</p>
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
    .revenues-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #ecfdf5; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .revenue-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .kpi-strip { display: flex; }
    .kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-left: 4px solid #10b981; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; min-width: 250px; }
    .kpi-card .label { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }
    .kpi-card .value { font-size: 1.5rem; font-weight: 700; }
    .kpi-card .hint { font-size: 0.75rem; color: #94a3b8; }
    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }
    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #ecfdf5; color: #065f46; }
    .text-income { color: #059669; }
    .text-right { text-align: right; }
    .col-amount { font-weight: 600; font-variant-numeric: tabular-nums; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary { background: #059669; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-action-delete { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.4rem; }
    .btn-action-delete:hover { text-decoration: underline; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }
    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class RevenuesPageComponent implements OnInit {
  protected readonly revenueService = inject(RevenueService);
  private readonly fb = inject(FormBuilder);

  protected readonly showNewForm = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly revenueForm = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    category: ['Dízimo'],
  });

  ngOnInit(): void {
    this.revenueService.loadRevenues().subscribe();
  }

  refresh(): void {
    this.revenueService.loadRevenues().subscribe();
  }

  toggleNewRevenueForm(): void {
    this.showNewForm.update((v) => !v);
  }

  submitRevenue(): void {
    if (this.revenueForm.invalid) {
      this.revenueForm.markAllAsTouched();
      return;
    }

    const val = this.revenueForm.getRawValue();
    const dto: CreateRevenueDto = {
      description: val.description!,
      amount: Number(val.amount),
      category: val.category || undefined,
    };

    this.revenueService.createRevenue(dto).subscribe({
      next: () => {
        this.successMessage.set('Receita registrada com sucesso!');
        this.revenueForm.reset({ category: 'Dízimo' });
        this.showNewForm.set(false);
      },
    });
  }

  deleteItem(id: string): void {
    if (confirm('Deseja realmente remover esta receita?')) {
      this.revenueService.deleteRevenue(id).subscribe({
        next: () => this.successMessage.set('Receita removida com sucesso!'),
      });
    }
  }
}
