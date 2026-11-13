import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-wrapper">
      <section class="card login-card">
        <div class="brand-header">
          <span class="brand-badge">EcoEcclesia</span>
          <h2>Acesso ao Sistema</h2>
          <p class="subtitle">Gestão financeira e patrimonial eclesiástica</p>
        </div>

        @if (error(); as errorMsg) {
          <div class="alert-error">
            {{ errorMsg }}
          </div>
        }

        <form [formGroup]="form" (ngSubmit)="submit()" class="login-form">
          <div class="field">
            <label for="email">E-mail Institucional</label>
            <input id="email" type="email" formControlName="email" placeholder="seu.usuario@ecoeclesia.org" autocomplete="username" />
          </div>

          <div class="field">
            <label for="password">Senha de Acesso</label>
            <input id="password" type="password" formControlName="password" placeholder="••••••••" autocomplete="current-password" />
          </div>

          <button type="submit" class="btn-submit" [disabled]="form.invalid || loading()">
            @if (loading()) {
              Autenticando...
            } @else {
              Entrar no EcoEcclesia
            }
          </button>
        </form>

        <div class="login-footer">
          <a routerLink="/forgot-password" class="link">Esqueci minha senha</a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .login-wrapper { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }
    .login-card { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .brand-header { text-align: center; margin-bottom: 1.5rem; }
    .brand-badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }
    .brand-header h2 { margin: 0; color: #0f172a; font-size: 1.5rem; }
    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }
    .login-form { display: flex; flex-direction: column; gap: 1rem; }
    .field { display: flex; flex-direction: column; gap: 0.35rem; }
    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }
    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }
    .btn-submit { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }
    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; text-align: center; }
    .login-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }
    .link { color: #2563eb; text-decoration: none; }
    .link:hover { text-decoration: underline; }
  `]
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal<boolean>(false);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.error || 'Falha na autenticação. Verifique suas credenciais.');
      },
    });
  }
}
