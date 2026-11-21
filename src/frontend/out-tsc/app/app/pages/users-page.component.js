import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function UsersPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
    i0.ɵɵtext(1, " Sincronizando... ");
} }
function UsersPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sincronizar ");
} }
function UsersPageComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 14);
    i0.ɵɵlistener("click", function UsersPageComponent_Conditional_15_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.userService.clearError()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function UsersPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 14);
    i0.ɵɵlistener("click", function UsersPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function UsersPageComponent_Conditional_17_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 13);
    i0.ɵɵtext(1, " Salvando... ");
} }
function UsersPageComponent_Conditional_17_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Usu\u00E1rio ");
} }
function UsersPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div", 15)(2, "h3");
    i0.ɵɵtext(3, "Cadastrar Novo Operador");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 14);
    i0.ɵɵlistener("click", function UsersPageComponent_Conditional_17_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 16);
    i0.ɵɵlistener("ngSubmit", function UsersPageComponent_Conditional_17_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitUser()); });
    i0.ɵɵelementStart(7, "div", 17)(8, "div", 18)(9, "label", 19);
    i0.ɵɵtext(10, "Nome Completo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 18)(13, "label", 21);
    i0.ɵɵtext(14, "E-mail de Acesso");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 17)(17, "div", 23)(18, "label", 24);
    i0.ɵɵtext(19, "Senha Inicial");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 23)(22, "label", 26);
    i0.ɵɵtext(23, "Papel de Acesso");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "select", 27)(25, "option", 28);
    i0.ɵɵtext(26, "Administrador (Total)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "option", 29);
    i0.ɵɵtext(28, "Tesoureiro (Financeiro & Raz\u00E3o)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "option", 30);
    i0.ɵɵtext(30, "Agente Pastoral (Leitura)");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(31, "div", 31)(32, "button", 32);
    i0.ɵɵlistener("click", function UsersPageComponent_Conditional_17_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(33, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 33);
    i0.ɵɵtemplate(35, UsersPageComponent_Conditional_17_Conditional_35_Template, 2, 0)(36, UsersPageComponent_Conditional_17_Conditional_36_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r1.userForm);
    i0.ɵɵadvance(28);
    i0.ɵɵproperty("disabled", ctx_r1.userForm.invalid || ctx_r1.userService.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.userService.loading() ? 35 : 36);
} }
function UsersPageComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵelement(1, "div", 34);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando usu\u00E1rios...");
    i0.ɵɵelementEnd()();
} }
function UsersPageComponent_Conditional_20_For_16_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r6 = ctx.$implicit;
    i0.ɵɵclassProp("badge-admin", role_r6 === "ADMIN")("badge-treasurer", role_r6 === "TREASURER");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r6, " ");
} }
function UsersPageComponent_Conditional_20_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td", 37);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵrepeaterCreate(7, UsersPageComponent_Conditional_20_For_16_For_8_Template, 2, 5, "span", 38, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td", 39);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 36)(13, "button", 40);
    i0.ɵɵlistener("click", function UsersPageComponent_Conditional_20_For_16_Template_button_click_13_listener() { const user_r7 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteUser(user_r7.id)); });
    i0.ɵɵtext(14, " Excluir ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r7.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r7.email);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(user_r7.roles);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 3, user_r7.updatedAt, "dd/MM/yyyy HH:mm"));
} }
function UsersPageComponent_Conditional_20_ForEmpty_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 42)(2, "p");
    i0.ɵɵtext(3, "Nenhum usu\u00E1rio cadastrado al\u00E9m do administrador padr\u00E3o.");
    i0.ɵɵelementEnd()()();
} }
function UsersPageComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "table", 35)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Nome do Agente");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Pap\u00E9is / Permiss\u00F5es");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "\u00DAltima Atualiza\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 36);
    i0.ɵɵtext(13, "A\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "tbody");
    i0.ɵɵrepeaterCreate(15, UsersPageComponent_Conditional_20_For_16_Template, 15, 6, "tr", null, _forTrack0, false, UsersPageComponent_Conditional_20_ForEmpty_17_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵrepeater(ctx_r1.userService.users());
} }
export class UsersPageComponent {
    userService = inject(UserService);
    fb = inject(FormBuilder);
    showForm = signal(false);
    successMessage = signal(null);
    userForm = this.fb.group({
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['TREASURER', Validators.required],
    });
    ngOnInit() {
        this.refresh();
    }
    refresh() {
        this.userService.loadUsers().subscribe();
    }
    toggleForm() {
        this.showForm.update((v) => !v);
    }
    submitUser() {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }
        const val = this.userForm.getRawValue();
        const dto = {
            fullName: val.fullName,
            email: val.email,
            password: val.password,
            roles: [val.role],
        };
        this.userService.createUser(dto).subscribe({
            next: () => {
                this.successMessage.set('Usuário cadastrado com sucesso!');
                this.userForm.reset({ role: 'TREASURER' });
                this.showForm.set(false);
            },
        });
    }
    deleteUser(id) {
        if (confirm('Deseja realmente remover o acesso deste usuário?')) {
            this.userService.deleteUser(id).subscribe({
                next: () => this.successMessage.set('Acesso revogado com sucesso!'),
            });
        }
    }
    static ɵfac = function UsersPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersPageComponent, selectors: [["app-users-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 21, vars: 6, consts: [[1, "users-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "card", "form-card"], [1, "card", "table-card"], [1, "loading-state"], [1, "table-responsive"], [1, "spinner"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "user-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field", "flex-2"], ["for", "fullName"], ["id", "fullName", "type", "text", "formControlName", "fullName", "placeholder", "Ex: Jo\u00E3o da Silva"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "joao@ecoeclesia.org"], [1, "field"], ["for", "password"], ["id", "password", "type", "password", "formControlName", "password", "placeholder", "M\u00EDnimo 6 caracteres"], ["for", "role"], ["id", "role", "formControlName", "role"], ["value", "ADMIN"], ["value", "TREASURER"], ["value", "PASTORAL"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-large"], [1, "data-table"], [1, "text-right"], [1, "text-muted"], [1, "badge", 3, "badge-admin", "badge-treasurer"], [1, "col-date"], ["type", "button", "title", "Remover usu\u00E1rio", 1, "btn-action-delete", 3, "click"], [1, "badge"], ["colspan", "5", 1, "empty-state"]], template: function UsersPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Seguran\u00E7a & Controle de Acesso");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Gest\u00E3o de Usu\u00E1rios & Agentes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Administra\u00E7\u00E3o de operadores, tesoureiros e permiss\u00F5es do sistema.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function UsersPageComponent_Template_button_click_10_listener() { return ctx.refresh(); });
            i0.ɵɵtemplate(11, UsersPageComponent_Conditional_11_Template, 2, 0)(12, UsersPageComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function UsersPageComponent_Template_button_click_13_listener() { return ctx.toggleForm(); });
            i0.ɵɵtext(14, " + Novo Usu\u00E1rio ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(15, UsersPageComponent_Conditional_15_Template, 5, 1, "div", 7)(16, UsersPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, UsersPageComponent_Conditional_17_Template, 37, 3, "section", 9);
            i0.ɵɵelementStart(18, "section", 10);
            i0.ɵɵtemplate(19, UsersPageComponent_Conditional_19_Template, 4, 0, "div", 11)(20, UsersPageComponent_Conditional_20_Template, 18, 1, "div", 12);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.userService.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.userService.loading() ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_2_0 = ctx.userService.error()) ? 15 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.successMessage()) ? 16 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm() ? 17 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.userService.loading() && ctx.userService.users().length === 0 ? 19 : 20);
        } }, dependencies: [CommonModule, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], styles: [".users-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .user-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #f1f5f9; color: #334155; margin-right: 0.3rem; }\n    .badge-admin[_ngcontent-%COMP%] { background: #fee2e2; color: #991b1b; }\n    .badge-treasurer[_ngcontent-%COMP%] { background: #dbeafe; color: #1e40af; }\n    .text-muted[_ngcontent-%COMP%] { color: #64748b; }\n    .text-right[_ngcontent-%COMP%] { text-align: right; }\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary[_ngcontent-%COMP%] { background: #0284c7; color: #fff; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-action-delete[_ngcontent-%COMP%] { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; }\n    .btn-action-delete[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersPageComponent, [{
        type: Component,
        args: [{ selector: 'app-users-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, DatePipe], template: `
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
  `, styles: ["\n    .users-container { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions { display: flex; gap: 0.6rem; align-items: center; }\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .user-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; }\n    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #f1f5f9; color: #334155; margin-right: 0.3rem; }\n    .badge-admin { background: #fee2e2; color: #991b1b; }\n    .badge-treasurer { background: #dbeafe; color: #1e40af; }\n    .text-muted { color: #64748b; }\n    .text-right { text-align: right; }\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary { background: #0284c7; color: #fff; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-action-delete { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; }\n    .btn-action-delete:hover { text-decoration: underline; }\n    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #0284c7; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersPageComponent, { className: "UsersPageComponent", filePath: "src\\app\\pages\\users-page.component.ts", lineNumber: 190 }); })();
//# sourceMappingURL=users-page.component.js.map