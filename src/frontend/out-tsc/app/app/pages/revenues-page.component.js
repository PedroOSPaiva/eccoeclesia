import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { RevenueService } from '../core/services/revenue.service';
import { CommunityService } from '../core/services/community.service';
import { MemberService } from '../core/services/member.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function RevenuesPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 18);
    i0.ɵɵtext(1, " Sincronizando... ");
} }
function RevenuesPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sincronizar ");
} }
function RevenuesPageComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 19);
    i0.ɵɵlistener("click", function RevenuesPageComponent_Conditional_15_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.revenueService.clearError()); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function RevenuesPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 19);
    i0.ɵɵlistener("click", function RevenuesPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function RevenuesPageComponent_Conditional_17_Conditional_30_For_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const steward_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", steward_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", steward_r5.name, " ", steward_r5.phone ? "\u2022 " + steward_r5.phone : "", " ");
} }
function RevenuesPageComponent_Conditional_17_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36)(1, "div", 23)(2, "label", 40)(3, "span");
    i0.ɵɵtext(4, "\u2B50 Dizimista Vinculado");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small", 41);
    i0.ɵɵtext(6, "(Carregando dizimistas ativos da comunidade)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "select", 42)(8, "option", 43);
    i0.ɵɵtext(9, "Selecione o dizimista (ou deixe vazio para an\u00F4nimo / livro geral)...");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(10, RevenuesPageComponent_Conditional_17_Conditional_30_For_11_Template, 2, 3, "option", 44, _forTrack0);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵrepeater(ctx_r1.activeStewards());
} }
function RevenuesPageComponent_Conditional_17_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 18);
    i0.ɵɵtext(1, " Salvando... ");
} }
function RevenuesPageComponent_Conditional_17_Conditional_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Receita ");
} }
function RevenuesPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div", 20)(2, "h3");
    i0.ɵɵtext(3, "Nova Receita");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 19);
    i0.ɵɵlistener("click", function RevenuesPageComponent_Conditional_17_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNewRevenueForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 21);
    i0.ɵɵlistener("ngSubmit", function RevenuesPageComponent_Conditional_17_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitRevenue()); });
    i0.ɵɵelementStart(7, "div", 22)(8, "div", 23)(9, "label", 24);
    i0.ɵɵtext(10, "Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 26)(13, "label", 27);
    i0.ɵɵtext(14, "Valor (R$)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 26)(17, "label", 29);
    i0.ɵɵtext(18, "Categoria");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 30)(20, "option", 31);
    i0.ɵɵtext(21, "D\u00EDzimo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "option", 32);
    i0.ɵɵtext(23, "Oferta");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "option", 33);
    i0.ɵɵtext(25, "Doa\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "option", 34);
    i0.ɵɵtext(27, "Evento / Quermesse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "option", 35);
    i0.ɵɵtext(29, "Outros");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(30, RevenuesPageComponent_Conditional_17_Conditional_30_Template, 12, 0, "div", 36);
    i0.ɵɵelementStart(31, "div", 37)(32, "button", 38);
    i0.ɵɵlistener("click", function RevenuesPageComponent_Conditional_17_Template_button_click_32_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNewRevenueForm()); });
    i0.ɵɵtext(33, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 39);
    i0.ɵɵtemplate(35, RevenuesPageComponent_Conditional_17_Conditional_35_Template, 2, 0)(36, RevenuesPageComponent_Conditional_17_Conditional_36_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r1.revenueForm);
    i0.ɵɵadvance(24);
    i0.ɵɵconditional(ctx_r1.isTitheCategory() ? 30 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.revenueForm.invalid || ctx_r1.revenueService.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.revenueService.loading() ? 35 : 36);
} }
function RevenuesPageComponent_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "div", 45);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando receitas...");
    i0.ɵɵelementEnd()();
} }
function RevenuesPageComponent_Conditional_29_For_18_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2B50 ", ctx_r1.getMemberName(item_r7.memberId), " ");
} }
function RevenuesPageComponent_Conditional_29_For_18_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function RevenuesPageComponent_Conditional_29_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtemplate(5, RevenuesPageComponent_Conditional_29_For_18_Conditional_5_Template, 2, 1, "span", 48)(6, RevenuesPageComponent_Conditional_29_For_18_Conditional_6_Template, 2, 0, "span", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td")(8, "span", 50);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 51);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 52);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 47)(17, "button", 53);
    i0.ɵɵlistener("click", function RevenuesPageComponent_Conditional_29_For_18_Template_button_click_17_listener() { const item_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteItem(item_r7.id)); });
    i0.ɵɵtext(18, " Excluir ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r7.description);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(item_r7.memberId ? 5 : 6);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r7.category || "Geral");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 5, item_r7.createdAt, "dd/MM/yyyy HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" + ", i0.ɵɵpipeBind4(15, 8, item_r7.amount, "BRL", "symbol", "1.2-2"), " ");
} }
function RevenuesPageComponent_Conditional_29_ForEmpty_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 54)(2, "p");
    i0.ɵɵtext(3, "Nenhuma receita registrada at\u00E9 o momento.");
    i0.ɵɵelementEnd()()();
} }
function RevenuesPageComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17)(1, "table", 46)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Dizimista / Vinculado");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Categoria");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Data Registro");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 47);
    i0.ɵɵtext(13, "Valor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 47);
    i0.ɵɵtext(15, "A\u00E7\u00F5es");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵrepeaterCreate(17, RevenuesPageComponent_Conditional_29_For_18_Template, 19, 13, "tr", null, _forTrack0, false, RevenuesPageComponent_Conditional_29_ForEmpty_19_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(ctx_r1.revenueService.revenues());
} }
export class RevenuesPageComponent {
    revenueService = inject(RevenueService);
    communityService = inject(CommunityService);
    memberService = inject(MemberService);
    fb = inject(FormBuilder);
    showNewForm = signal(false);
    successMessage = signal(null);
    revenueForm = this.fb.group({
        description: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.min(0.01)]],
        category: ['Dízimo', Validators.required],
        memberId: [''],
    });
    // Reatividade em tempo real às mudanças de seleção do formulário
    categoryValue = toSignal(this.revenueForm.get('category').valueChanges, { initialValue: 'Dízimo' });
    // Dizimistas ativos disponíveis para vínculo
    activeStewards = computed(() => {
        return this.memberService.members().filter((m) => (m.status === 'ACTIVE' || m.status === 'ATIVO') &&
            (m.isSteward || (m.ministry && m.ministry.toLowerCase().includes('dízim'))));
    });
    // SÓ e SOMENTE se Categoria for Dízimo
    isTitheCategory = computed(() => {
        return this.categoryValue() === 'Dízimo';
    });
    constructor() {
        // Reage automaticamente à mudança da comunidade ativa no header
        effect(() => {
            const activeId = this.communityService.activeCommunityId();
            this.revenueService.loadRevenues().subscribe();
            this.memberService.loadMembers(activeId).subscribe();
        });
        // Se a categoria mudar para qualquer valor diferente de Dízimo, limpa a seleção de dizimista
        effect(() => {
            if (!this.isTitheCategory()) {
                this.revenueForm.patchValue({ memberId: '' }, { emitEvent: false });
            }
        });
    }
    ngOnInit() {
        const activeId = this.communityService.activeCommunityId();
        this.revenueService.loadRevenues().subscribe();
        this.memberService.loadMembers(activeId).subscribe();
    }
    refresh() {
        const activeId = this.communityService.activeCommunityId();
        this.revenueService.loadRevenues().subscribe();
        this.memberService.loadMembers(activeId).subscribe();
    }
    toggleNewRevenueForm() {
        this.showNewForm.update((v) => !v);
    }
    submitRevenue() {
        if (this.revenueForm.invalid) {
            this.revenueForm.markAllAsTouched();
            return;
        }
        const val = this.revenueForm.getRawValue();
        const isTithe = val.category === 'Dízimo';
        const dto = {
            description: val.description,
            amount: Number(val.amount),
            category: val.category || undefined,
            memberId: (isTithe && val.memberId) ? val.memberId : undefined,
        };
        this.revenueService.createRevenue(dto).subscribe({
            next: () => {
                this.successMessage.set('Receita registrada com sucesso!');
                this.revenueForm.reset({ category: 'Dízimo', memberId: '' });
                this.showNewForm.set(false);
            },
        });
    }
    deleteItem(id) {
        if (confirm('Deseja realmente remover esta receita?')) {
            this.revenueService.deleteRevenue(id).subscribe({
                next: () => this.successMessage.set('Receita removida com sucesso!'),
            });
        }
    }
    getMemberName(memberId) {
        if (!memberId)
            return '';
        const m = this.memberService.members().find((item) => item.id === memberId);
        return m ? m.name : 'Dizimista Vinculado';
    }
    static ɵfac = function RevenuesPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RevenuesPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RevenuesPageComponent, selectors: [["app-revenues-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 30, vars: 13, consts: [[1, "revenues-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "alert", "alert-error"], [1, "alert", "alert-success"], [1, "card", "form-card"], [1, "kpi-strip"], [1, "kpi-card"], [1, "label"], [1, "value", "text-income"], [1, "hint"], [1, "card", "table-card"], [1, "loading-state"], [1, "table-responsive"], [1, "spinner"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "revenue-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field", "flex-2"], ["for", "description"], ["id", "description", "type", "text", "formControlName", "description", "placeholder", "Ex: D\u00EDzimo ofertado na missa dominical"], [1, "field"], ["for", "amount"], ["id", "amount", "type", "number", "step", "0.01", "formControlName", "amount", "placeholder", "0.00"], ["for", "category"], ["id", "category", "formControlName", "category"], ["value", "D\u00EDzimo"], ["value", "Oferta"], ["value", "Doa\u00E7\u00E3o"], ["value", "Evento"], ["value", "Outros"], [1, "form-row", "highlight-box"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["for", "memberId"], [1, "label-hint"], ["id", "memberId", "formControlName", "memberId"], ["value", ""], [3, "value"], [1, "spinner-large"], [1, "data-table"], [1, "text-right"], [1, "badge", "badge-steward"], [1, "text-muted"], [1, "badge"], [1, "col-date"], [1, "text-right", "col-amount", "text-income"], ["type", "button", "title", "Remover receita", 1, "btn-action-delete", 3, "click"], ["colspan", "6", 1, "empty-state"]], template: function RevenuesPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Entradas & D\u00EDzimos");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Controle de Receitas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Gest\u00E3o de d\u00EDzimos, ofertas, campanhas e doa\u00E7\u00F5es da comunidade.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function RevenuesPageComponent_Template_button_click_10_listener() { return ctx.refresh(); });
            i0.ɵɵtemplate(11, RevenuesPageComponent_Conditional_11_Template, 2, 0)(12, RevenuesPageComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function RevenuesPageComponent_Template_button_click_13_listener() { return ctx.toggleNewRevenueForm(); });
            i0.ɵɵtext(14, " + Registrar Receita ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(15, RevenuesPageComponent_Conditional_15_Template, 5, 1, "div", 7)(16, RevenuesPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, RevenuesPageComponent_Conditional_17_Template, 37, 4, "section", 9);
            i0.ɵɵelementStart(18, "section", 10)(19, "div", 11)(20, "span", 12);
            i0.ɵɵtext(21, "Total de Receitas Arrecadadas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "strong", 13);
            i0.ɵɵtext(23);
            i0.ɵɵpipe(24, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "span", 14);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "section", 15);
            i0.ɵɵtemplate(28, RevenuesPageComponent_Conditional_28_Template, 4, 0, "div", 16)(29, RevenuesPageComponent_Conditional_29_Template, 20, 1, "div", 17);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.revenueService.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.revenueService.loading() ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_2_0 = ctx.revenueService.error()) ? 15 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.successMessage()) ? 16 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showNewForm() ? 17 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(24, 8, ctx.revenueService.totalAmount(), "BRL", "symbol", "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.revenueService.count(), " entrada(s) ativa(s)");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.revenueService.loading() && ctx.revenueService.revenues().length === 0 ? 28 : 29);
        } }, dependencies: [CommonModule, i1.CurrencyPipe, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName], styles: [".revenues-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #ecfdf5; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .revenue-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .highlight-box[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem 1rem; }\n    .label-hint[_ngcontent-%COMP%] { font-weight: normal; color: #64748b; margin-left: 0.5rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .kpi-strip[_ngcontent-%COMP%] { display: flex; }\n    .kpi-card[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-left: 4px solid #10b981; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; min-width: 250px; }\n    .kpi-card[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }\n    .kpi-card[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] { font-size: 1.5rem; font-weight: 700; }\n    .kpi-card[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] { font-size: 0.75rem; color: #94a3b8; }\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #ecfdf5; color: #065f46; }\n    .badge-steward[_ngcontent-%COMP%] { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; display: inline-flex; align-items: center; gap: 0.25rem; }\n    .text-income[_ngcontent-%COMP%] { color: #059669; }\n    .text-muted[_ngcontent-%COMP%] { color: #94a3b8; }\n    .text-right[_ngcontent-%COMP%] { text-align: right; }\n    .col-amount[_ngcontent-%COMP%] { font-weight: 600; font-variant-numeric: tabular-nums; }\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary[_ngcontent-%COMP%] { background: #059669; color: #fff; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-action-delete[_ngcontent-%COMP%] { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.4rem; }\n    .btn-action-delete[_ngcontent-%COMP%]:hover { text-decoration: underline; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #059669; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RevenuesPageComponent, [{
        type: Component,
        args: [{ selector: 'app-revenues-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, CurrencyPipe, DatePipe], template: `
    <div class="revenues-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Entradas & Dízimos</span>
          <h1>Controle de Receitas</h1>
          <p class="subtitle">Gestão de dízimos, ofertas, campanhas e doações da comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="refresh()" [disabled]="revenueService.loading()">
            @if (revenueService.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Sincronizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleNewRevenueForm()">
            + Registrar Receita
          </button>
        </div>
      </header>

      @if (revenueService.error(); as err) {
        <div class="alert alert-error">
          <span>{{ err }}</span>
          <button class="btn-close" (click)="revenueService.clearError()">&times;</button>
        </div>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Nova Receita -->
      @if (showNewForm()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Nova Receita</h3>
            <button class="btn-close" (click)="toggleNewRevenueForm()">&times;</button>
          </div>
          <form [formGroup]="revenueForm" (ngSubmit)="submitRevenue()" class="revenue-form">
            <div class="form-row">
              <div class="field flex-2">
                <label for="description">Descrição</label>
                <input id="description" type="text" formControlName="description" placeholder="Ex: Dízimo ofertado na missa dominical" />
              </div>
              <div class="field">
                <label for="amount">Valor (R$)</label>
                <input id="amount" type="number" step="0.01" formControlName="amount" placeholder="0.00" />
              </div>
              <div class="field">
                <label for="category">Categoria</label>
                <select id="category" formControlName="category">
                  <option value="Dízimo">Dízimo</option>
                  <option value="Oferta">Oferta</option>
                  <option value="Doação">Doação</option>
                  <option value="Evento">Evento / Quermesse</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
            </div>

            <!-- Campo Condicional: Dizimista Ativo (SÓ e SOMENTE se Categoria = Dízimo) -->
            @if (isTitheCategory()) {
              <div class="form-row highlight-box">
                <div class="field flex-2">
                  <label for="memberId">
                    <span>⭐ Dizimista Vinculado</span>
                    <small class="label-hint">(Carregando dizimistas ativos da comunidade)</small>
                  </label>
                  <select id="memberId" formControlName="memberId">
                    <option value="">Selecione o dizimista (ou deixe vazio para anônimo / livro geral)...</option>
                    @for (steward of activeStewards(); track steward.id) {
                      <option [value]="steward.id">
                        {{ steward.name }} {{ steward.phone ? '• ' + steward.phone : '' }}
                      </option>
                    }
                  </select>
                </div>
              </div>
            }

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleNewRevenueForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="revenueForm.invalid || revenueService.loading()">
                @if (revenueService.loading()) {
                  <span class="spinner"></span> Salvando...
                } @else {
                  Salvar Receita
                }
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Card de Resumo -->
      <section class="kpi-strip">
        <div class="kpi-card">
          <span class="label">Total de Receitas Arrecadadas</span>
          <strong class="value text-income">{{ revenueService.totalAmount() | currency:'BRL':'symbol':'1.2-2' }}</strong>
          <span class="hint">{{ revenueService.count() }} entrada(s) ativa(s)</span>
        </div>
      </section>

      <!-- Tabela de Receitas -->
      <section class="card table-card">
        @if (revenueService.loading() && revenueService.revenues().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando receitas...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Dizimista / Vinculado</th>
                  <th>Categoria</th>
                  <th>Data Registro</th>
                  <th class="text-right">Valor</th>
                  <th class="text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                @for (item of revenueService.revenues(); track item.id) {
                  <tr>
                    <td><strong>{{ item.description }}</strong></td>
                    <td>
                      @if (item.memberId) {
                        <span class="badge badge-steward">
                          ⭐ {{ getMemberName(item.memberId) }}
                        </span>
                      } @else {
                        <span class="text-muted">-</span>
                      }
                    </td>
                    <td>
                      <span class="badge">{{ item.category || 'Geral' }}</span>
                    </td>
                    <td class="col-date">{{ item.createdAt | date:'dd/MM/yyyy HH:mm' }}</td>
                    <td class="text-right col-amount text-income">
                      + {{ item.amount | currency:'BRL':'symbol':'1.2-2' }}
                    </td>
                    <td class="text-right">
                      <button type="button" class="btn-action-delete" (click)="deleteItem(item.id)" title="Remover receita">
                        Excluir
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="empty-state">
                      <p>Nenhuma receita registrada até o momento.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `, styles: ["\n    .revenues-container { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #ecfdf5; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions { display: flex; gap: 0.6rem; align-items: center; }\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .revenue-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .highlight-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem 1rem; }\n    .label-hint { font-weight: normal; color: #64748b; margin-left: 0.5rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 150px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .kpi-strip { display: flex; }\n    .kpi-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; border-left: 4px solid #10b981; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; min-width: 250px; }\n    .kpi-card .label { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }\n    .kpi-card .value { font-size: 1.5rem; font-weight: 700; }\n    .kpi-card .hint { font-size: 0.75rem; color: #94a3b8; }\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .col-date { white-space: nowrap; color: #64748b; font-size: 0.8rem; }\n    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; background: #ecfdf5; color: #065f46; }\n    .badge-steward { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; display: inline-flex; align-items: center; gap: 0.25rem; }\n    .text-income { color: #059669; }\n    .text-muted { color: #94a3b8; }\n    .text-right { text-align: right; }\n    .col-amount { font-weight: 600; font-variant-numeric: tabular-nums; }\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary { background: #059669; color: #fff; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-action-delete { background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.8rem; font-weight: 600; padding: 0.2rem 0.4rem; }\n    .btn-action-delete:hover { text-decoration: underline; }\n    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #059669; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RevenuesPageComponent, { className: "RevenuesPageComponent", filePath: "src\\app\\pages\\revenues-page.component.ts", lineNumber: 233 }); })();
//# sourceMappingURL=revenues-page.component.js.map