import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BirthdayService } from '../core/services/birthday.service';
import { CreateBirthdayDto } from '../core/models/birthday.model';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';

@Component({
  selector: 'app-birthdays-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, DomBosquinhoStateComponent],
  template: `
    <div class="birthdays-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Pastoral & Comunhão</span>
          <h1>Aniversariantes da Comunidade</h1>
          <p class="subtitle">Celebração da vida dos irmãos, agentes pastorais e membros da paróquia.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="birthdayService.loading()">
            @if (birthdayService.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Sincronizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleForm()">
            + Novo Aniversariante
          </button>
        </div>
      </header>

      <!-- Feedback de Erro com Dom Bosquinho -->
      @if (birthdayService.error(); as err) {
        <app-dom-bosquinho-state
          mode="error"
          title="Ops! Dom Bosquinho avisa que houve um contratempo"
          [message]="err"
          [showDismiss]="true"
          (retry)="refresh()"
          (dismiss)="birthdayService.clearError()">
        </app-dom-bosquinho-state>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Cadastro -->
      @if (showForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Cadastrar Aniversariante</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="birthdayForm" (ngSubmit)="submitBirthday()" class="birthday-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="name">Nome Completo</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Maria Auxiliadora" />
              </div>
              <div class="field">
                <label for="birthDate">Data de Nascimento</label>
                <input id="birthDate" type="date" formControlName="birthDate" />
              </div>
            </div>
            <div class="form-row">
              <div class="field">
                <label for="ministry">Pastoral / Movimento</label>
                <input id="ministry" type="text" formControlName="ministry" placeholder="Ex: Coral, Catequese, Liturgia" />
              </div>
              <div class="field">
                <label for="contact">Telefone / E-mail</label>
                <input id="contact" type="text" formControlName="contact" placeholder="(11) 98765-4321" />
              </div>
            </div>
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="birthdayForm.invalid || birthdayService.loading()">
                @if (birthdayService.loading()) {
                  <span class="spinner"></span> Salvando...
                } @else {
                  Salvar Aniversariante
                }
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Tabela / Lista de Aniversários -->
      <section class="card table-card">
        @if (birthdayService.loading() && birthdayService.birthdays().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando aniversariantes...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome do Irmão(ã)</th>
                  <th>Próximo Aniversário</th>
                  <th>Nova Idade</th>
                  <th>Pastoral / Serviço</th>
                  <th>Contato</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (item of birthdayService.birthdays(); track item.id) {
                  <tr [class.highlight-today]="item.daysUntilBirthday === 0">
                    <td>
                      <strong>{{ item.name }}</strong>
                      @if (item.daysUntilBirthday === 0) {
                        <span class="badge badge-party">🎂 Parabéns Hoje!</span>
                      }
                    </td>
                    <td class="col-date">{{ item.nextBirthday | date:'dd/MM' }}</td>
                    <td><strong>{{ item.turningAge }} anos</strong></td>
                    <td><span class="badge-ministry">{{ item.ministry || 'Comunidade' }}</span></td>
                    <td class="text-muted">{{ item.contact || '-' }}</td>
                    <td>
                      @if (item.daysUntilBirthday === 0) {
                        <span class="status-today">Hoje!</span>
                      } @else if (item.daysUntilBirthday <= 7) {
                        <span class="status-soon">Em {{ item.daysUntilBirthday }} dia(s)</span>
                      } @else {
                        <span class="status-normal">Em {{ item.daysUntilBirthday }} dias</span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="empty-state">
                      <p>Nenhum aniversariante cadastrado para os próximos períodos.</p>
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
    .birthdays-container { display: flex; flex-direction: column; gap: 1.25rem; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }
    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #ec4899; background: #fdf2f8; padding: 0.2rem 0.5rem; border-radius: 4px; }
    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }
    .header-actions { display: flex; gap: 0.6rem; align-items: center; }
    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }
    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }
    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }
    .birthday-form { display: flex; flex-direction: column; gap: 1rem; }
    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }
    .flex-2 { flex: 2; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }
    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }
    .table-card { padding: 0; overflow: hidden; }
    .table-responsive { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }
    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }
    .highlight-today { background: #fdf2f8; }
    .col-date { white-space: nowrap; color: #64748b; font-size: 0.85rem; }
    .badge-party { font-size: 0.75rem; font-weight: 700; color: #db2777; background: #fce7f3; padding: 0.2rem 0.5rem; border-radius: 9999px; margin-left: 0.5rem; }
    .badge-ministry { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #f1f5f9; color: #334155; }
    .status-today { color: #db2777; font-weight: 700; }
    .status-soon { color: #d97706; font-weight: 600; }
    .status-normal { color: #64748b; }
    .text-muted { color: #94a3b8; }
    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }
    .btn-primary { background: #db2777; color: #fff; }
    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }
    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }
    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }
    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }
    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #db2777; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class BirthdaysPageComponent implements OnInit {
  protected readonly birthdayService = inject(BirthdayService);
  private readonly fb = inject(FormBuilder);

  protected readonly showForm = signal<boolean>(false);
  protected readonly successMessage = signal<string | null>(null);

  protected readonly birthdayForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    birthDate: ['', Validators.required],
    ministry: ['Liturgia'],
    contact: [''],
  });

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.birthdayService.loadBirthdays().subscribe();
  }

  toggleForm(): void {
    this.showForm.update((v) => !v);
  }

  submitBirthday(): void {
    if (this.birthdayForm.invalid) {
      this.birthdayForm.markAllAsTouched();
      return;
    }

    const val = this.birthdayForm.getRawValue();
    const dto: CreateBirthdayDto = {
      name: val.name!,
      birthDate: val.birthDate!,
      ministry: val.ministry || 'Comunidade',
      contact: val.contact || '',
    };

    this.birthdayService.createBirthday(dto).subscribe({
      next: () => {
        this.successMessage.set('Aniversariante registrado com sucesso!');
        this.birthdayForm.reset({ ministry: 'Liturgia' });
        this.showForm.set(false);
      },
    });
  }
}
