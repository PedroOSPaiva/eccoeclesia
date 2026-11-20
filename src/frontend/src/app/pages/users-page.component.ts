import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { CreateUserDto } from '../core/models/user.model';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe],
  template: `
    <div class="users-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Segurança & Controle de Acesso</span>
          <h1>Gestão de Usuários & Agentes</h1>
          <p class="subtitle">Administração de operadores, tesoureiros e permissões do sistema.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="userService.loading()">
            @if (userService.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Sincronizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Usuário
          </button>
        </div>
      </header>

      @if (userService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="userService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Criação -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Cadastrar Novo Operador</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="userForm" (ngSubmit)="submitUser()" class="user-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="fullName">Nome Completo</label>
                <input id="fullName" type="text" formControlName="fullName" placeholder="Ex: João da Silva" />
              </div>
              <div class="field flex-2">
                <label for="email">E-mail de Acesso</label>
                <input id="email" type="email" formControlName="email" placeholder="joao@ecoeclesia.org" />
              </div>
            </div>

            <div class="form-row">
              <div class="field">
                <label for="password">Senha Inicial</label>
                <input id="password" type="password" formControlName="password" placeholder="Mínimo 6 caracteres" />
              </div>
              <div class="field">
                <label for="role">Papel de Acesso</label>
                <select id="role" formControlName="role">
                  <option value="ADMIN">Administrador (Total)</option>
                  <option value="TREASURER">Tesoureiro (Financeiro & Razão)</option>
                  <option value="PASTORAL">Agente Pastoral (Leitura)</option>
                </select>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="userForm.invalid || userService.loading()">
                @if (userService.loading()) {
                  <span class="spinner"></span> Salvando...
                } @else {
                  Salvar Usuário
                }
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Tabela de Usuários -->
      <section class="card table-card">
        @if (userService.loading() && userService.users().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando usuários...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome do Agente</th>
                  <th>E-mail</th>
                  <th>Papéis / Permissões</th>
                  <th>Última Atualização</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (user of userService.users(); track user.id) {
                  <tr>
                    <td><strong>{{ user.fullName }}</strong></td>
                    <td class="text-muted">{{ user.email }}</td>
                    <td>
                      @for (role of user.roles; track role) {
                        <span class="badge" [class.badge-admin]="role === 'ADMIN'" [class.badge-treasurer]="role === 'TREASURER'">
                          {{ role }}
                        </span>
                      }
                    </td>
                    <td class="col-date">{{ user.updatedAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="text-right">
                      <button type="button" class="btn-action-delete" (click)="deleteUser(user.id)" title="Remover usuário">
                        Excluir
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="empty-state">
                      <p>Nenhum usuário cadastrado além do administrador padrão.</p>
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
    .users-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .user-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }
    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #f1f5f9; color: #334155; margin-right: 0.3rem; }
    .badge-admin { background: #fee2e2; color: #991b1b; }
    .badge-treasurer { background: #dbeafe; color: #1e40af; }
    .text-muted { color: #64748b; }
    .text-right { text-align: right; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary { background: #0284c7; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-action-delete { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; }
    .btn-action-delete:hover { text-decoration: underline; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }
    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class UsersPageComponent implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly fb = inject(FormBuilder);

  protected readonly showForm = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly userForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['TREASURER', Validators.required],
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.loadUsers().subscribe();
  }

  toggleForm(): void {
    this.showForm.update((v) => !v);
  }

  submitUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const val = this.userForm.getRawValue();
    const dto: CreateUserDto = {
      fullName: val.fullName!,
      email: val.email!,
      password: val.password!,
      roles: [val.role!],
    };

    this.userService.createUser(dto).subscribe({
      next: () => {
        this.successMessage.set('Usuário cadastrado com sucesso!');
        this.userForm.reset({ role: 'TREASURER' });
        this.showForm.set(false);
      },
    });
  }

  deleteUser(id: string): void {
    if (confirm('Deseja realmente remover o acesso deste usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.successMessage.set('Acesso revogado com sucesso!'),
      });
    }
  }
}
