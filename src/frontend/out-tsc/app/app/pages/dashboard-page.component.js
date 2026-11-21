import { Component, computed, effect, inject, input, signal, } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LedgerService } from '../core/services/ledger.service';
import { CommunityService } from '../core/services/community.service';
import { CHART_OF_ACCOUNTS } from '../core/models/chart-of-accounts';
import { FinanceChartComponent } from '../shared/components/finance-chart.component';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.code;
const _forTrack1 = ($index, $item) => $item.id;
function DashboardPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 40);
    i0.ɵɵtext(1, " Atualizando... ");
} }
function DashboardPageComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 8);
    i0.ɵɵelement(1, "path", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, " Sincronizar Raz\u00E3o ");
} }
function DashboardPageComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-dom-bosquinho-state", 42);
    i0.ɵɵlistener("retry", function DashboardPageComponent_Conditional_19_Template_app_dom_bosquinho_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRefresh()); })("dismiss", function DashboardPageComponent_Conditional_19_Template_app_dom_bosquinho_state_dismiss_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.ledger.clearError()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", ctx)("showDismiss", true);
} }
function DashboardPageComponent_Conditional_20_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function DashboardPageComponent_Conditional_20_For_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 59);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const acc_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", acc_r4.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(acc_r4.name);
} }
function DashboardPageComponent_Conditional_20_Conditional_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 40);
    i0.ɵɵtext(1, " Salvando... ");
} }
function DashboardPageComponent_Conditional_20_Conditional_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Confirmar Lan\u00E7amento ");
} }
function DashboardPageComponent_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 12)(1, "div", 43)(2, "h3");
    i0.ɵɵtext(3, "Registrar Lan\u00E7amento no Raz\u00E3o Cont\u00E1bil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 44);
    i0.ɵɵlistener("click", function DashboardPageComponent_Conditional_20_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleCreateModal()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, DashboardPageComponent_Conditional_20_Conditional_6_Template, 2, 1, "div", 45);
    i0.ɵɵelementStart(7, "form", 46);
    i0.ɵɵlistener("ngSubmit", function DashboardPageComponent_Conditional_20_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitNewEntry()); });
    i0.ɵɵelementStart(8, "div", 47)(9, "label", 48);
    i0.ɵɵtext(10, "Natureza Cont\u00E1bil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 49);
    i0.ɵɵlistener("change", function DashboardPageComponent_Conditional_20_Template_select_change_11_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTypeChange()); });
    i0.ɵɵelementStart(12, "option", 50);
    i0.ɵɵtext(13, "Receita (Entrada)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 51);
    i0.ɵɵtext(15, "Despesa (Sa\u00EDda)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 47)(17, "label", 52);
    i0.ɵɵtext(18, "Valor (R$)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "input", 53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 54)(21, "label", 55);
    i0.ɵɵtext(22, "Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "input", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 47)(25, "label", 57);
    i0.ɵɵtext(26, "Conta Cont\u00E1bil (Plano de Contas)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "select", 58);
    i0.ɵɵrepeaterCreate(28, DashboardPageComponent_Conditional_20_For_29_Template, 2, 2, "option", 59, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 47)(31, "label", 60);
    i0.ɵɵtext(32, "Centro de Custo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 47)(35, "label", 62);
    i0.ɵɵtext(36, "C\u00F3d. Refer\u00EAncia (Doc/Recibo)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(37, "input", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 47)(39, "label", 64);
    i0.ɵɵtext(40, "Data do Lan\u00E7amento");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(41, "input", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "div", 66)(43, "button", 67);
    i0.ɵɵlistener("click", function DashboardPageComponent_Conditional_20_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleCreateModal()); });
    i0.ɵɵtext(44, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "button", 68);
    i0.ɵɵtemplate(46, DashboardPageComponent_Conditional_20_Conditional_46_Template, 2, 0)(47, DashboardPageComponent_Conditional_20_Conditional_47_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.actionSuccess()) ? 6 : -1, tmp_1_0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.entryForm);
    i0.ɵɵadvance(21);
    i0.ɵɵrepeater(ctx_r1.currentAccountOptions());
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("disabled", ctx_r1.entryForm.invalid || ctx_r1.ledger.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.ledger.loading() ? 46 : 47);
} }
function DashboardPageComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1, "Super\u00E1vit");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_Conditional_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1, "D\u00E9ficit");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_Conditional_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵelement(1, "div", 69);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando registros do livro raz\u00E3o...");
    i0.ɵɵelementEnd()();
} }
function DashboardPageComponent_Conditional_81_For_18_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 76);
    i0.ɵɵtext(1, "Receita");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_Conditional_81_For_18_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1, "Despesa");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_Conditional_81_For_18_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " + ");
} }
function DashboardPageComponent_Conditional_81_For_18_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " - ");
} }
function DashboardPageComponent_Conditional_81_For_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 72);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td")(5, "span", 73);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small", 74);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td", 75)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtemplate(15, DashboardPageComponent_Conditional_81_For_18_Conditional_15_Template, 2, 0, "span", 76)(16, DashboardPageComponent_Conditional_81_For_18_Conditional_16_Template, 2, 0, "span", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td", 78);
    i0.ɵɵtemplate(18, DashboardPageComponent_Conditional_81_For_18_Conditional_18_Template, 1, 0)(19, DashboardPageComponent_Conditional_81_For_18_Conditional_19_Template, 1, 0);
    i0.ɵɵtext(20);
    i0.ɵɵpipe(21, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 12, entry_r6.occurredOn, "dd/MM/yyyy"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(entry_r6.accountCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r6.referenceCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r6.costCenter);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entry_r6.description);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r6.type === "INCOME" ? 15 : 16);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("text-income", entry_r6.type === "INCOME")("text-expense", entry_r6.type === "EXPENSE");
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r6.type === "INCOME" ? 18 : 19);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(21, 15, entry_r6.amount, "BRL", "symbol", "1.2-2"), " ");
} }
function DashboardPageComponent_Conditional_81_ForEmpty_19_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 79)(2, "div", 80);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 81);
    i0.ɵɵelement(4, "rect", 82)(5, "line", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(6, "h4");
    i0.ɵɵtext(7, "Nenhum lan\u00E7amento cont\u00E1bil encontrado");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9, "N\u00E3o h\u00E1 movimenta\u00E7\u00F5es para os crit\u00E9rios de busca atuais.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 84);
    i0.ɵɵlistener("click", function DashboardPageComponent_Conditional_81_ForEmpty_19_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleCreateModal()); });
    i0.ɵɵtext(11, " Registrar o Primeiro Lan\u00E7amento ");
    i0.ɵɵelementEnd()()()();
} }
function DashboardPageComponent_Conditional_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "table", 70)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Conta & Refer\u00EAncia");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Centro de Custo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Natureza");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 71);
    i0.ɵɵtext(15, "Valor");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "tbody");
    i0.ɵɵrepeaterCreate(17, DashboardPageComponent_Conditional_81_For_18_Template, 22, 20, "tr", null, _forTrack1, false, DashboardPageComponent_Conditional_81_ForEmpty_19_Template, 12, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵrepeater(ctx_r1.ledger.recentEntries());
} }
export class DashboardPageComponent {
    ledger = inject(LedgerService);
    communityService = inject(CommunityService);
    fb = inject(FormBuilder);
    // Injeção automática de query params/route params graças ao withComponentInputBinding()
    start = input();
    end = input();
    // Estado local para controle do modal/card de novo lançamento
    showCreateModal = signal(false);
    actionSuccess = signal(null);
    currentNature = signal('INCOME');
    // Opções do plano de contas filtradas pela natureza selecionada
    currentAccountOptions = computed(() => {
        const nature = this.currentNature();
        return CHART_OF_ACCOUNTS.filter((acc) => acc.nature === nature);
    });
    constructor() {
        // Reage automaticamente à mudança da comunidade ativa no header
        effect(() => {
            const _ = this.communityService.activeCommunityId();
            this.ledger.loadEntries(this.start(), this.end()).subscribe();
        });
    }
    // Formulário reativo para criação rápida de lançamento contábil
    entryForm = this.fb.group({
        type: ['INCOME', [Validators.required]],
        accountCode: ['1.1.01', [Validators.required]],
        referenceCode: ['REC-' + Math.floor(1000 + Math.random() * 9000), [Validators.required]],
        costCenter: ['Geral', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.min(0.01)]],
        occurredOn: [new Date().toISOString().substring(0, 10), [Validators.required]],
    });
    // Data atual formatada para exibição no topo
    today = new Date();
    ngOnInit() {
        // Carrega dados iniciais considerando eventuais parâmetros de rota
        this.ledger.loadEntries(this.start(), this.end()).subscribe();
    }
    onTypeChange() {
        const nextType = this.entryForm.get('type')?.value;
        this.currentNature.set(nextType);
        if (nextType === 'INCOME') {
            this.entryForm.patchValue({
                accountCode: '1.1.01',
                referenceCode: 'REC-' + Math.floor(1000 + Math.random() * 9000),
            });
        }
        else {
            this.entryForm.patchValue({
                accountCode: '2.1.01',
                referenceCode: 'DESP-' + Math.floor(1000 + Math.random() * 9000),
            });
        }
    }
    onRefresh() {
        this.ledger.refresh();
    }
    onFilterChange(type) {
        this.ledger.setFilterType(type);
    }
    toggleCreateModal() {
        this.showCreateModal.update((v) => !v);
        this.actionSuccess.set(null);
    }
    submitNewEntry() {
        if (this.entryForm.invalid) {
            this.entryForm.markAllAsTouched();
            return;
        }
        const formVal = this.entryForm.getRawValue();
        const dto = {
            type: formVal.type,
            accountCode: formVal.accountCode,
            referenceCode: formVal.referenceCode,
            costCenter: formVal.costCenter,
            description: formVal.description,
            amount: Number(formVal.amount),
            occurredOn: formVal.occurredOn,
        };
        this.ledger.createEntry(dto).subscribe({
            next: () => {
                this.actionSuccess.set('Lançamento registrado com sucesso no Razão!');
                this.entryForm.patchValue({
                    description: '',
                    amount: '',
                    referenceCode: (this.currentNature() === 'INCOME' ? 'REC-' : 'DESP-') + Math.floor(1000 + Math.random() * 9000),
                });
                setTimeout(() => {
                    this.showCreateModal.set(false);
                    this.actionSuccess.set(null);
                }, 1200);
            },
        });
    }
    static ɵfac = function DashboardPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPageComponent, selectors: [["app-dashboard-page"]], inputs: { start: [1, "start"], end: [1, "end"] }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 90, vars: 44, consts: [[1, "dashboard-wrapper"], [1, "dashboard-header"], [1, "header-titles"], [1, "badge-portal"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn-primary", 3, "click"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "icon"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "message", "showDismiss"], [1, "card", "modal-card"], [1, "kpi-grid"], [1, "card", "kpi-card"], [1, "kpi-top"], [1, "kpi-label"], [1, "status-pill", "status-positive"], [1, "status-pill", "status-negative"], [1, "kpi-value"], [1, "kpi-footer"], [1, "icon-indicator", "icon-up"], [1, "kpi-value", "text-income"], [1, "icon-indicator", "icon-down"], [1, "kpi-value", "text-expense"], [1, "icon-indicator"], [1, "kpi-value", "text-muted"], [3, "totalIncome", "totalExpense"], [1, "card", "table-card"], [1, "table-header"], [1, "section-desc"], [1, "filter-pills"], ["type", "button", 1, "pill", 3, "click"], [1, "loading-state"], [1, "table-responsive"], [1, "table-footer"], [1, "footer-info"], [1, "footer-links"], ["routerLink", "/ledger", 1, "link-action"], ["routerLink", "/reports", 1, "link-action"], [1, "spinner"], ["d", "M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "retry", "dismiss", "message", "showDismiss"], [1, "modal-header"], ["type", "button", 1, "btn-close", 3, "click"], [1, "alert", "alert-success"], [1, "entry-form-grid", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "type"], ["id", "type", "formControlName", "type", 3, "change"], ["value", "INCOME"], ["value", "EXPENSE"], ["for", "amount"], ["id", "amount", "type", "number", "step", "0.01", "formControlName", "amount", "placeholder", "0.00"], [1, "form-group", "span-2"], ["for", "description"], ["id", "description", "type", "text", "formControlName", "description", "placeholder", "Ex: D\u00EDzimo paroquial, Manuten\u00E7\u00E3o predial"], ["for", "accountCode"], ["id", "accountCode", "formControlName", "accountCode"], [3, "value"], ["for", "costCenter"], ["id", "costCenter", "type", "text", "formControlName", "costCenter", "placeholder", "Ex: Pastoral, Matriz"], ["for", "referenceCode"], ["id", "referenceCode", "type", "text", "formControlName", "referenceCode", "placeholder", "Ex: REC-1024, NF-3450"], ["for", "occurredOn"], ["id", "occurredOn", "type", "date", "formControlName", "occurredOn"], [1, "form-actions", "span-2"], ["type", "button", 1, "btn-text", 3, "click"], ["type", "submit", 1, "btn-primary", 3, "disabled"], [1, "spinner-large"], [1, "data-table"], [1, "text-right"], [1, "col-date"], [1, "badge-account"], [1, "text-code"], [1, "col-desc"], [1, "badge-type", "badge-income"], [1, "badge-type", "badge-expense"], [1, "text-right", "col-amount"], ["colspan", "6", 1, "empty-cell"], [1, "empty-state"], ["viewBox", "0 0 24 24", "width", "48", "height", "48", "fill", "none", "stroke", "#94a3b8", "stroke-width", "1.5"], ["x", "2", "y", "5", "width", "20", "height", "14", "rx", "2"], ["x1", "2", "y1", "10", "x2", "22", "y2", "10"], ["type", "button", 1, "btn-sm", "btn-secondary", 3, "click"]], template: function DashboardPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "span", 3);
            i0.ɵɵtext(4, "Gest\u00E3o Eclesi\u00E1stica & Financeira");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Dashboard Financeiro");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 4);
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "date");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 5)(11, "button", 6);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_11_listener() { return ctx.onRefresh(); });
            i0.ɵɵtemplate(12, DashboardPageComponent_Conditional_12_Template, 2, 0)(13, DashboardPageComponent_Conditional_13_Template, 3, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "button", 7);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_14_listener() { return ctx.toggleCreateModal(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(15, "svg", 8);
            i0.ɵɵelement(16, "line", 9)(17, "line", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(18, " Novo Lan\u00E7amento ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(19, DashboardPageComponent_Conditional_19_Template, 1, 2, "app-dom-bosquinho-state", 11)(20, DashboardPageComponent_Conditional_20_Template, 48, 4, "section", 12);
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(21, "section", 13)(22, "div", 14)(23, "div", 15)(24, "span", 16);
            i0.ɵɵtext(25, "Saldo L\u00EDquido Cont\u00E1bil");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(26, DashboardPageComponent_Conditional_26_Template, 2, 0, "span", 17)(27, DashboardPageComponent_Conditional_27_Template, 2, 0, "span", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 19);
            i0.ɵɵtext(29);
            i0.ɵɵpipe(30, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 20);
            i0.ɵɵtext(32, " Diferencial entre receitas e despesas acumuladas ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 14)(34, "div", 15)(35, "span", 16);
            i0.ɵɵtext(36, "Receitas Realizadas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span", 21);
            i0.ɵɵtext(38, "\u25B2");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "div", 22);
            i0.ɵɵtext(40);
            i0.ɵɵpipe(41, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 20);
            i0.ɵɵtext(43, " Entradas cont\u00E1beis (D\u00EDzimos, Doa\u00E7\u00F5es, Eventos) ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "div", 14)(45, "div", 15)(46, "span", 16);
            i0.ɵɵtext(47, "Despesas Operacionais");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "span", 23);
            i0.ɵɵtext(49, "\u25BC");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 24);
            i0.ɵɵtext(51);
            i0.ɵɵpipe(52, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 20);
            i0.ɵɵtext(54, " Sa\u00EDdas cont\u00E1beis (Manuten\u00E7\u00E3o, Fornecedores) ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 14)(56, "div", 15)(57, "span", 16);
            i0.ɵɵtext(58, "Total de Registros");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "span", 25);
            i0.ɵɵtext(60, "\uD83D\uDCC4");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 26);
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 20);
            i0.ɵɵtext(64, " Lan\u00E7amentos audit\u00E1veis sincronizados no Raz\u00E3o ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(65, "app-finance-chart", 27);
            i0.ɵɵelementStart(66, "section", 28)(67, "div", 29)(68, "div")(69, "h2");
            i0.ɵɵtext(70, "Movimenta\u00E7\u00F5es Recentes do Raz\u00E3o");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "p", 30);
            i0.ɵɵtext(72, "Extrato anal\u00EDtico em tempo real com controle de concilia\u00E7\u00E3o");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "div", 31)(74, "button", 32);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_74_listener() { return ctx.onFilterChange("ALL"); });
            i0.ɵɵtext(75);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "button", 32);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_76_listener() { return ctx.onFilterChange("INCOME"); });
            i0.ɵɵtext(77, " Apenas Receitas ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "button", 32);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_78_listener() { return ctx.onFilterChange("EXPENSE"); });
            i0.ɵɵtext(79, " Apenas Despesas ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(80, DashboardPageComponent_Conditional_80_Template, 4, 0, "div", 33)(81, DashboardPageComponent_Conditional_81_Template, 20, 1, "div", 34);
            i0.ɵɵelementStart(82, "div", 35)(83, "span", 36);
            i0.ɵɵtext(84, " Exibindo at\u00E9 8 movimenta\u00E7\u00F5es recentes filtradas. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "div", 37)(86, "a", 38);
            i0.ɵɵtext(87, "Acessar Raz\u00E3o Completo \u2192");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "a", 39);
            i0.ɵɵtext(89, "Exportar Relat\u00F3rios PDF/CSV \u2192");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_3_0;
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" Vis\u00E3o consolidada do Raz\u00E3o Cont\u00E1bil \u2022 Hoje \u00E9 ", i0.ɵɵpipeBind4(9, 24, ctx.today, "fullDate", "", "pt-BR"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.ledger.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.ledger.loading() ? 12 : 13);
            i0.ɵɵadvance(7);
            i0.ɵɵconditional((tmp_3_0 = ctx.ledger.error()) ? 19 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showCreateModal() ? 20 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("kpi-card-positive", ctx.ledger.netBalance() >= 0)("kpi-card-negative", ctx.ledger.netBalance() < 0);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(ctx.ledger.netBalance() >= 0 ? 26 : 27);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(30, 29, ctx.ledger.netBalance(), "BRL", "symbol", "1.2-2"), " ");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(41, 34, ctx.ledger.totalIncome(), "BRL", "symbol", "1.2-2"), " ");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(52, 39, ctx.ledger.totalExpense(), "BRL", "symbol", "1.2-2"), " ");
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" ", ctx.ledger.totalCount(), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalIncome", ctx.ledger.totalIncome())("totalExpense", ctx.ledger.totalExpense());
            i0.ɵɵadvance(9);
            i0.ɵɵclassProp("pill-active", ctx.ledger.filterType() === "ALL");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" Todos (", ctx.ledger.totalCount(), ") ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("pill-active", ctx.ledger.filterType() === "INCOME");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("pill-active", ctx.ledger.filterType() === "EXPENSE");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.ledger.loading() && ctx.ledger.entries().length === 0 ? 80 : 81);
        } }, dependencies: [CommonModule, i1.CurrencyPipe, i1.DatePipe, RouterLink, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, FinanceChartComponent, DomBosquinhoStateComponent], styles: [".dashboard-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding-bottom: 2rem;\n}\n\n\n\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.badge-portal[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #2563eb;\n  background: #eff6ff;\n  padding: 0.2rem 0.5rem;\n  border-radius: 4px;\n  margin-bottom: 0.4rem;\n}\n\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.875rem;\n  margin: 0.25rem 0 0;\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n\n\n.btn-primary[_ngcontent-%COMP%], .btn-secondary[_ngcontent-%COMP%], .btn-text[_ngcontent-%COMP%], .btn-sm[_ngcontent-%COMP%] {\n  font-weight: 500;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease;\n  padding: 0.6rem 1rem;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: #1d4ed8;\n  color: #ffffff;\n  border: none;\n}\n.btn-primary[_ngcontent-%COMP%]:hover {\n  background: #1e40af;\n}\n.btn-primary[_ngcontent-%COMP%]:disabled {\n  background: #94a3b8;\n  cursor: not-allowed;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #334155;\n  border: 1px solid #cbd5e1;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: #f8fafc;\n  border-color: #94a3b8;\n}\n\n.btn-text[_ngcontent-%COMP%] {\n  background: transparent;\n  color: #64748b;\n  border: none;\n}\n.btn-text[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n\n.btn-sm[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  padding: 0.35rem 0.65rem;\n}\n\n.btn-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  color: #94a3b8;\n  cursor: pointer;\n}\n.btn-close[_ngcontent-%COMP%]:hover {\n  color: #0f172a;\n}\n\n\n\n.alert[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1.25rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #991b1b;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  color: #166534;\n}\n\n\n\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1.25rem;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 1.25rem;\n  background: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.kpi-card-positive[_ngcontent-%COMP%] {\n  border-top: 4px solid #10b981;\n}\n.kpi-card-negative[_ngcontent-%COMP%] {\n  border-top: 4px solid #ef4444;\n}\n\n.kpi-top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: 0.825rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #64748b;\n  letter-spacing: 0.025em;\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 0.15rem 0.5rem;\n  border-radius: 9999px;\n  text-transform: uppercase;\n}\n.status-positive[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n.status-negative[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.icon-indicator[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: bold;\n}\n.icon-up[_ngcontent-%COMP%] { color: #10b981; }\n.icon-down[_ngcontent-%COMP%] { color: #ef4444; }\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 1.65rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n\n.text-income[_ngcontent-%COMP%] { color: #059669; }\n.text-expense[_ngcontent-%COMP%] { color: #dc2626; }\n.text-muted[_ngcontent-%COMP%] { color: #334155; }\n\n.kpi-footer[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n  margin-top: 0.75rem;\n}\n\n\n\n.modal-card[_ngcontent-%COMP%] {\n  border: 1px solid #bfdbfe;\n  background: #ffffff;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n}\n\n.modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #f1f5f9;\n  padding-bottom: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.15rem;\n  color: #0f172a;\n}\n\n.entry-form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n\n.span-2[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #475569;\n}\n\n.form-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .form-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 0.55rem 0.75rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.875rem;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n\n\n.table-card[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n}\n\n.table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.table-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #0f172a;\n  margin: 0;\n}\n\n.section-desc[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.25rem 0 0;\n}\n\n.filter-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  background: #f1f5f9;\n  padding: 0.25rem;\n  border-radius: 8px;\n}\n\n.pill[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #64748b;\n  padding: 0.4rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.pill-active[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: #1d4ed8;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n\n.table-responsive[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.875rem;\n}\n\n.data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n\n.data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #1e293b;\n}\n\n.col-date[_ngcontent-%COMP%] {\n  white-space: nowrap;\n  color: #64748b;\n  font-size: 0.8rem;\n}\n\n.badge-account[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #f1f5f9;\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #334155;\n  margin-right: 0.4rem;\n}\n\n.text-code[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n\n.badge-type[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 9999px;\n}\n.badge-income[_ngcontent-%COMP%] {\n  background: #dcfce7;\n  color: #15803d;\n}\n.badge-expense[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.col-amount[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.text-right[_ngcontent-%COMP%] { text-align: right; }\n\n.empty-cell[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  color: #334155;\n  font-size: 1rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #94a3b8;\n  font-size: 0.85rem;\n  margin: 0 0 1rem;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 3rem 0;\n  color: #64748b;\n  gap: 1rem;\n}\n\n.spinner[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  border: 2px solid #ffffff;\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n  display: inline-block;\n}\n\n.spinner-large[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #1d4ed8;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  to { transform: rotate(360deg); }\n}\n\n.table-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid #f1f5f9;\n}\n\n.footer-info[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n\n.footer-links[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n\n.link-action[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n}\n.link-action[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n\n@media (max-width: 640px) {\n  .entry-form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .span-2[_ngcontent-%COMP%] {\n    grid-column: span 1;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPageComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', standalone: true, imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe, DatePipe, FinanceChartComponent, DomBosquinhoStateComponent], template: "<div class=\"dashboard-wrapper\">\r\n  <!-- Cabe\u00E7alho Principal -->\r\n  <header class=\"dashboard-header\">\r\n    <div class=\"header-titles\">\r\n      <span class=\"badge-portal\">Gest\u00E3o Eclesi\u00E1stica & Financeira</span>\r\n      <h1>Dashboard Financeiro</h1>\r\n      <p class=\"subtitle\">\r\n        Vis\u00E3o consolidada do Raz\u00E3o Cont\u00E1bil &bull; Hoje \u00E9 {{ today | date:'fullDate':'':'pt-BR' }}\r\n      </p>\r\n    </div>\r\n\r\n    <div class=\"header-actions\">\r\n      <button\r\n        type=\"button\"\r\n        class=\"btn-secondary\"\r\n        (click)=\"onRefresh()\"\r\n        [disabled]=\"ledger.loading()\">\r\n        @if (ledger.loading()) {\r\n          <span class=\"spinner\"></span> Atualizando...\r\n        } @else {\r\n          <svg class=\"icon\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n            <path d=\"M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16\"/>\r\n          </svg>\r\n          Sincronizar Raz\u00E3o\r\n        }\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn-primary\" (click)=\"toggleCreateModal()\">\r\n        <svg class=\"icon\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\r\n          <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\r\n          <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\r\n        </svg>\r\n        Novo Lan\u00E7amento\r\n      </button>\r\n    </div>\r\n  </header>\r\n\r\n  <!-- Mensagem Global de Erro com Dom Bosquinho -->\r\n  @if (ledger.error(); as errorMsg) {\r\n    <app-dom-bosquinho-state\r\n      mode=\"error\"\r\n      title=\"Ops! Dom Bosquinho avisa que houve um contratempo\"\r\n      [message]=\"errorMsg\"\r\n      [showDismiss]=\"true\"\r\n      (retry)=\"onRefresh()\"\r\n      (dismiss)=\"ledger.clearError()\">\r\n    </app-dom-bosquinho-state>\r\n  }\r\n\r\n  <!-- Modal / Painel de Cadastro R\u00E1pido -->\r\n  @if (showCreateModal()) {\r\n    <section class=\"card modal-card\">\r\n      <div class=\"modal-header\">\r\n        <h3>Registrar Lan\u00E7amento no Raz\u00E3o Cont\u00E1bil</h3>\r\n        <button type=\"button\" class=\"btn-close\" (click)=\"toggleCreateModal()\">&times;</button>\r\n      </div>\r\n\r\n      @if (actionSuccess(); as successMsg) {\r\n        <div class=\"alert alert-success\">{{ successMsg }}</div>\r\n      }\r\n\r\n      <form [formGroup]=\"entryForm\" (ngSubmit)=\"submitNewEntry()\" class=\"entry-form-grid\">\r\n        <div class=\"form-group\">\r\n          <label for=\"type\">Natureza Cont\u00E1bil</label>\r\n          <select id=\"type\" formControlName=\"type\" (change)=\"onTypeChange()\">\r\n            <option value=\"INCOME\">Receita (Entrada)</option>\r\n            <option value=\"EXPENSE\">Despesa (Sa\u00EDda)</option>\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"amount\">Valor (R$)</label>\r\n          <input id=\"amount\" type=\"number\" step=\"0.01\" formControlName=\"amount\" placeholder=\"0.00\" />\r\n        </div>\r\n\r\n        <div class=\"form-group span-2\">\r\n          <label for=\"description\">Descri\u00E7\u00E3o</label>\r\n          <input id=\"description\" type=\"text\" formControlName=\"description\" placeholder=\"Ex: D\u00EDzimo paroquial, Manuten\u00E7\u00E3o predial\" />\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"accountCode\">Conta Cont\u00E1bil (Plano de Contas)</label>\r\n          <select id=\"accountCode\" formControlName=\"accountCode\">\r\n            @for (acc of currentAccountOptions(); track acc.code) {\r\n              <option [value]=\"acc.code\">{{ acc.name }}</option>\r\n            }\r\n          </select>\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"costCenter\">Centro de Custo</label>\r\n          <input id=\"costCenter\" type=\"text\" formControlName=\"costCenter\" placeholder=\"Ex: Pastoral, Matriz\" />\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"referenceCode\">C\u00F3d. Refer\u00EAncia (Doc/Recibo)</label>\r\n          <input id=\"referenceCode\" type=\"text\" formControlName=\"referenceCode\" placeholder=\"Ex: REC-1024, NF-3450\" />\r\n        </div>\r\n\r\n        <div class=\"form-group\">\r\n          <label for=\"occurredOn\">Data do Lan\u00E7amento</label>\r\n          <input id=\"occurredOn\" type=\"date\" formControlName=\"occurredOn\" />\r\n        </div>\r\n\r\n        <div class=\"form-actions span-2\">\r\n          <button type=\"button\" class=\"btn-text\" (click)=\"toggleCreateModal()\">Cancelar</button>\r\n          <button type=\"submit\" class=\"btn-primary\" [disabled]=\"entryForm.invalid || ledger.loading()\">\r\n            @if (ledger.loading()) {\r\n              <span class=\"spinner\"></span> Salvando...\r\n            } @else {\r\n              Confirmar Lan\u00E7amento\r\n            }\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </section>\r\n  }\r\n\r\n  <!-- Cards de KPI / Indicadores Financeiros Centrais -->\r\n  <section class=\"kpi-grid\">\r\n    <!-- Card 1: Saldo L\u00EDquido -->\r\n    <div class=\"card kpi-card\" [class.kpi-card-positive]=\"ledger.netBalance() >= 0\" [class.kpi-card-negative]=\"ledger.netBalance() < 0\">\r\n      <div class=\"kpi-top\">\r\n        <span class=\"kpi-label\">Saldo L\u00EDquido Cont\u00E1bil</span>\r\n        @if (ledger.netBalance() >= 0) {\r\n          <span class=\"status-pill status-positive\">Super\u00E1vit</span>\r\n        } @else {\r\n          <span class=\"status-pill status-negative\">D\u00E9ficit</span>\r\n        }\r\n      </div>\r\n      <div class=\"kpi-value\">\r\n        {{ ledger.netBalance() | currency:'BRL':'symbol':'1.2-2' }}\r\n      </div>\r\n      <div class=\"kpi-footer\">\r\n        Diferencial entre receitas e despesas acumuladas\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Card 2: Receitas (INCOME) -->\r\n    <div class=\"card kpi-card\">\r\n      <div class=\"kpi-top\">\r\n        <span class=\"kpi-label\">Receitas Realizadas</span>\r\n        <span class=\"icon-indicator icon-up\">\u25B2</span>\r\n      </div>\r\n      <div class=\"kpi-value text-income\">\r\n        {{ ledger.totalIncome() | currency:'BRL':'symbol':'1.2-2' }}\r\n      </div>\r\n      <div class=\"kpi-footer\">\r\n        Entradas cont\u00E1beis (D\u00EDzimos, Doa\u00E7\u00F5es, Eventos)\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Card 3: Despesas (EXPENSE) -->\r\n    <div class=\"card kpi-card\">\r\n      <div class=\"kpi-top\">\r\n        <span class=\"kpi-label\">Despesas Operacionais</span>\r\n        <span class=\"icon-indicator icon-down\">\u25BC</span>\r\n      </div>\r\n      <div class=\"kpi-value text-expense\">\r\n        {{ ledger.totalExpense() | currency:'BRL':'symbol':'1.2-2' }}\r\n      </div>\r\n      <div class=\"kpi-footer\">\r\n        Sa\u00EDdas cont\u00E1beis (Manuten\u00E7\u00E3o, Fornecedores)\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Card 4: Total de Lan\u00E7amentos -->\r\n    <div class=\"card kpi-card\">\r\n      <div class=\"kpi-top\">\r\n        <span class=\"kpi-label\">Total de Registros</span>\r\n        <span class=\"icon-indicator\">\uD83D\uDCC4</span>\r\n      </div>\r\n      <div class=\"kpi-value text-muted\">\r\n        {{ ledger.totalCount() }}\r\n      </div>\r\n      <div class=\"kpi-footer\">\r\n        Lan\u00E7amentos audit\u00E1veis sincronizados no Raz\u00E3o\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- Gr\u00E1fico Comparativo de Receitas x Despesas -->\r\n  <app-finance-chart\r\n    [totalIncome]=\"ledger.totalIncome()\"\r\n    [totalExpense]=\"ledger.totalExpense()\">\r\n  </app-finance-chart>\r\n\r\n  <!-- Se\u00E7\u00E3o do Raz\u00E3o Cont\u00E1bil Recente -->\r\n  <section class=\"card table-card\">\r\n    <div class=\"table-header\">\r\n      <div>\r\n        <h2>Movimenta\u00E7\u00F5es Recentes do Raz\u00E3o</h2>\r\n        <p class=\"section-desc\">Extrato anal\u00EDtico em tempo real com controle de concilia\u00E7\u00E3o</p>\r\n      </div>\r\n\r\n      <!-- Barra de Filtros R\u00E1pidos de Tipo -->\r\n      <div class=\"filter-pills\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"pill\"\r\n          [class.pill-active]=\"ledger.filterType() === 'ALL'\"\r\n          (click)=\"onFilterChange('ALL')\">\r\n          Todos ({{ ledger.totalCount() }})\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          class=\"pill\"\r\n          [class.pill-active]=\"ledger.filterType() === 'INCOME'\"\r\n          (click)=\"onFilterChange('INCOME')\">\r\n          Apenas Receitas\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          class=\"pill\"\r\n          [class.pill-active]=\"ledger.filterType() === 'EXPENSE'\"\r\n          (click)=\"onFilterChange('EXPENSE')\">\r\n          Apenas Despesas\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Controle de Fluxo Nativo para Estado da Tabela -->\r\n    @if (ledger.loading() && ledger.entries().length === 0) {\r\n      <div class=\"loading-state\">\r\n        <div class=\"spinner-large\"></div>\r\n        <p>Carregando registros do livro raz\u00E3o...</p>\r\n      </div>\r\n    } @else {\r\n      <div class=\"table-responsive\">\r\n        <table class=\"data-table\">\r\n          <thead>\r\n            <tr>\r\n              <th>Data</th>\r\n              <th>Conta & Refer\u00EAncia</th>\r\n              <th>Centro de Custo</th>\r\n              <th>Descri\u00E7\u00E3o</th>\r\n              <th>Natureza</th>\r\n              <th class=\"text-right\">Valor</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            @for (entry of ledger.recentEntries(); track entry.id) {\r\n              <tr>\r\n                <td class=\"col-date\">\r\n                  {{ entry.occurredOn | date:'dd/MM/yyyy' }}\r\n                </td>\r\n                <td>\r\n                  <span class=\"badge-account\">{{ entry.accountCode }}</span>\r\n                  <small class=\"text-code\">{{ entry.referenceCode }}</small>\r\n                </td>\r\n                <td>{{ entry.costCenter }}</td>\r\n                <td class=\"col-desc\">\r\n                  <strong>{{ entry.description }}</strong>\r\n                </td>\r\n                <td>\r\n                  @if (entry.type === 'INCOME') {\r\n                    <span class=\"badge-type badge-income\">Receita</span>\r\n                  } @else {\r\n                    <span class=\"badge-type badge-expense\">Despesa</span>\r\n                  }\r\n                </td>\r\n                <td class=\"text-right col-amount\" [class.text-income]=\"entry.type === 'INCOME'\" [class.text-expense]=\"entry.type === 'EXPENSE'\">\r\n                  @if (entry.type === 'INCOME') { + } @else { - }\r\n                  {{ entry.amount | currency:'BRL':'symbol':'1.2-2' }}\r\n                </td>\r\n              </tr>\r\n            } @empty {\r\n              <tr>\r\n                <td colspan=\"6\" class=\"empty-cell\">\r\n                  <div class=\"empty-state\">\r\n                    <svg viewBox=\"0 0 24 24\" width=\"48\" height=\"48\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"1.5\">\r\n                      <rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/>\r\n                      <line x1=\"2\" y1=\"10\" x2=\"22\" y2=\"10\"/>\r\n                    </svg>\r\n                    <h4>Nenhum lan\u00E7amento cont\u00E1bil encontrado</h4>\r\n                    <p>N\u00E3o h\u00E1 movimenta\u00E7\u00F5es para os crit\u00E9rios de busca atuais.</p>\r\n                    <button type=\"button\" class=\"btn-sm btn-secondary\" (click)=\"toggleCreateModal()\">\r\n                      Registrar o Primeiro Lan\u00E7amento\r\n                    </button>\r\n                  </div>\r\n                </td>\r\n              </tr>\r\n            }\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    }\r\n\r\n    <!-- Rodap\u00E9 com Atalhos R\u00E1pidos -->\r\n    <div class=\"table-footer\">\r\n      <span class=\"footer-info\">\r\n        Exibindo at\u00E9 8 movimenta\u00E7\u00F5es recentes filtradas.\r\n      </span>\r\n      <div class=\"footer-links\">\r\n        <a routerLink=\"/ledger\" class=\"link-action\">Acessar Raz\u00E3o Completo &rarr;</a>\r\n        <a routerLink=\"/reports\" class=\"link-action\">Exportar Relat\u00F3rios PDF/CSV &rarr;</a>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n\r\n", styles: [".dashboard-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n  padding-bottom: 2rem;\n}\n\n/* Header */\n.dashboard-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.badge-portal {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #2563eb;\n  background: #eff6ff;\n  padding: 0.2rem 0.5rem;\n  border-radius: 4px;\n  margin-bottom: 0.4rem;\n}\n\n.dashboard-header h1 {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #0f172a;\n  margin: 0;\n}\n\n.subtitle {\n  color: #64748b;\n  font-size: 0.875rem;\n  margin: 0.25rem 0 0;\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n/* Bot\u00F5es */\n.btn-primary, .btn-secondary, .btn-text, .btn-sm {\n  font-weight: 500;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  transition: all 0.2s ease;\n  padding: 0.6rem 1rem;\n}\n\n.btn-primary {\n  background: #1d4ed8;\n  color: #ffffff;\n  border: none;\n}\n.btn-primary:hover {\n  background: #1e40af;\n}\n.btn-primary:disabled {\n  background: #94a3b8;\n  cursor: not-allowed;\n}\n\n.btn-secondary {\n  background: #ffffff;\n  color: #334155;\n  border: 1px solid #cbd5e1;\n}\n.btn-secondary:hover {\n  background: #f8fafc;\n  border-color: #94a3b8;\n}\n\n.btn-text {\n  background: transparent;\n  color: #64748b;\n  border: none;\n}\n.btn-text:hover {\n  color: #0f172a;\n}\n\n.btn-sm {\n  font-size: 0.75rem;\n  padding: 0.35rem 0.65rem;\n}\n\n.btn-close {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  color: #94a3b8;\n  cursor: pointer;\n}\n.btn-close:hover {\n  color: #0f172a;\n}\n\n/* Alertas */\n.alert {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.85rem 1.25rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n}\n.alert-error {\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  color: #991b1b;\n}\n.alert-success {\n  background: #f0fdf4;\n  border: 1px solid #bbf7d0;\n  color: #166534;\n}\n\n/* Grid de KPIs */\n.kpi-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));\n  gap: 1.25rem;\n}\n\n.kpi-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 1.25rem;\n  background: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e2e8f0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.kpi-card-positive {\n  border-top: 4px solid #10b981;\n}\n.kpi-card-negative {\n  border-top: 4px solid #ef4444;\n}\n\n.kpi-top {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n\n.kpi-label {\n  font-size: 0.825rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  color: #64748b;\n  letter-spacing: 0.025em;\n}\n\n.status-pill {\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 0.15rem 0.5rem;\n  border-radius: 9999px;\n  text-transform: uppercase;\n}\n.status-positive {\n  background: #dcfce7;\n  color: #15803d;\n}\n.status-negative {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.icon-indicator {\n  font-size: 0.85rem;\n  font-weight: bold;\n}\n.icon-up { color: #10b981; }\n.icon-down { color: #ef4444; }\n\n.kpi-value {\n  font-size: 1.65rem;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.2;\n}\n\n.text-income { color: #059669; }\n.text-expense { color: #dc2626; }\n.text-muted { color: #334155; }\n\n.kpi-footer {\n  font-size: 0.75rem;\n  color: #94a3b8;\n  margin-top: 0.75rem;\n}\n\n/* Modal / Formul\u00E1rio */\n.modal-card {\n  border: 1px solid #bfdbfe;\n  background: #ffffff;\n  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n}\n\n.modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #f1f5f9;\n  padding-bottom: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.modal-header h3 {\n  margin: 0;\n  font-size: 1.15rem;\n  color: #0f172a;\n}\n\n.entry-form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n\n.span-2 {\n  grid-column: span 2;\n}\n\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 0.35rem;\n}\n\n.form-group label {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #475569;\n}\n\n.form-group input, .form-group select {\n  padding: 0.55rem 0.75rem;\n  border: 1px solid #cbd5e1;\n  border-radius: 6px;\n  font-size: 0.875rem;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n/* Tabela e Filtros */\n.table-card {\n  padding: 1.25rem;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n}\n\n.table-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.table-header h2 {\n  font-size: 1.2rem;\n  color: #0f172a;\n  margin: 0;\n}\n\n.section-desc {\n  font-size: 0.85rem;\n  color: #64748b;\n  margin: 0.25rem 0 0;\n}\n\n.filter-pills {\n  display: flex;\n  gap: 0.4rem;\n  background: #f1f5f9;\n  padding: 0.25rem;\n  border-radius: 8px;\n}\n\n.pill {\n  background: transparent;\n  border: none;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #64748b;\n  padding: 0.4rem 0.75rem;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.pill-active {\n  background: #ffffff;\n  color: #1d4ed8;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n}\n\n.table-responsive {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  text-align: left;\n  font-size: 0.875rem;\n}\n\n.data-table th {\n  background: #f8fafc;\n  color: #475569;\n  font-weight: 600;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  padding: 0.75rem 1rem;\n  border-bottom: 1px solid #e2e8f0;\n}\n\n.data-table td {\n  padding: 0.85rem 1rem;\n  border-bottom: 1px solid #f1f5f9;\n  color: #1e293b;\n}\n\n.col-date {\n  white-space: nowrap;\n  color: #64748b;\n  font-size: 0.8rem;\n}\n\n.badge-account {\n  display: inline-block;\n  background: #f1f5f9;\n  padding: 0.15rem 0.45rem;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #334155;\n  margin-right: 0.4rem;\n}\n\n.text-code {\n  color: #94a3b8;\n  font-size: 0.75rem;\n}\n\n.badge-type {\n  display: inline-block;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 0.2rem 0.5rem;\n  border-radius: 9999px;\n}\n.badge-income {\n  background: #dcfce7;\n  color: #15803d;\n}\n.badge-expense {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.col-amount {\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.text-right { text-align: right; }\n\n.empty-cell {\n  text-align: center;\n  padding: 3rem 1rem;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.empty-state h4 {\n  margin: 0.5rem 0 0;\n  color: #334155;\n  font-size: 1rem;\n}\n\n.empty-state p {\n  color: #94a3b8;\n  font-size: 0.85rem;\n  margin: 0 0 1rem;\n}\n\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 3rem 0;\n  color: #64748b;\n  gap: 1rem;\n}\n\n.spinner {\n  width: 14px;\n  height: 14px;\n  border: 2px solid #ffffff;\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n  display: inline-block;\n}\n\n.spinner-large {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: #1d4ed8;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n.table-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid #f1f5f9;\n}\n\n.footer-info {\n  font-size: 0.75rem;\n  color: #94a3b8;\n}\n\n.footer-links {\n  display: flex;\n  gap: 1rem;\n}\n\n.link-action {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n}\n.link-action:hover {\n  text-decoration: underline;\n}\n\n@media (max-width: 640px) {\n  .entry-form-grid {\n    grid-template-columns: 1fr;\n  }\n  .span-2 {\n    grid-column: span 1;\n  }\n}\n\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPageComponent, { className: "DashboardPageComponent", filePath: "src\\app\\pages\\dashboard-page.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=dashboard-page.component.js.map