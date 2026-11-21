import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../core/services/report.service';
import { AuthService } from '../core/services/auth.service';
import { CommunityService } from '../core/services/community.service';
import { ParishLeader, ParishLeadershipService } from '../core/services/parish-leadership.service';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DomBosquinhoStateComponent],
  template: `
    <div class="reports-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Módulo Financeiro & Fiscal</span>
          <h1>Relatórios do Razão Contábil</h1>
          <p class="subtitle">Emissão de balancetes, extratos analíticos e exportação oficial em PDF e CSV.</p>
        </div>
      </header>

      <!-- Feedback de Erro com Dom Bosquinho -->
      @if (reportService.error(); as err) {
        <app-dom-bosquinho-state
          mode="error"
          title="Ops! Dom Bosquinho avisa que houve um contratempo"
          [message]="err"
          [showDismiss]="true"
          (retry)="generatePreview()"
          (dismiss)="reportService.clearError()">
        </app-dom-bosquinho-state>
      }

      <!-- Painel de Gerenciamento de Liderança Paroquial (Apenas para ADMIN) -->
      @if (isAdmin()) {
        <section class="card leadership-card">
          <div class="card-title-bar">
            <div>
              <span class="badge-admin">Administração Paroquial</span>
              <h3>Responsáveis Paroquiais (Pároco, Vigários e Tesoureiros)</h3>
              <p class="subtitle">Edite os nomes oficiais que constam no cabeçalho e assinaturas do relatório em PDF.</p>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" (click)="loadLeaders()">
              Atualizar Nomes
            </button>
          </div>

          @if (leadershipSuccess()) {
            <div class="alert alert-success">
              <span>{{ leadershipSuccess() }}</span>
              <button class="btn-close" (click)="leadershipSuccess.set(null)">&times;</button>
            </div>
          }
          @if (leadershipService.error(); as lErr) {
            <div class="alert alert-error">
              <span>{{ lErr }}</span>
            </div>
          }

          @if (leadershipService.loading() && leadersList().length === 0) {
            <div class="loading-state">
              <div class="spinner-large"></div>
              <p>Carregando responsáveis paroquiais...</p>
            </div>
          } @else {
            <div class="leaders-list">
              @for (leader of leadersList(); track leader.id; let idx = $index) {
                <div class="leader-row">
                  <div class="field flex-1">
                    <label>Cargo / Função</label>
                    <input type="text" [value]="leader.role" (input)="updateLeaderField(idx, 'role', $event)" placeholder="Ex: Pároco, Tesoureiro" />
                  </div>
                  <div class="field flex-2">
                    <label>Nome Oficial do Responsável</label>
                    <input type="text" [value]="leader.name" (input)="updateLeaderField(idx, 'name', $event)" placeholder="Ex: Pe. João Silva, Maria Silva" />
                  </div>
                  <div class="leader-actions">
                    <button type="button" class="btn btn-primary btn-sm" (click)="saveLeaderItem(leader)" [disabled]="leadershipService.loading()">
                      Salvar Alteração
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </section>
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

          <div class="field">
            <label>Âmbito / Comunidade</label>
            <div class="scope-display">
              <span class="badge-scope">
                {{ communityService.activeCommunity()?.name || 'Todas as Comunidades (Consolidado)' }}
              </span>
            </div>
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
              Baixar PDF Oficial
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
    .badge-admin { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.15rem 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 0.25rem; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .card-title-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.15rem; color: #0f172a; }
    .leadership-card { border-left: 4px solid #7c3aed; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .leaders-list { display: flex; flex-direction: column; gap: 0.85rem; }
    .leader-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; background: #faf5ff; padding: 0.85rem; border-radius: 8px; border: 1px solid #f3e8ff; }
    .leader-actions { display: flex; align-items: flex-end; }
    .filter-card { box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .filter-form { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; }
    .flex-1 { flex: 1; min-width: 150px; }
    .flex-2 { flex: 2; min-width: 250px; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }
    .scope-display { display: flex; align-items: center; height: 38px; }
    .badge-scope { font-size: 0.85rem; font-weight: 600; color: #1e40af; background: #dbeafe; padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid #bfdbfe; }
    .actions { display: flex; gap: 0.6rem; align-items: center; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-primary { background: #1d4ed8; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-sm { padding: 0.45rem 0.8rem; font-size: 0.8rem; }
    .btn-pdf { background: #dc2626; color: #fff; }
    .btn-csv { background: #059669; color: #fff; }
    .preview-card { min-height: 300px; }
    .preview-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }
    .preview-header h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .text-hint { font-size: 0.75rem; color: #94a3b8; }
    .report-terminal { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.5; white-space: pre-wrap; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: inherit; }
    .empty-state { text-align: center; color: #94a3b8; padding: 3rem 1rem; }
    .loading-box, .loading-state { text-align: center; padding: 2.5rem 1rem; color: #64748b; }
    .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class ReportsPageComponent implements OnInit {
  protected readonly reportService = inject(ReportService);
  protected readonly authService = inject(AuthService);
  protected readonly communityService = inject(CommunityService);
  protected readonly leadershipService = inject(ParishLeadershipService);
  private readonly fb = inject(FormBuilder);

  protected readonly isAdmin = computed(() => this.authService.role() === 'ADMIN');
  protected readonly leadersList = signal<ParishLeader[]>([]);
  protected readonly leadershipSuccess = signal<string | null>(null);

  // Inicializa o período no primeiro dia do mês corrente até a data de hoje
  private readonly now = new Date();
  private readonly firstDayOfMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1).toISOString().substring(0, 10);
  private readonly today = this.now.toISOString().substring(0, 10);

  protected readonly filterForm = this.fb.group({
    start: [this.firstDayOfMonth, Validators.required],
    end: [this.today, Validators.required],
  });

  constructor() {
    effect(() => {
      // Reage automaticamente quando a comunidade ativa muda no seletor global do header
      const commId = this.communityService.activeCommunityId();
      this.generatePreview();
    });
  }

  ngOnInit(): void {
    this.generatePreview();
    if (this.isAdmin()) {
      this.loadLeaders();
    }
  }

  loadLeaders(): void {
    this.leadershipService.loadLeaders().subscribe({
      next: (res) => this.leadersList.set(res),
    });
  }

  updateLeaderField(index: number, field: 'name' | 'role', event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.leadersList.update((list) => {
      const copy = [...list];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  }

  saveLeaderItem(leader: ParishLeader): void {
    this.leadershipService.saveLeader(leader).subscribe({
      next: () => {
        this.leadershipSuccess.set(`Responsável "${leader.name}" atualizado com sucesso!`);
      },
    });
  }

  generatePreview(): void {
    const { start, end } = this.filterForm.getRawValue();
    const commId = this.communityService.activeCommunityId();
    this.reportService.fetchLedgerReportPreview(start || undefined, end || undefined, commId).subscribe();
  }

  downloadPdf(): void {
    const { start, end } = this.filterForm.getRawValue();
    const commId = this.communityService.activeCommunityId();
    this.reportService.downloadLedgerPdf(start || undefined, end || undefined, commId);
  }

  downloadCsv(): void {
    const { start, end } = this.filterForm.getRawValue();
    const commId = this.communityService.activeCommunityId();
    this.reportService.downloadLedgerCsv(start || undefined, end || undefined, commId);
  }
}
