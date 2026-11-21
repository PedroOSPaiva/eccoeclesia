import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../core/services/member.service';
import { CommunityService } from '../core/services/community.service';
import { CreateMemberDto, Member } from '../core/models/member.model';

@Component({
  selector: 'app-members-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe],
  template: `
    <div class="members-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Pastoral & Comunhão</span>
          <h1>Membros & Dizimistas</h1>
          <p class="subtitle">Cadastro pastoral, fidelidade ao dízimo e gestão de fiéis por comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-outline-print" (click)="generateStewardSheet()" title="Gerar folha de dízimo para impressão/PDF">
            📄 Gerar Folha de Dizimistas
          </button>
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

      <!-- Formulário de Cadastro / Edição -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>{{ editingMemberId() ? 'Editar Membro: ' + memberForm.get('name')?.value : 'Cadastrar Novo Membro' }}</h3>
            <button class="btn-close" (click)="cancelForm()">&times;</button>
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
                  <option value="INACTIVE">Inativo</option>
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
              <button type="button" class="btn btn-secondary" (click)="cancelForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="memberForm.invalid || memberService.loading()">
                {{ editingMemberId() ? 'Atualizar Membro' : 'Salvar Membro' }}
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Modal de Inativação de Membro -->
      @if (inactivatingMember(); as target) {
        <div class="modal-backdrop" (click)="closeInactivateModal()">
          <div class="modal-card" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>Inativar Membro Pastoral</h3>
              <button class="btn-close" (click)="closeInactivateModal()">&times;</button>
            </div>
            <div class="modal-body">
              <p>Você está prestes a inativar o cadastro de <strong>{{ target.name }}</strong>.</p>
              <div class="field">
                <label for="inactiveReason">Motivo da Inativação *</label>
                <select id="inactiveReason" [(ngModel)]="selectedReason" (change)="onReasonSelectChange()">
                  <option value="Mudança de Paróquia">Mudança de Paróquia</option>
                  <option value="Pedido do Membro">Pedido do Membro</option>
                  <option value="Falecimento">Falecimento</option>
                  <option value="Afastamento Pastoral">Afastamento Pastoral</option>
                  <option value="Outro">Outro motivo especificado...</option>
                </select>
              </div>
              @if (selectedReason === 'Outro') {
                <div class="field" style="margin-top: 0.75rem;">
                  <label for="customReason">Descreva o motivo:</label>
                  <input id="customReason" type="text" [(ngModel)]="customReason" placeholder="Descreva brevemente o motivo..." />
                </div>
              }
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeInactivateModal()">Cancelar</button>
              <button type="button" class="btn btn-danger" (click)="confirmInactivation(target)" [disabled]="memberService.loading()">
                Confirmar Inativação
              </button>
            </div>
          </div>
        </div>
      }

      <!-- Faixa de Indicadores (KPIs) -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Total de Membros</span>
          <strong class="value text-primary">{{ memberService.totalCount() }}</strong>
          <span class="hint">{{ memberService.activeCount() }} ativo(s) • {{ memberService.inactiveCount() }} inativo(s)</span>
        </div>
        <div class="kpi-card">
          <span class="label">Dizimistas Fiéis</span>
          <strong class="value text-success">{{ memberService.stewardsCount() }}</strong>
          <span class="hint">Contribuição regular (destacados no topo)</span>
        </div>
        <div class="kpi-card">
          <span class="label">Comunidade em Foco</span>
          <strong class="value text-focus">
            {{ communityService.activeCommunity()?.name || 'Visão Geral (Todas)' }}
          </strong>
          <span class="hint">{{ communityService.isAll() ? 'Consolidado da Paróquia' : 'Filtrado pela barra superior' }}</span>
        </div>
      </section>

      <!-- Tabela de Membros Ordenada (Dizimistas Primeiro) -->
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
                  <th>Status Dízimo</th>
                  <th>Pastoral / Serviço</th>
                  <th>Contato</th>
                  <th>Data Nasc.</th>
                  <th>Situação</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (m of sortedMembers(); track m.id) {
                  <tr
                    [class.row-steward]="isActive(m) && (m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim')))"
                    [class.row-inactive]="!isActive(m)">
                    <td>
                      <div class="member-name">
                        <strong [class.text-muted]="!isActive(m)">{{ m.name }}</strong>
                        @if (!isActive(m) && m.inactiveReason) {
                          <span class="reason-tag">Motivo: {{ m.inactiveReason }}</span>
                        }
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
                      @if (isActive(m)) {
                        <span class="badge badge-active">● Ativo</span>
                      } @else {
                        <span class="badge badge-inactive" [title]="m.inactiveReason ? 'Motivo: ' + m.inactiveReason : 'Inativo'">● Inativo</span>
                      }
                    </td>
                    <td class="text-right">
                      <div class="actions-cell">
                        <button
                          type="button"
                          class="btn-action btn-action-edit"
                          (click)="startEdit(m)"
                          title="Editar dados do membro"
                        >
                          ✏️ Editar
                        </button>

                        @if (isActive(m)) {
                          <button
                            type="button"
                            class="btn-action btn-action-inactivate"
                            (click)="openInactivateModal(m)"
                            title="Inativar membro"
                          >
                            Inativar
                          </button>
                        } @else {
                          <button
                            type="button"
                            class="btn-action btn-action-reactivate"
                            (click)="reactivateMember(m)"
                            title="Reativar membro"
                          >
                            Reativar
                          </button>
                        }
                      </div>
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
    .header-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }

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
    .row-steward { background-color: #fafffd; }
    .row-inactive { background-color: #fcfcfd; opacity: 0.8; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }
    .member-name { display: flex; flex-direction: column; gap: 0.2rem; }
    .member-name strong { color: #0f172a; font-size: 0.9rem; }
    .reason-tag { font-size: 0.72rem; color: #b91c1c; font-style: italic; }
    .community-tag { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }

    .contact-info { display: flex; flex-direction: column; line-height: 1.2; }

    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; gap: 0.2rem; }
    .badge-steward { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; font-weight: 700; }
    .badge-default { background: #f1f5f9; color: #475569; }
    .badge-active { background: #ecfdf5; color: #047857; font-weight: 600; border: 1px solid #a7f3d0; }
    .badge-inactive { background: #fee2e2; color: #b91c1c; font-weight: 600; border: 1px solid #fecaca; }

    .text-muted { color: #94a3b8; }
    .text-right { text-align: right; }

    .actions-cell { display: inline-flex; gap: 0.5rem; justify-content: flex-end; align-items: center; }
    .btn-action { background: none; border: none; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; transition: background 0.15s ease; }
    .btn-action-edit { color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; }
    .btn-action-edit:hover { background: #e0f2fe; }
    .btn-action-inactivate { color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; }
    .btn-action-inactivate:hover { background: #fee2e2; }
    .btn-action-reactivate { color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; }
    .btn-action-reactivate:hover { background: #d1fae5; }

    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }
    .btn-primary { background: #0284c7; color: #fff; }
    .btn-primary:hover { background: #0369a1; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-secondary:hover { background: #f8fafc; }
    .btn-danger { background: #dc2626; color: #fff; }
    .btn-danger:hover { background: #b91c1c; }
    .btn-outline-print { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; font-weight: 600; }
    .btn-outline-print:hover { background: #dcfce7; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }

    .btn-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }

    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }

    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }
    .modal-card { background: #fff; border-radius: 12px; width: 100%; max-width: 480px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); overflow: hidden; animation: pop 0.2s ease-out; }
    .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9; }
    .modal-header h3 { margin: 0; font-size: 1.15rem; color: #0f172a; }
    .modal-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: #334155; }
    .modal-body p { margin: 0; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 0.6rem; padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9; background: #f8fafc; }

    @keyframes pop { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
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
  protected readonly editingMemberId = signal<string | null>(null);
  protected readonly inactivatingMember = signal<Member | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  protected selectedReason: string = 'Mudança de Paróquia';
  protected customReason: string = '';

  // Ordenação inteligente: Dizimistas fiéis no topo da lista, seguidos pelos demais em ordem alfabética
  protected readonly sortedMembers = computed(() => {
    return [...this.memberService.members()].sort((a, b) => {
      const aActive = this.isActive(a) ? 1 : 0;
      const bActive = this.isActive(b) ? 1 : 0;
      if (bActive !== aActive) {
        return bActive - aActive; // Ativos primeiro
      }
      const aSteward = (a.isSteward || (a.ministry && a.ministry.toLowerCase().includes('dízim'))) ? 1 : 0;
      const bSteward = (b.isSteward || (b.ministry && b.ministry.toLowerCase().includes('dízim'))) ? 1 : 0;
      if (bSteward !== aSteward) {
        return bSteward - aSteward; // Dizimistas no topo
      }
      return a.name.localeCompare(b.name, 'pt-BR');
    });
  });

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
    if (this.communityService.communities().length === 0) {
      this.communityService.loadCommunities().subscribe();
    }
  }

  refresh(): void {
    this.memberService.loadMembers(this.communityService.activeCommunityId()).subscribe();
  }

  isActive(m: Member): boolean {
    return m.status === 'ACTIVE' || m.status === 'ATIVO';
  }

  toggleForm(): void {
    if (this.showForm() && !this.editingMemberId()) {
      this.showForm.set(false);
      return;
    }
    this.editingMemberId.set(null);
    this.showForm.set(true);

    const activeId = this.communityService.activeCommunityId();
    const defaultComm = (activeId && activeId !== 'ALL')
      ? activeId
      : (this.communityService.communities()[0]?.id || '');

    this.memberForm.reset({
      communityId: defaultComm,
      status: 'ACTIVE',
      isSteward: false,
    });
  }

  cancelForm(): void {
    this.showForm.set(false);
    this.editingMemberId.set(null);
    this.memberForm.reset({ status: 'ACTIVE', isSteward: false });
  }

  startEdit(member: Member): void {
    this.editingMemberId.set(member.id);
    this.showForm.set(true);

    this.memberForm.patchValue({
      name: member.name,
      communityId: member.communityId,
      birthDate: member.birthDate || '',
      phone: member.phone || '',
      email: member.email || '',
      ministry: member.ministry || '',
      status: this.isActive(member) ? 'ACTIVE' : 'INACTIVE',
      isSteward: Boolean(member.isSteward || (member.ministry && member.ministry.toLowerCase().includes('dízim'))),
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    const editId = this.editingMemberId();
    if (editId) {
      this.memberService.updateMember(editId, dto).subscribe({
        next: () => {
          this.successMessage.set(`Dados do membro "${dto.name}" atualizados com sucesso!`);
          this.cancelForm();
        },
      });
    } else {
      this.memberService.createMember(dto).subscribe({
        next: () => {
          this.successMessage.set(`Membro "${dto.name}" cadastrado com sucesso!`);
          this.cancelForm();
        },
      });
    }
  }

  openInactivateModal(member: Member): void {
    this.inactivatingMember.set(member);
    this.selectedReason = 'Mudança de Paróquia';
    this.customReason = '';
  }

  closeInactivateModal(): void {
    this.inactivatingMember.set(null);
  }

  onReasonSelectChange(): void {
    if (this.selectedReason !== 'Outro') {
      this.customReason = '';
    }
  }

  confirmInactivation(member: Member): void {
    const finalReason = this.selectedReason === 'Outro' && this.customReason.trim()
      ? this.customReason.trim()
      : this.selectedReason;

    this.memberService.inactivateMember(member.id, finalReason).subscribe({
      next: () => {
        this.successMessage.set(`Membro "${member.name}" inativado com sucesso. Motivo: ${finalReason}`);
        this.closeInactivateModal();
      },
    });
  }

  reactivateMember(member: Member): void {
    if (confirm(`Deseja reativar o membro pastoral "${member.name}"?`)) {
      this.memberService.updateMember(member.id, { status: 'ACTIVE', inactiveReason: undefined }).subscribe({
        next: () => {
          this.successMessage.set(`Membro "${member.name}" reativado com sucesso!`);
        },
      });
    }
  }

  getCommunityName(communityId: string): string {
    const comm = this.communityService.communities().find((c) => c.id === communityId);
    return comm ? comm.name : 'Matriz Paroquial';
  }

  // Gera folha impressa/PDF limpa e profissional com a listagem de dizimistas
  generateStewardSheet(): void {
    const stewards = this.sortedMembers().filter(
      (m) => m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim'))
    );
    const commName = this.communityService.activeCommunity()?.name || 'Visão Paroquial (Todas as Comunidades)';
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Por favor, permita a abertura de pop-ups para gerar a folha de dizimistas.');
      return;
    }

    const currentDate = new Date().toLocaleDateString('pt-BR');
    const rowsHtml = stewards.map((m, idx) => `
      <tr>
        <td style="text-align: center; font-weight: bold;">${idx + 1}</td>
        <td><strong>${m.name}</strong></td>
        <td style="text-align: center;">${m.birthDate ? new Date(m.birthDate + 'T00:00:00').toLocaleDateString('pt-BR') : '-'}</td>
        <td>${m.phone || m.email || '-'}</td>
        <td style="text-align: center;">
          <span style="color: ${(m.status === 'ACTIVE' || m.status === 'ATIVO') ? '#15803d' : '#b91c1c'}; font-weight: 600;">
            ${(m.status === 'ACTIVE' || m.status === 'ATIVO') ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        <td style="width: 140px; border-bottom: 1px dotted #94a3b8;">&nbsp;</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <title>Folha de Dizimistas - ${commName}</title>
        <style>
          @page { size: A4 portrait; margin: 1.5cm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 25px; font-size: 11pt; }
          .header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
          .header h1 { margin: 0 0 4px 0; font-size: 16pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
          .header p { margin: 3px 0; font-size: 10pt; color: #475569; }
          .info-bar { display: flex; justify-content: space-between; font-size: 9.5pt; color: #64748b; margin-bottom: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background: #f1f5f9; color: #334155; font-size: 9pt; text-transform: uppercase; font-weight: 700; padding: 8px; border: 1px solid #cbd5e1; }
          td { padding: 8px 10px; border: 1px solid #e2e8f0; font-size: 9.5pt; vertical-align: middle; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .footer { margin-top: 35px; text-align: center; font-size: 8.5pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 16px; display: flex; gap: 10px; justify-content: flex-end;">
          <button onclick="window.print()" style="padding: 8px 18px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
            🖨️ Imprimir / Salvar PDF
          </button>
          <button onclick="window.close()" style="padding: 8px 18px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer;">
            Fechar
          </button>
        </div>
        <div class="header">
          <h1>EcoEcclesia • Folha de Controle de Dizimistas</h1>
          <p><strong>Comunidade:</strong> ${commName}</p>
          <p>Pastoral do Dízimo • Registro e Fidelidade dos Fiéis</p>
        </div>
        <div class="info-bar">
          <span><strong>Total de Dizimistas Cadastrados:</strong> ${stewards.length}</span>
          <span><strong>Data de Emissão:</strong> ${currentDate}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width: 35px; text-align: center;">#</th>
              <th>Nome Completo</th>
              <th style="width: 110px; text-align: center;">Data Nasc.</th>
              <th>Contato (Tel / E-mail)</th>
              <th style="width: 85px; text-align: center;">Situação</th>
              <th style="width: 140px; text-align: center;">Assinatura / Mês</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="6" style="text-align: center; padding: 25px; color: #94a3b8;">Nenhum dizimista registrado nesta comunidade.</td></tr>'}
          </tbody>
        </table>
        <div class="footer">
          <p>Documento gerado automaticamente pelo EcoEcclesia Gestão Eclesial • Que São João Bosco abençoe vossa fidelidade à Igreja.</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  }
}
