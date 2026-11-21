import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BirthdayService } from '../core/services/birthday.service';
import { CommunityService } from '../core/services/community.service';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function BirthdaysPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 22);
    i0.ɵɵtext(1, " Sincronizando... ");
} }
function BirthdaysPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sincronizar ");
} }
function BirthdaysPageComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-dom-bosquinho-state", 23);
    i0.ɵɵlistener("retry", function BirthdaysPageComponent_Conditional_15_Template_app_dom_bosquinho_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.refresh()); })("dismiss", function BirthdaysPageComponent_Conditional_15_Template_app_dom_bosquinho_state_dismiss_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.birthdayService.clearError()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", ctx)("showDismiss", true);
} }
function BirthdaysPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 24);
    i0.ɵɵlistener("click", function BirthdaysPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function BirthdaysPageComponent_Conditional_17_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comm_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", comm_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", comm_r5.name, " ", comm_r5.isMainParish ? "(Matriz)" : "", " ");
} }
function BirthdaysPageComponent_Conditional_17_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 22);
    i0.ɵɵtext(1, " Salvando... ");
} }
function BirthdaysPageComponent_Conditional_17_Conditional_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Aniversariante ");
} }
function BirthdaysPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div", 25)(2, "h3");
    i0.ɵɵtext(3, "Cadastrar Novo Aniversariante");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 24);
    i0.ɵɵlistener("click", function BirthdaysPageComponent_Conditional_17_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 26);
    i0.ɵɵlistener("ngSubmit", function BirthdaysPageComponent_Conditional_17_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitBirthday()); });
    i0.ɵɵelementStart(7, "div", 27)(8, "div", 28)(9, "label", 29);
    i0.ɵɵtext(10, "Nome Completo *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 31)(13, "label", 32);
    i0.ɵɵtext(14, "Comunidade *");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 33)(16, "option", 34);
    i0.ɵɵtext(17, "Selecione a comunidade...");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(18, BirthdaysPageComponent_Conditional_17_For_19_Template, 2, 3, "option", 35, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 31)(21, "label", 36);
    i0.ɵɵtext(22, "Data de Nascimento *");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 37);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 27)(25, "div", 28)(26, "label", 38);
    i0.ɵɵtext(27, "Pastoral / Movimento");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "input", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div", 31)(30, "label", 40);
    i0.ɵɵtext(31, "Telefone / E-mail");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(32, "input", 41);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "div", 42)(34, "button", 43);
    i0.ɵɵlistener("click", function BirthdaysPageComponent_Conditional_17_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleForm()); });
    i0.ɵɵtext(35, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 44);
    i0.ɵɵtemplate(37, BirthdaysPageComponent_Conditional_17_Conditional_37_Template, 2, 0)(38, BirthdaysPageComponent_Conditional_17_Conditional_38_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r1.birthdayForm);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r1.communityService.communities());
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("disabled", ctx_r1.birthdayForm.invalid || ctx_r1.birthdayService.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.birthdayService.loading() ? 37 : 38);
} }
function BirthdaysPageComponent_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "div", 45);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando aniversariantes da comunidade...");
    i0.ɵɵelementEnd()();
} }
function BirthdaysPageComponent_Conditional_49_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1, "Comunidade");
    i0.ɵɵelementEnd();
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1, "\uD83C\uDF82 Parab\u00E9ns Hoje!");
    i0.ɵɵelementEnd();
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "span", 59);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.getCommunityName(item_r6.communityId));
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 54);
    i0.ɵɵtext(1, "Hoje! \uD83C\uDF82");
    i0.ɵɵelementEnd();
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, "Amanh\u00E3!");
    i0.ɵɵelementEnd();
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Em ", item_r6.daysUntilBirthday, " dias");
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Em ", item_r6.daysUntilBirthday, " dias");
} }
function BirthdaysPageComponent_Conditional_49_For_19_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 58);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Em ", item_r6.daysUntilBirthday, " dias");
} }
function BirthdaysPageComponent_Conditional_49_For_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 48)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, BirthdaysPageComponent_Conditional_49_For_19_Conditional_5_Template, 2, 0, "span", 49);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, BirthdaysPageComponent_Conditional_49_For_19_Conditional_6_Template, 3, 1, "td");
    i0.ɵɵelementStart(7, "td", 50)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 51);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td")(15, "strong");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "span", 52);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td", 53);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtemplate(23, BirthdaysPageComponent_Conditional_49_For_19_Conditional_23_Template, 2, 0, "span", 54)(24, BirthdaysPageComponent_Conditional_49_For_19_Conditional_24_Template, 2, 0, "span", 55)(25, BirthdaysPageComponent_Conditional_49_For_19_Conditional_25_Template, 2, 1, "span", 56)(26, BirthdaysPageComponent_Conditional_49_For_19_Conditional_26_Template, 2, 1, "span", 57)(27, BirthdaysPageComponent_Conditional_49_For_19_Conditional_27_Template, 2, 1, "span", 58);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("highlight-today", item_r6.daysUntilBirthday === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r6.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(item_r6.daysUntilBirthday === 0 ? 5 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.communityService.isAll() ? 6 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 11, item_r6.nextBirthday, "dd/MM"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("(", i0.ɵɵpipeBind2(13, 14, item_r6.nextBirthday, "EEEE"), ")");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", item_r6.turningAge, " anos");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r6.ministry || "Comunidade");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r6.contact || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r6.daysUntilBirthday === 0 ? 23 : item_r6.daysUntilBirthday === 1 ? 24 : item_r6.daysUntilBirthday <= 7 ? 25 : item_r6.daysUntilBirthday <= 30 ? 26 : 27);
} }
function BirthdaysPageComponent_Conditional_49_ForEmpty_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 60)(2, "p");
    i0.ɵɵtext(3, "Nenhum aniversariante encontrado para esta comunidade.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r1.communityService.isAll() ? 7 : 6);
} }
function BirthdaysPageComponent_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21)(1, "table", 46)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Nome do Irm\u00E3o(\u00E3)");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, BirthdaysPageComponent_Conditional_49_Conditional_6_Template, 2, 0, "th");
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Pr\u00F3ximo Anivers\u00E1rio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Idade");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Pastoral / Servi\u00E7o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Contato");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Status / Contagem");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "tbody");
    i0.ɵɵrepeaterCreate(18, BirthdaysPageComponent_Conditional_49_For_19_Template, 28, 17, "tr", 47, _forTrack0, false, BirthdaysPageComponent_Conditional_49_ForEmpty_20_Template, 4, 1, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(ctx_r1.communityService.isAll() ? 6 : -1);
    i0.ɵɵadvance(12);
    i0.ɵɵrepeater(ctx_r1.birthdayService.birthdays());
} }
export class BirthdaysPageComponent {
    birthdayService = inject(BirthdayService);
    communityService = inject(CommunityService);
    fb = inject(FormBuilder);
    showForm = signal(false);
    successMessage = signal(null);
    birthdayForm = this.fb.group({
        communityId: ['', Validators.required],
        name: ['', [Validators.required, Validators.minLength(3)]],
        birthDate: ['', Validators.required],
        ministry: ['Pastoral'],
        contact: [''],
    });
    constructor() {
        effect(() => {
            // Reage automaticamente à mudança de comunidade no seletor do header
            const activeId = this.communityService.activeCommunityId();
            this.refresh();
        });
    }
    ngOnInit() {
        this.refresh();
    }
    refresh() {
        const commId = this.communityService.activeCommunityId();
        this.birthdayService.loadBirthdays(commId).subscribe();
    }
    toggleForm() {
        const next = !this.showForm();
        this.showForm.set(next);
        if (next) {
            const activeId = this.communityService.activeCommunityId();
            const defaultCommId = activeId && activeId !== 'ALL'
                ? activeId
                : (this.communityService.communities()[0]?.id || '');
            this.birthdayForm.patchValue({
                communityId: defaultCommId,
                ministry: 'Pastoral',
            });
        }
    }
    getCommunityName(communityId) {
        if (!communityId)
            return 'Matriz';
        const comm = this.communityService.communities().find((c) => c.id === communityId);
        return comm ? comm.name : 'Comunidade';
    }
    submitBirthday() {
        if (this.birthdayForm.invalid) {
            this.birthdayForm.markAllAsTouched();
            return;
        }
        const val = this.birthdayForm.getRawValue();
        const dto = {
            communityId: val.communityId || undefined,
            name: val.name,
            birthDate: val.birthDate,
            ministry: val.ministry || 'Comunidade',
            contact: val.contact || '',
        };
        this.birthdayService.createBirthday(dto).subscribe({
            next: () => {
                this.successMessage.set(`Aniversariante ${dto.name} cadastrado com sucesso!`);
                this.birthdayForm.reset({ ministry: 'Pastoral' });
                this.showForm.set(false);
                this.refresh();
            },
        });
    }
    static ɵfac = function BirthdaysPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BirthdaysPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BirthdaysPageComponent, selectors: [["app-birthdays-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 50, vars: 11, consts: [[1, "birthdays-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "message", "showDismiss"], [1, "alert", "alert-success"], [1, "card", "form-card"], [1, "kpi-strip"], [1, "kpi-card"], [1, "label"], [1, "value", "text-focus"], [1, "hint"], [1, "value", "text-primary"], [1, "value", "text-accent"], [1, "kpi-card", "highlight-card"], [1, "value", "text-party"], [1, "card", "table-card"], [1, "loading-state"], [1, "table-responsive"], [1, "spinner"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "retry", "dismiss", "message", "showDismiss"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "birthday-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field", "flex-2"], ["for", "name"], ["id", "name", "type", "text", "formControlName", "name", "placeholder", "Ex: Maria Auxiliadora"], [1, "field"], ["for", "communityId"], ["id", "communityId", "formControlName", "communityId"], ["value", "", "disabled", ""], [3, "value"], ["for", "birthDate"], ["id", "birthDate", "type", "date", "formControlName", "birthDate"], ["for", "ministry"], ["id", "ministry", "type", "text", "formControlName", "ministry", "placeholder", "Ex: Pastoral do D\u00EDzimo, Coral, Liturgia"], ["for", "contact"], ["id", "contact", "type", "text", "formControlName", "contact", "placeholder", "(11) 98765-4321"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-large"], [1, "data-table"], [3, "highlight-today"], [1, "person-cell"], [1, "badge", "badge-party"], [1, "col-date"], [1, "text-muted", "sub-date"], [1, "badge-ministry"], [1, "text-muted"], [1, "status-badge", "status-today"], [1, "status-badge", "status-tomorrow"], [1, "status-badge", "status-soon"], [1, "status-badge", "status-month"], [1, "status-normal"], [1, "community-tag"], [1, "empty-state"]], template: function BirthdaysPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Pastoral & Comunh\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Aniversariantes da Comunidade");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Celebra\u00E7\u00E3o da vida dos irm\u00E3os, dizimistas e agentes pastorais da par\u00F3quia.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function BirthdaysPageComponent_Template_button_click_10_listener() { return ctx.refresh(); });
            i0.ɵɵtemplate(11, BirthdaysPageComponent_Conditional_11_Template, 2, 0)(12, BirthdaysPageComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function BirthdaysPageComponent_Template_button_click_13_listener() { return ctx.toggleForm(); });
            i0.ɵɵtext(14, " + Novo Aniversariante ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(15, BirthdaysPageComponent_Conditional_15_Template, 1, 2, "app-dom-bosquinho-state", 7)(16, BirthdaysPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, BirthdaysPageComponent_Conditional_17_Template, 39, 3, "section", 9);
            i0.ɵɵelementStart(18, "section", 10)(19, "div", 11)(20, "span", 12);
            i0.ɵɵtext(21, "Comunidade em Foco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "strong", 13);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 14);
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 11)(27, "span", 12);
            i0.ɵɵtext(28, "Total de Aniversariantes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "strong", 15);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 14);
            i0.ɵɵtext(32, "Irm\u00E3os ativos cadastrados");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 11)(34, "span", 12);
            i0.ɵɵtext(35, "Pr\u00F3ximos 30 Dias");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "strong", 16);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 14);
            i0.ɵɵtext(39, "Celebra\u00E7\u00F5es neste m\u00EAs");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 17)(41, "span", 12);
            i0.ɵɵtext(42, "Anivers\u00E1rio Hoje");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "strong", 18);
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span", 14);
            i0.ɵɵtext(46, "\uD83C\uDF82 Que Deus aben\u00E7oe!");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "section", 19);
            i0.ɵɵtemplate(48, BirthdaysPageComponent_Conditional_48_Template, 4, 0, "div", 20)(49, BirthdaysPageComponent_Conditional_49_Template, 21, 2, "div", 21);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            let tmp_5_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.birthdayService.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.birthdayService.loading() ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_2_0 = ctx.birthdayService.error()) ? 15 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.successMessage()) ? 16 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showForm() ? 17 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ((tmp_5_0 = ctx.communityService.activeCommunity()) == null ? null : tmp_5_0.name) || "Vis\u00E3o Geral (Todas)", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.communityService.isAll() ? "Consolidado da Par\u00F3quia" : "Filtrado pela barra superior");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.birthdayService.totalCount());
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.birthdayService.thisMonthBirthdays().length);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.birthdayService.todayBirthdays().length);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.birthdayService.loading() && ctx.birthdayService.birthdays().length === 0 ? 48 : 49);
        } }, dependencies: [CommonModule, i1.DatePipe, FormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, DomBosquinhoStateComponent], styles: [".birthdays-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #ec4899; background: #fdf2f8; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n\n    .kpi-strip[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }\n    .kpi-card[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }\n    .kpi-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; }\n    .kpi-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] { font-size: 1.6rem; font-weight: 700; }\n    .kpi-card[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] { font-size: 0.75rem; color: #94a3b8; }\n    .text-primary[_ngcontent-%COMP%] { color: #0284c7; }\n    .text-accent[_ngcontent-%COMP%] { color: #d97706; }\n    .text-party[_ngcontent-%COMP%] { color: #db2777; }\n    .text-focus[_ngcontent-%COMP%] { color: #0f172a; font-size: 1.25rem !important; }\n    .highlight-card[_ngcontent-%COMP%] { background: #fff5f9; border-color: #fbcfe8; }\n\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .birthday-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; }\n\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .highlight-today[_ngcontent-%COMP%] { background: #fdf2f8; }\n\n    .person-cell[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }\n    .community-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }\n\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; font-size: 0.85rem; }\n    .sub-date[_ngcontent-%COMP%] { font-size: 0.75rem; margin-left: 0.25rem; }\n    .badge-party[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; color: #db2777; background: #fce7f3; padding: 0.2rem 0.5rem; border-radius: 9999px; }\n    .badge-ministry[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; background: #f1f5f9; color: #334155; }\n\n    .status-badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; }\n    .status-today[_ngcontent-%COMP%] { color: #db2777; background: #fce7f3; font-weight: 700; }\n    .status-tomorrow[_ngcontent-%COMP%] { color: #ea580c; background: #ffedd5; font-weight: 700; }\n    .status-soon[_ngcontent-%COMP%] { color: #d97706; background: #fef3c7; }\n    .status-month[_ngcontent-%COMP%] { color: #0284c7; background: #e0f2fe; }\n    .status-normal[_ngcontent-%COMP%] { color: #64748b; font-size: 0.8rem; }\n    .text-muted[_ngcontent-%COMP%] { color: #94a3b8; }\n\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }\n    .btn-primary[_ngcontent-%COMP%] { background: #db2777; color: #fff; }\n    .btn-primary[_ngcontent-%COMP%]:hover { background: #be185d; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-secondary[_ngcontent-%COMP%]:hover { background: #f8fafc; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #db2777; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BirthdaysPageComponent, [{
        type: Component,
        args: [{ selector: 'app-birthdays-page', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe, DomBosquinhoStateComponent], template: `
    <div class="birthdays-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Pastoral & Comunhão</span>
          <h1>Aniversariantes da Comunidade</h1>
          <p class="subtitle">Celebração da vida dos irmãos, dizimistas e agentes pastorais da paróquia.</p>
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
            <h3>Cadastrar Novo Aniversariante</h3>
            <button class="btn-close" (click)="toggleForm()">&times;</button>
          </div>
          <form [formGroup]="birthdayForm" (ngSubmit)="submitBirthday()" class="birthday-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="name">Nome Completo *</label>
                <input id="name" type="text" formControlName="name" placeholder="Ex: Maria Auxiliadora" />
              </div>
              <div class="field">
                <label for="communityId">Comunidade *</label>
                <select id="communityId" formControlName="communityId">
                  <option value="" disabled>Selecione a comunidade...</option>
                  @for (comm of communityService.communities(); track comm.id) {
                    <option [value]="comm.id">
                      {{ comm.name }} {{ comm.isMainParish ? '(Matriz)' : '' }}
                    </option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="birthDate">Data de Nascimento *</label>
                <input id="birthDate" type="date" formControlName="birthDate" />
              </div>
            </div>
            <div class="form-row">
              <div class="field flex-2">
                <label for="ministry">Pastoral / Movimento</label>
                <input id="ministry" type="text" formControlName="ministry" placeholder="Ex: Pastoral do Dízimo, Coral, Liturgia" />
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

      <!-- Faixa de Indicadores (KPIs) -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Comunidade em Foco</span>
          <strong class="value text-focus">
            {{ communityService.activeCommunity()?.name || 'Visão Geral (Todas)' }}
          </strong>
          <span class="hint">{{ communityService.isAll() ? 'Consolidado da Paróquia' : 'Filtrado pela barra superior' }}</span>
        </div>
        <div class="kpi-card">
          <span class="label">Total de Aniversariantes</span>
          <strong class="value text-primary">{{ birthdayService.totalCount() }}</strong>
          <span class="hint">Irmãos ativos cadastrados</span>
        </div>
        <div class="kpi-card">
          <span class="label">Próximos 30 Dias</span>
          <strong class="value text-accent">{{ birthdayService.thisMonthBirthdays().length }}</strong>
          <span class="hint">Celebrações neste mês</span>
        </div>
        <div class="kpi-card highlight-card">
          <span class="label">Aniversário Hoje</span>
          <strong class="value text-party">{{ birthdayService.todayBirthdays().length }}</strong>
          <span class="hint">🎂 Que Deus abençoe!</span>
        </div>
      </section>

      <!-- Tabela / Lista de Aniversários -->
      <section class="card table-card">
        @if (birthdayService.loading() && birthdayService.birthdays().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando aniversariantes da comunidade...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Nome do Irmão(ã)</th>
                  @if (communityService.isAll()) {
                    <th>Comunidade</th>
                  }
                  <th>Próximo Aniversário</th>
                  <th>Idade</th>
                  <th>Pastoral / Serviço</th>
                  <th>Contato</th>
                  <th>Status / Contagem</th>
                </tr>
              </thead>
              <tbody>
                @for (item of birthdayService.birthdays(); track item.id) {
                  <tr [class.highlight-today]="item.daysUntilBirthday === 0">
                    <td>
                      <div class="person-cell">
                        <strong>{{ item.name }}</strong>
                        @if (item.daysUntilBirthday === 0) {
                          <span class="badge badge-party">🎂 Parabéns Hoje!</span>
                        }
                      </div>
                    </td>
                    @if (communityService.isAll()) {
                      <td>
                        <span class="community-tag">{{ getCommunityName(item.communityId) }}</span>
                      </td>
                    }
                    <td class="col-date">
                      <strong>{{ item.nextBirthday | date:'dd/MM' }}</strong>
                      <span class="text-muted sub-date">({{ item.nextBirthday | date:'EEEE' }})</span>
                    </td>
                    <td><strong>{{ item.turningAge }} anos</strong></td>
                    <td><span class="badge-ministry">{{ item.ministry || 'Comunidade' }}</span></td>
                    <td class="text-muted">{{ item.contact || '-' }}</td>
                    <td>
                      @if (item.daysUntilBirthday === 0) {
                        <span class="status-badge status-today">Hoje! 🎂</span>
                      } @else if (item.daysUntilBirthday === 1) {
                        <span class="status-badge status-tomorrow">Amanhã!</span>
                      } @else if (item.daysUntilBirthday <= 7) {
                        <span class="status-badge status-soon">Em {{ item.daysUntilBirthday }} dias</span>
                      } @else if (item.daysUntilBirthday <= 30) {
                        <span class="status-badge status-month">Em {{ item.daysUntilBirthday }} dias</span>
                      } @else {
                        <span class="status-normal">Em {{ item.daysUntilBirthday }} dias</span>
                      }
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td [attr.colspan]="communityService.isAll() ? 7 : 6" class="empty-state">
                      <p>Nenhum aniversariante encontrado para esta comunidade.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `, styles: ["\n    .birthdays-container { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #ec4899; background: #fdf2f8; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions { display: flex; gap: 0.6rem; align-items: center; }\n\n    .kpi-strip { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }\n    .kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }\n    .kpi-card .label { font-size: 0.8rem; font-weight: 600; color: #64748b; text-transform: uppercase; }\n    .kpi-card .value { font-size: 1.6rem; font-weight: 700; }\n    .kpi-card .hint { font-size: 0.75rem; color: #94a3b8; }\n    .text-primary { color: #0284c7; }\n    .text-accent { color: #d97706; }\n    .text-party { color: #db2777; }\n    .text-focus { color: #0f172a; font-size: 1.25rem !important; }\n    .highlight-card { background: #fff5f9; border-color: #fbcfe8; }\n\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .birthday-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }\n\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.85rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .highlight-today { background: #fdf2f8; }\n\n    .person-cell { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }\n    .community-tag { font-size: 0.75rem; font-weight: 600; color: #0369a1; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid #e0f2fe; }\n\n    .col-date { white-space: nowrap; font-size: 0.85rem; }\n    .sub-date { font-size: 0.75rem; margin-left: 0.25rem; }\n    .badge-party { font-size: 0.75rem; font-weight: 700; color: #db2777; background: #fce7f3; padding: 0.2rem 0.5rem; border-radius: 9999px; }\n    .badge-ministry { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; background: #f1f5f9; color: #334155; }\n\n    .status-badge { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.55rem; border-radius: 9999px; display: inline-flex; align-items: center; }\n    .status-today { color: #db2777; background: #fce7f3; font-weight: 700; }\n    .status-tomorrow { color: #ea580c; background: #ffedd5; font-weight: 700; }\n    .status-soon { color: #d97706; background: #fef3c7; }\n    .status-month { color: #0284c7; background: #e0f2fe; }\n    .status-normal { color: #64748b; font-size: 0.8rem; }\n    .text-muted { color: #94a3b8; }\n\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; transition: background 0.15s ease; }\n    .btn-primary { background: #db2777; color: #fff; }\n    .btn-primary:hover { background: #be185d; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-secondary:hover { background: #f8fafc; }\n    .btn-close { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #94a3b8; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #db2777; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BirthdaysPageComponent, { className: "BirthdaysPageComponent", filePath: "src\\app\\pages\\birthdays-page.component.ts", lineNumber: 275 }); })();
//# sourceMappingURL=birthdays-page.component.js.map