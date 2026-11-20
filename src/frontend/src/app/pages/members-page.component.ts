import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../core/services/member.service';
import { CommunityService } from '../core/services/community.service';
import { CreateMemberDto, Member } from '../core/models/member.model';

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  template: `
    <div class="members-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Pastoral & Comunhão</span>
          <h1>Membros & Dizimistas</h1>
          <p class="subtitle">Cadastro pastoral, fidelidade ao dízimo e gestão de fiéis por comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="memberService.loading()">
            Atualizar
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Membro
          </button>
        </div>
      </header>

      @if (memberService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="memberService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Cadastro / Criação -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Cadastrar Novo Membro</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="memberForm" (ngSubmit)="submitMember()" class="member-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="name">Nome Completo *</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Francisco de Assis Silva" />
              </div>
              <div class="field">
                <label for="communityId">Comunidade Pertencente *</label>
                <select id="communityId" formControlName="communityId">
                  <option value="" disabled>Selecione a comunidade...</option>
                  @for (comm of communityService.communities(); track comm.id) {
                    <option [value]="comm.id">
                      {{ comm.name }} {{ comm.isMainParish ? '(Matriz)' : '' }}
                    </option>
                  }
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="birthDate">Data de Nascimento</label>
                <input id="birthDate" type="date" formControlName="birthDate" />
              </div>
              <div class="field">
                <label for="phone">Telefone / WhatsApp</label>
                <input id="phone" type="text" formControlName="phone" placeholder="(11) 98765-4321" />
              </div>
              <div class="field">
                <label for="email">E-mail</label>
                <input id="email" type="email" formControlName="email" placeholder="membro@email.com" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="ministry">Pastoral / Movimento / Ministério</label>
                <input id="ministry" type="text" formControlName="ministry" placeholder="Ex: Pastoral do Dízimo, Coral, Catequese, Liturgia" />
              </div>
              <div class="field">
                <label for="status">Situação Cadastral</label>
                <select id="status" formControlName="status">
                  <option value="ACTIVE">Ativo / Participante</option>
                  <option value="INACTIVE">Inativo / Transferido</option>
                </select>
              </div>
              <div class="field field-checkbox">
                <label class="checkbox-label" for="isSteward">
                  <input id="isSteward" type="checkbox" formControlName="isSteward" />
                  <span>⭐ É Dizimista Ativo</span>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="memberForm.invalid || memberService.loading()">
                Salvar Membro
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Faixa de Indicadores (KPIs) -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Total de Membros</span>
          <strong class="value text-primary">{{ memberService.totalCount() }}</strong>
          <span class="hint">{{ memberService.activeCount() }} ativo(s)</span>
        </div>
        <div class="kpi-card">
          <span class="label">Dizimistas Fiéis</span>
          <strong class="value text-success">{{ memberService.stewardsCount() }}</strong>
          <span class="hint">Contribuição regular</span>
        </div>
        <div class="kpi-card">
          <span class="label">Comunidade em Foco</span>
          <strong class="value text-focus">
            {{ communityService.activeCommunity()?.name || 'Visão Geral (Todas)' }}
          </strong>
          <span class="hint">{{ communityService.isAll() ? 'Consolidado da Paróquia' : 'Filtrado pela barra superior' }}</span>
        </div>
      </section>

      <!-- Tabela de Membros -->
      <section class="card table-card">
        @if (memberService.loading() && memberService.members().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando membros da comunidade...</p>
          </div>
        } @else if (memberService.members().length === 0) {
          <div class="empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#94a3b8" stroke-width="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p>Nenhum membro cadastrado nesta comunidade.</p>
            <button type="button" class="btn btn-primary" (click)="toggleForm()">Cadastrar Primeiro Membro</button>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome do Irmão(ã)</th>
                  <th>Comunidade</th>
                  <th>Dízimo</th>
                  <th>Pastoral / Serviço</th>
                  <th>Contato</th>
                  <th>Data Nasc.</th>
                  <th>Situação</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (m of memberService.members(); track m.id) {
                  <tr>
                    <td>
                      <div class="member-name">
                        <strong>{{ m.name }}</strong>
                      </div>
                    </td>
                    <td>
                      <span class="community-tag">{{ getCommunityName(m.communityId) }}</span>
                    </td>
                    <td>
                      @if (m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim'))) {
                        <span class="badge badge-steward">⭐ Dizimista</span>
                      } @else {
                        <span class="badge badge-default">Membro</span>
                      }
                    </td>
                    <td>{{ m.ministry || 'Comunidade' }}</td>
                    <td>
                      <div class="contact-info">
                        @if (m.phone) { <span>{{ m.phone }}</span> }
                        @if (m.email) { <small class="text-muted">{{ m.email }}</small> }
                        @if (!m.phone && !m.email) { <span class="text-muted">-</span> }
                      </div>
                    </td>
                    <td class="col-date">{{ m.birthDate ? (m.birthDate | date:'dd/MM/yyyy') : '-' }}</td>
                    <td>
                      @if (m.status === 'ACTIVE') {
                        <span class="badge badge-active">Ativo</span>
                      } @else {
                        <span class="badge badge-inactive">Inativo</span>
                      }
                    </td>
                    <td class="text-right">
                      <button
                        type="button"
                        class="btn-action-delete"
                        (click)="deleteMember(m.id, m.name)"
                        title="Remover cadastro"
                      >
                        Excluir
                      </button>
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
    .members-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { font-size: 1.75rem; color: #0f172a; margin: 0.2rem 0; font-weight: 700; }
    .subtitle { color: #64748b; font-size: 0.9rem; margin: 0; }
    .badge-tag { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.6rem; border-radius: 9999px; }
    .header-actions { display: flex; gap: 0.75rem; align-items: center; }

    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.15rem; color: #0f172a; font-weight: 600; }

    .member-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 160px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; outline: none; }
    .field input:focus, .field select:focus { border-color: #0284c7; box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15); }
    .field-checkbox { justify-content: flex-end; padding-bottom: 0.3rem; }
    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.875rem; font-weight: 600; color: #0f172a; }
    .checkbox-label input { width: 1.1rem; height: 1.1rem; cursor: pointer; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem; }

    .kpi-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .kpi-card .label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
    .kpi-card .value { font-size: 1.6rem; font-weight: 700; }
    .kpi-card .hint { font-size: 0.75rem; color: #94a3b8; }
    .text-primary { color: #0284c7; }
    .text-success { color: #16a34a; }
    .text-focus { color: #0f172a; font-size: 1.25rem !important; }

    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }
    .member-name strong { color: #0f172a; font-size: 0.9rem; }
    .community-tag { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }

    .contact-info { display: flex; flex-direction: column; line-height: 1.2; }

    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.2rem; }
    .badge-steward { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
    .badge-default { background: #f1f5f9; color: #475569; }
    .badge-active { background: #ecfdf5; color: #047857; }
    .badge-inactive { background: #fef2f2; color: #b91c1c; }

    .text-muted { color: #94a3b8; }
    .text-right { text-align: right; }

    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }
    .btn-primary { background: #0284c7; color: #fff; }
    .btn-primary:hover { background: #0369a1; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-secondary:hover { background: #f8fafc; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-action-delete { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; }
    .btn-action-delete:hover { text-decoration: underline; }
    .btn-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }

    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }

    .empty-state { text-align: center; color: #94a3b8; padding: 3rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
    .loading-state { text-align: center; padding: 3.5rem 1rem; color: #64748b; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class MembersPageComponent implements OnInit {
  protected readonly memberService = inject(MemberService);
  protected readonly communityService = inject(CommunityService);
  private readonly fb = inject(FormBuilder);

  protected readonly showForm = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly memberForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    communityId: ['', Validators.required],
    birthDate: [''],
    phone: [''],
    email: [''],
    ministry: [''],
    status: ['ACTIVE', Validators.required],
    isSteward: [false],
  });

  constructor() {
    // Reage automaticamente à mudança de comunidade ativa no header
    effect(() => {
      const activeId = this.communityService.activeCommunityId();
      this.memberService.loadMembers(activeId).subscribe();
    });
  }

  ngOnInit(): void {
    // Garante que a lista de comunidades esteja carregada para o formulário
    if (this.communityService.communities().length === 0) {
      this.communityService.loadCommunities().subscribe();
    }
  }

  refresh(): void {
    this.memberService.loadMembers(this.communityService.activeCommunityId()).subscribe();
  }

  toggleForm(): void {
    const nextState = !this.showForm();
    this.showForm.set(nextState);
    if (nextState) {
      const activeId = this.communityService.activeCommunityId();
      const defaultComm = (activeId && activeId !== 'ALL')
        ? activeId
        : (this.communityService.communities()[0]?.id || '');

      this.memberForm.patchValue({
        communityId: defaultComm,
        status: 'ACTIVE',
        isSteward: false,
      });
    }
  }

  submitMember(): void {
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    const val = this.memberForm.getRawValue();
    const dto: CreateMemberDto = {
      name: val.name!,
      communityId: val.communityId!,
      birthDate: val.birthDate || undefined,
      phone: val.phone || undefined,
      email: val.email || undefined,
      ministry: val.ministry || undefined,
      status: val.status || 'ACTIVE',
      isSteward: Boolean(val.isSteward),
    };

    this.memberService.createMember(dto).subscribe({
      next: () => {
        this.successMessage.set('Membro cadastrado com sucesso!');
        this.memberForm.reset({ status: 'ACTIVE', isSteward: false });
        this.showForm.set(false);
      },
    });
  }

  deleteMember(id: string, name: string): void {
    if (confirm(`Deseja realmente remover o cadastro de "${name}"?`)) {
      this.memberService.deleteMember(id).subscribe({
        next: () => this.successMessage.set(`Cadastro de "${name}" removido com sucesso.`),
      });
    }
  }

  getCommunityName(communityId: string): string {
    const comm = this.communityService.communities().find((c) => c.id === communityId);
    return comm ? comm.name : 'Matriz Paroquial';
  }
}
