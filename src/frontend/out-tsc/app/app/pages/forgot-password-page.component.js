import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = () => ["/reset-password"];
const _c1 = a0 => ({ token: a0 });
function ForgotPasswordPageComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ForgotPasswordPageComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "strong");
    i0.ɵɵtext(2, "Token de Recupera\u00E7\u00E3o Gerado:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p")(4, "code");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "a", 14);
    i0.ɵɵtext(7, " Prosseguir para Redefinir Senha \u2192 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const tok_r1 = ctx;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tok_r1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(3, _c0))("queryParams", i0.ɵɵpureFunction1(4, _c1, tok_r1));
} }
function ForgotPasswordPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Gerando token... ");
} }
function ForgotPasswordPageComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Solicitar Recupera\u00E7\u00E3o ");
} }
export class ForgotPasswordPageComponent {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    loading = signal(false);
    error = signal(null);
    generatedToken = signal(null);
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });
    submit() {
        if (this.form.invalid)
            return;
        this.loading.set(true);
        this.error.set(null);
        const { email } = this.form.getRawValue();
        this.http.post('/api/auth/forgot-password', { email }).subscribe({
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
    static ɵfac = function ForgotPasswordPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ForgotPasswordPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ForgotPasswordPageComponent, selectors: [["app-forgot-password-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 22, vars: 5, consts: [[1, "auth-wrapper"], [1, "card", "auth-card"], [1, "auth-header"], [1, "badge"], [1, "subtitle"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "usuario@ecoeclesia.org"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [1, "auth-footer"], ["routerLink", "/login", 1, "link"], [1, "btn-action", 3, "routerLink", "queryParams"]], template: function ForgotPasswordPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "Recupera\u00E7\u00E3o de Acesso");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h2");
            i0.ɵɵtext(6, "Esqueci Minha Senha");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8, "Informe seu e-mail cadastrado para gerar o token de recupera\u00E7\u00E3o.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, ForgotPasswordPageComponent_Conditional_9_Template, 2, 1, "div", 5)(10, ForgotPasswordPageComponent_Conditional_10_Template, 8, 6, "div", 6);
            i0.ɵɵelementStart(11, "form", 7);
            i0.ɵɵlistener("ngSubmit", function ForgotPasswordPageComponent_Template_form_ngSubmit_11_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(12, "div", 8)(13, "label", 9);
            i0.ɵɵtext(14, "E-mail Cadastrado");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(15, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 11);
            i0.ɵɵtemplate(17, ForgotPasswordPageComponent_Conditional_17_Template, 1, 0)(18, ForgotPasswordPageComponent_Conditional_18_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 12)(20, "a", 13);
            i0.ɵɵtext(21, "\u2190 Voltar para o Login");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_1_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional((tmp_0_0 = ctx.error()) ? 9 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_1_0 = ctx.generatedToken()) ? 10 : -1, tmp_1_0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading() ? 17 : 18);
        } }, dependencies: [CommonModule, ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink], styles: [".auth-wrapper[_ngcontent-%COMP%] { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .auth-card[_ngcontent-%COMP%] { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .auth-header[_ngcontent-%COMP%] { text-align: center; margin-bottom: 1.5rem; }\n    .badge[_ngcontent-%COMP%] { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .auth-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] { margin: 0; color: #0f172a; font-size: 1.4rem; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .auth-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit[_ngcontent-%COMP%] { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\n    .btn-submit[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n    .btn-action[_ngcontent-%COMP%] { display: inline-block; margin-top: 0.5rem; color: #15803d; font-weight: 700; text-decoration: underline; font-size: 0.85rem; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .alert-success[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] { background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 4px; word-break: break-all; }\n    .auth-footer[_ngcontent-%COMP%] { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link[_ngcontent-%COMP%] { color: #2563eb; text-decoration: none; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ForgotPasswordPageComponent, [{
        type: Component,
        args: [{ selector: 'app-forgot-password-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], template: `
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
  `, styles: ["\n    .auth-wrapper { display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 1rem; }\n    .auth-card { width: 100%; max-width: 420px; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }\n    .auth-header { text-align: center; margin-bottom: 1.5rem; }\n    .badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.5rem; }\n    .auth-header h2 { margin: 0; color: #0f172a; font-size: 1.4rem; }\n    .subtitle { color: #64748b; font-size: 0.85rem; margin: 0.25rem 0 0; }\n    .auth-form { display: flex; flex-direction: column; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input { padding: 0.65rem 0.85rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.9rem; }\n    .btn-submit { background: #1d4ed8; color: #fff; border: none; padding: 0.75rem; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; }\n    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }\n    .btn-action { display: inline-block; margin-top: 0.5rem; color: #15803d; font-weight: 700; text-decoration: underline; font-size: 0.85rem; }\n    .alert { padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .alert-success code { background: #dcfce7; padding: 0.2rem 0.4rem; border-radius: 4px; word-break: break-all; }\n    .auth-footer { text-align: center; margin-top: 1.25rem; font-size: 0.85rem; }\n    .link { color: #2563eb; text-decoration: none; }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ForgotPasswordPageComponent, { className: "ForgotPasswordPageComponent", filePath: "src\\app\\pages\\forgot-password-page.component.ts", lineNumber: 72 }); })();
//# sourceMappingURL=forgot-password-page.component.js.map