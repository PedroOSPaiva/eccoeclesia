import { Component, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      <section class="card auth-card">
        <div class="auth-header">
          <span class="badge">Redefinição</span>
          <h2>Nova Senha</h2>
          <p class="subtitle">Informe o token recebido e defina sua nova senha de acesso.</p>
        </div>

        @if (error(); as err) {
          <div class="alert alert-error">{{ err }}</div>
        }
        @if (success()) {
          <div class="alert alert-success">
            <strong>Senha alterada com sucesso!</strong>
            <p>Redirecionando para a tela de login...</p>
          </div>
        }

        <form [formGroup]="form" (ngSubmit)="submit()" class="auth-form">
          <div class="field">
            <label for="token">Token de Recuperação</label>
            <input id="token" type="text" formControlName="token" placeholder="Cole o token recebido" />
          </div>

          <div class="field">
            <label for="password">Nova Senha</label>
            <input id="password" type="password" formControlName="password" placeholder="Mínimo 6 caracteres" />
          </div>

          <button type="submit" class="btn-submit" [disabled]="form.invalid || loading()">
            @if (loading()) { Atualizando... } @else { Salvar Nova Senha }
          </button>
        </form>

        <div class="auth-footer">
          <a routerLink="/login" class="link">&larr; Voltar para o Login</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .auth-wrapper { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }
    .auth-card { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .auth-header { text-align: center; margin-bottom: 1.5rem; }
    .badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #16a34a; background: #f0fdf4; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }
    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.4rem; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }
    .auth-form { display: flex; flex-direction: column; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }
    .btn-submit { background: #16a34a; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .alert { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .auth-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }
    .link { color: #2563eb; text-decoration: none; }
  `]
})
export class PasswordResetPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  // Injetado automaticamente pelo withComponentInputBinding() a partir do query param ?token=...
  readonly token = input<string>();

  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);
  protected readonly success = signal<boolean>(false);

  protected readonly form = this.fb.group({
    token: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    if (this.token()) {
      this.form.patchValue({ token: this.token() });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    const { token, password } = this.form.getRawValue();
    this.http.post('/api/auth/reset-password', { token, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error || 'Token inválido ou expirado.');
      },
    });
  }
}
