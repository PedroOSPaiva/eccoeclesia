import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-wrapper">
      <section class="card auth-card">
        <div class="auth-header">
          <span class="badge">Recuperação de Acesso</span>
          <h2>Esqueci Minha Senha</h2>
          <p class="subtitle">Informe seu e-mail cadastrado para gerar o token de recuperação.</p>
        </div>

        @if (error(); as err) {
          <div class="alert alert-error">{{ err }}</div>
        }
        @if (generatedToken(); as tok) {
          <div class="alert alert-success">
            <strong>Token de Recuperação Gerado:</strong>
            <p><code>{{ tok }}</code></p>
            <a [routerLink]="['/reset-password']" [queryParams]="{ token: tok }" class="btn-action">
              Prosseguir para Redefinir Senha &rarr;
            </a>
          </div>
        }

        <form [formGroup]="form" (ngSubmit)="submit()" class="auth-form">
          <div class="field">
            <label for="email">E-mail Cadastrado</label>
            <input id="email" type="email" formControlName="email" placeholder="usuario@ecoeclesia.org" />
          </div>

          <button type="submit" class="btn-submit" [disabled]="form.invalid || loading()">
            @if (loading()) { Gerando token... } @else { Solicitar Recuperação }
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
    .badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }
    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.4rem; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }
    .auth-form { display: flex; flex-direction: column; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }
    .btn-submit { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-action { display: inline-block; margin-top: 0.5rem; color: #15803d; font-weight: 700; text-decoration: underline; font-size: 0.85rem; }
    .alert { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }
    .alert-success code { background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 4px; word-break: break-all; }
    .auth-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }
    .link { color: #2563eb; text-decoration: none; }
  `]
})
export class ForgotPasswordPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);

  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);
  protected readonly generatedToken = signal<string | null>(null);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    const { email } = this.form.getRawValue();
    this.http.post<{ token: string }>('/api/auth/forgot-password', { email }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.generatedToken.set(res.token);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error || 'Erro ao processar solicitação.');
      },
    });
  }
}
