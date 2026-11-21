import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function LoginPageComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx, " ");
} }
function LoginPageComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Autenticando... ");
} }
function LoginPageComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Entrar no EcoEcclesia ");
} }
export class LoginPageComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    router = inject(Router);
    error = signal(null);
    loading = signal(false);
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });
    submit() {
        if (this.form.invalid)
            return;
        this.loading.set(true);
        this.error.set(null);
        const { email, password } = this.form.getRawValue();
        this.auth.login(email, password).subscribe({
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
    static ɵfac = function LoginPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPageComponent, selectors: [["app-login-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 25, vars: 4, consts: [[1, "login-wrapper"], [1, "card", "login-card"], [1, "brand-header"], [1, "brand-badge"], [1, "subtitle"], [1, "alert-error"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "seu.usuario@ecoeclesia.org", "autocomplete", "username"], ["for", "password"], ["id", "password", "type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "current-password"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [1, "login-footer"], ["routerLink", "/forgot-password", 1, "link"]], template: function LoginPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "EcoEcclesia");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Acesso ao Sistema");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Gest\u00E3o financeira e patrimonial eclesi\u00E1stica");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, LoginPageComponent_Conditional_9_Template, 2, 1, "div", 5);
            i0.ɵɵelementStart(10, "form", 6);
            i0.ɵɵlistener("ngSubmit", function LoginPageComponent_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(11, "div", 7)(12, "label", 8);
            i0.ɵɵtext(13, "E-mail Institucional");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "input", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 7)(16, "label", 10);
            i0.ɵɵtext(17, "Senha de Acesso");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(18, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "button", 12);
            i0.ɵɵtemplate(20, LoginPageComponent_Conditional_20_Template, 1, 0)(21, LoginPageComponent_Conditional_21_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 13)(23, "a", 14);
            i0.ɵɵtext(24, "Esqueci minha senha");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional((tmp_0_0 = ctx.error()) ? 9 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 20 : 21);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".login-wrapper[_ngcontent-%COMP%] { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .login-card[_ngcontent-%COMP%] { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .brand-header[_ngcontent-%COMP%] { text-align: center; margin-bottom: 1.5rem; }\n    .brand-badge[_ngcontent-%COMP%] { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .brand-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; color: #0f172a; font-size: 1.5rem; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .login-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit[_ngcontent-%COMP%] { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }\n    .btn-submit[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; text-align: center; }\n    .login-footer[_ngcontent-%COMP%] { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link[_ngcontent-%COMP%] { color: #2563eb; text-decoration: none; }\n    .link[_ngcontent-%COMP%]:hover { text-decoration: underline; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPageComponent, [{
        type: Component,
        args: [{ selector: 'app-login-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `
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
  `, styles: ["\n    .login-wrapper { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .login-card { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .brand-header { text-align: center; margin-bottom: 1.5rem; }\n    .brand-badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .brand-header h2 { margin: 0; color: #0f172a; font-size: 1.5rem; }\n    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .login-form { display: flex; flex-direction: column; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; margin-top: 0.5rem; }\n    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; text-align: center; }\n    .login-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link { color: #2563eb; text-decoration: none; }\n    .link:hover { text-decoration: underline; }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPageComponent, { className: "LoginPageComponent", filePath: "src\\app\\pages\\login-page.component.ts", lineNumber: 71 }); })();
//# sourceMappingURL=login-page.component.js.map