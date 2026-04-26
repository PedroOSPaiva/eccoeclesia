import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="card" style="max-width:420px;margin:0 auto;">
      <h1>Entrar</h1>
      <form [formGroup]="form" (ngSubmit)="submit()" class="grid">
        <input type="email" formControlName="email" placeholder="E-mail" />
        <input type="password" formControlName="password" placeholder="Senha" />
        <button type="submit">Acessar</button>
      </form>
      <small *ngIf="error" style="color:#dc2626">{{ error }}</small>
      <p><a routerLink="/forgot-password">Esqueci minha senha</a></p>
    </section>
  `,
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.error = 'Falha no login. Verifique suas credenciais.'),
    });
  }
}
