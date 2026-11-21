import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function PasswordResetPageComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function PasswordResetPageComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "strong");
    i0.ɵɵtext(2, "Senha alterada com sucesso!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Redirecionando para a tela de login...");
    i0.ɵɵelementEnd()();
} }
function PasswordResetPageComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Atualizando... ");
} }
function PasswordResetPageComponent_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Nova Senha ");
} }
export class PasswordResetPageComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    router = inject(Router);
    // Injetado automaticamente pelo withComponentInputBinding() a partir do query param ?token=...
    token = input();
    loading = signal(false);
    error = signal(null);
    success = signal(false);
    form = this.fb.group({
        token: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });
    ngOnInit() {
        if (this.token()) {
            this.form.patchValue({ token: this.token() });
        }
    }
    submit() {
        if (this.form.invalid)
            return;
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
    static ɵfac = function PasswordResetPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PasswordResetPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PasswordResetPageComponent, selectors: [["app-password-reset-page"]], inputs: { token: [1, "token"] }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 26, vars: 5, consts: [[1, "auth-wrapper"], [1, "card", "auth-card"], [1, "auth-header"], [1, "badge"], [1, "subtitle"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "token"], ["id", "token", "type", "text", "formControlName", "token", "placeholder", "Cole o token recebido"], ["for", "password"], ["id", "password", "type", "password", "formControlName", "password", "placeholder", "M\u00EDnimo 6 caracteres"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [1, "auth-footer"], ["routerLink", "/login", 1, "link"]], template: function PasswordResetPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "Redefini\u00E7\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Nova Senha");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Informe o token recebido e defina sua nova senha de acesso.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, PasswordResetPageComponent_Conditional_9_Template, 2, 1, "div", 5)(10, PasswordResetPageComponent_Conditional_10_Template, 5, 0, "div", 6);
            i0.ɵɵelementStart(11, "form", 7);
            i0.ɵɵlistener("ngSubmit", function PasswordResetPageComponent_Template_form_ngSubmit_11_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(12, "div", 8)(13, "label", 9);
            i0.ɵɵtext(14, "Token de Recupera\u00E7\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 8)(17, "label", 11);
            i0.ɵɵtext(18, "Nova Senha");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(19, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "button", 13);
            i0.ɵɵtemplate(21, PasswordResetPageComponent_Conditional_21_Template, 1, 0)(22, PasswordResetPageComponent_Conditional_22_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 14)(24, "a", 15);
            i0.ɵɵtext(25, "\u2190 Voltar para o Login");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional((tmp_0_0 = ctx.error()) ? 9 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.success() ? 10 : -1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 21 : 22);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".auth-wrapper[_ngcontent-%COMP%] { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .auth-card[_ngcontent-%COMP%] { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .auth-header[_ngcontent-%COMP%] { text-align: center; margin-bottom: 1.5rem; }\n    .badge[_ngcontent-%COMP%] { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #16a34a; background: #f0fdf4; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .auth-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; color: #0f172a; font-size: 1.4rem; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .auth-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit[_ngcontent-%COMP%] { background: #16a34a; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\n    .btn-submit[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .auth-footer[_ngcontent-%COMP%] { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link[_ngcontent-%COMP%] { color: #2563eb; text-decoration: none; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PasswordResetPageComponent, [{
        type: Component,
        args: [{ selector: 'app-password-reset-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `
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
  `, styles: ["\n    .auth-wrapper { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .auth-card { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .auth-header { text-align: center; margin-bottom: 1.5rem; }\n    .badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #16a34a; background: #f0fdf4; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.4rem; }\n    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .auth-form { display: flex; flex-direction: column; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit { background: #16a34a; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\n    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }\n    .alert { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .auth-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link { color: #2563eb; text-decoration: none; }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PasswordResetPageComponent, { className: "PasswordResetPageComponent", filePath: "src\\app\\pages\\password-reset-page.component.ts", lineNumber: 72 }); })();
//# sourceMappingURL=password-reset-page.component.js.map