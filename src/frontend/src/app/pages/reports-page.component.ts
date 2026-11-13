import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../core/services/report.service';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="reports-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Módulo Financeiro & Fiscal</span>
          <h1>Relatórios do Razão Contábil</h1>
          <p class="subtitle">Emissão de balancetes, extratos analíticos e exportação em PDF e CSV.</p>
        </div>
      </header>

      @if (reportService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button (click)="reportService.clearError()" class="btn-close">&times;</button>
        </div>
      }

      <!-- Painel de Filtros e Exportação -->
      <section class="card filter-card">
        <form [formGroup]="filterForm" (ngSubmit)="generatePreview()" class="filter-form">
          <div class="field">
            <label for="startDate">Data Inicial</label>
            <input id="startDate" type="date" formControlName="start" />
          </div>

          <div class="field">
            <label for="endDate">Data Final</label>
            <input id="endDate" type="date" formControlName="end" />
          </div>

          <div class="actions">
            <button type="submit" class="btn btn-primary" [disabled]="reportService.loading()">
              @if (reportService.loading()) {
                <span class="spinner"></span> Gerando...
              } @else {
                Visualizar Prévia
              }
            </button>

            <button type="button" class="btn btn-pdf" (click)="downloadPdf()" [disabled]="reportService.loading()">
              Baixar PDF
            </button>

            <button type="button" class="btn btn-csv" (click)="downloadCsv()" [disabled]="reportService.loading()">
              Exportar CSV
            </button>
          </div>
        </form>
      </section>

      <!-- Prévia do Relatório -->
      <section class="card preview-card">
        <div class="preview-header">
          <h3>Espelho Analítico do Balancete</h3>
          <span class="text-hint">Fonte de dados: Backend Java 21 REST API (/api/reports/ledger)</span>
        </div>

        @if (reportService.loading()) {
          <div class="loading-box">
            <div class="spinner-large"></div>
            <p>Processando livro razão e consolidando lançamentos contábeis...</p>
          </div>
        } @else {
          @if (reportService.preview(); as previewText) {
            <pre class="report-terminal">{{ previewText }}</pre>
          } @else {
            <div class="empty-state">
              <p>Selecione um intervalo de datas e clique em <strong>Visualizar Prévia</strong> ou baixe diretamente em PDF/CSV.</p>
            </div>
          }
        }
      </section>
    </div>
  `,
  styles: [`
    .reports-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header h1 { margin: 0.25rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .filter-card { box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .filter-form { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .actions { display: flex; gap: 0.6rem; align-items: center; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-primary { background: #1d4ed8; color: #fff; }
    .btn-pdf { background: #dc2626; color: #fff; }
    .btn-csv { background: #059669; color: #fff; }
    .preview-card { min-height: 300px; }
    .preview-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }
    .preview-header h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .text-hint { font-size: 0.75rem; color: #94a3b8; }
    .report-terminal { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.5; white-space: pre-wrap; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #991b1b; }
    .empty-state { text-align: center; color: #94a3b8; padding: 3rem 1rem; }
    .loading-box { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class ReportsPageComponent implements OnInit {
  protected readonly reportService = inject(ReportService);
  private readonly fb = inject(FormBuilder);

  // Inicializa o período no primeiro dia do mês corrente até a data de hoje
  private readonly now = new Date();
  private readonly firstDayOfMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1).toISOString().substring(0, 10);
  private readonly today = this.now.toISOString().substring(0, 10);

  protected readonly filterForm = this.fb.group({
    start: [this.firstDayOfMonth, Validators.required],
    end: [this.today, Validators.required],
  });

  ngOnInit(): void {
    this.generatePreview();
  }

  generatePreview(): void {
    const { start, end } = this.filterForm.getRawValue();
    this.reportService.fetchLedgerReportPreview(start || undefined, end || undefined).subscribe();
  }

  downloadPdf(): void {
    const { start, end } = this.filterForm.getRawValue();
    this.reportService.downloadLedgerPdf(start || undefined, end || undefined);
  }

  downloadCsv(): void {
    const { start, end } = this.filterForm.getRawValue();
    this.reportService.downloadLedgerCsv(start || undefined, end || undefined);
  }
}
