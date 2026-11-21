import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LedgerService } from '../core/services/ledger.service';
import { CommunityService } from '../core/services/community.service';
import { MemberService } from '../core/services/member.service';
import { CHART_OF_ACCOUNTS } from '../core/models/chart-of-accounts';
import { ReportService } from '../core/services/report.service';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.code;
const _forTrack1 = ($index, $item) => $item.id;
function LedgerPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 26);
    i0.ɵɵtext(1, " Sincronizando... ");
} }
function LedgerPageComponent_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Atualizar ");
} }
function LedgerPageComponent_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-dom-bosquinho-state", 27);
    i0.ɵɵlistener("retry", function LedgerPageComponent_Conditional_15_Template_app_dom_bosquinho_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRefresh()); })("dismiss", function LedgerPageComponent_Conditional_15_Template_app_dom_bosquinho_state_dismiss_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.ledger.clearError()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", ctx)("showDismiss", true);
} }
function LedgerPageComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 28);
    i0.ɵɵlistener("click", function LedgerPageComponent_Conditional_16_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function LedgerPageComponent_Conditional_17_For_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const acc_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", acc_r5.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(acc_r5.name);
} }
function LedgerPageComponent_Conditional_17_Conditional_43_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const m_r6 = ctx.$implicit;
    i0.ɵɵproperty("value", m_r6.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(m_r6.name);
} }
function LedgerPageComponent_Conditional_17_Conditional_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "div", 37)(2, "label", 55)(3, "span");
    i0.ɵɵtext(4, "\uD83D\uDC64 Membro / Dizimista Vinculado (Opcional)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "select", 56)(6, "option", 57);
    i0.ɵɵtext(7, "Nenhum (Movimenta\u00E7\u00E3o geral da par\u00F3quia)");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(8, LedgerPageComponent_Conditional_17_Conditional_43_For_9_Template, 2, 2, "option", 40, _forTrack1);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.memberService.members());
} }
function LedgerPageComponent_Conditional_17_Conditional_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 26);
    i0.ɵɵtext(1, " Salvando... ");
} }
function LedgerPageComponent_Conditional_17_Conditional_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Salvar Lan\u00E7amento ");
} }
function LedgerPageComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "div", 29)(2, "h3");
    i0.ɵɵtext(3, "Novo Registro no Raz\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 28);
    i0.ɵɵlistener("click", function LedgerPageComponent_Conditional_17_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNewEntryForm()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "form", 30);
    i0.ɵɵlistener("ngSubmit", function LedgerPageComponent_Conditional_17_Template_form_ngSubmit_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitEntry()); });
    i0.ɵɵelementStart(7, "div", 31)(8, "div", 32)(9, "label", 33);
    i0.ɵɵtext(10, "Natureza");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "select", 34);
    i0.ɵɵlistener("change", function LedgerPageComponent_Conditional_17_Template_select_change_11_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTypeChange()); });
    i0.ɵɵelementStart(12, "option", 35);
    i0.ɵɵtext(13, "Receita (Cr\u00E9dito / Entrada)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "option", 36);
    i0.ɵɵtext(15, "Despesa (D\u00E9bito / Sa\u00EDda)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 37)(17, "label", 38);
    i0.ɵɵtext(18, "Conta Cont\u00E1bil (Plano de Contas)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "select", 39);
    i0.ɵɵrepeaterCreate(20, LedgerPageComponent_Conditional_17_For_21_Template, 2, 2, "option", 40, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 32)(23, "label", 41);
    i0.ɵɵtext(24, "Valor (R$)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(25, "input", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 32)(27, "label", 43);
    i0.ɵɵtext(28, "Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 44);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 31)(31, "div", 37)(32, "label", 45);
    i0.ɵɵtext(33, "Hist\u00F3rico / Descri\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(34, "input", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 32)(36, "label", 47);
    i0.ɵɵtext(37, "Centro de Custo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "input", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 32)(40, "label", 49);
    i0.ɵɵtext(41, "C\u00F3d. Refer\u00EAncia (Doc/Recibo)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(43, LedgerPageComponent_Conditional_17_Conditional_43_Template, 10, 0, "div", 51);
    i0.ɵɵelementStart(44, "div", 52)(45, "button", 53);
    i0.ɵɵlistener("click", function LedgerPageComponent_Conditional_17_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleNewEntryForm()); });
    i0.ɵɵtext(46, "Cancelar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "button", 54);
    i0.ɵɵtemplate(48, LedgerPageComponent_Conditional_17_Conditional_48_Template, 2, 0)(49, LedgerPageComponent_Conditional_17_Conditional_49_Template, 1, 0);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("formGroup", ctx_r1.entryForm);
    i0.ɵɵadvance(14);
    i0.ɵɵrepeater(ctx_r1.currentAccountOptions());
    i0.ɵɵadvance(23);
    i0.ɵɵconditional(ctx_r1.currentNature() === "INCOME" ? 43 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.entryForm.invalid || ctx_r1.ledger.loading());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.ledger.loading() ? 48 : 49);
} }
function LedgerPageComponent_Conditional_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "div", 58);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando livro raz\u00E3o...");
    i0.ɵɵelementEnd()();
} }
function LedgerPageComponent_Conditional_59_For_20_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \uD83D\uDC64 ", ctx_r1.getMemberName(entry_r7.memberId), " ");
} }
function LedgerPageComponent_Conditional_59_For_20_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 68);
    i0.ɵɵtext(1, "Receita");
    i0.ɵɵelementEnd();
} }
function LedgerPageComponent_Conditional_59_For_20_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 69);
    i0.ɵɵtext(1, "Despesa");
    i0.ɵɵelementEnd();
} }
function LedgerPageComponent_Conditional_59_For_20_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " + ");
} }
function LedgerPageComponent_Conditional_59_For_20_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " - ");
} }
function LedgerPageComponent_Conditional_59_For_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 61);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td")(5, "div", 62)(6, "strong", 63);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 64);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "td", 65);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td")(15, "div", 66)(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, LedgerPageComponent_Conditional_59_For_20_Conditional_18_Template, 2, 1, "span", 67);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "td");
    i0.ɵɵtemplate(20, LedgerPageComponent_Conditional_59_For_20_Conditional_20_Template, 2, 0, "span", 68)(21, LedgerPageComponent_Conditional_59_For_20_Conditional_21_Template, 2, 0, "span", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td", 70);
    i0.ɵɵtemplate(23, LedgerPageComponent_Conditional_59_For_20_Conditional_23_Template, 1, 0)(24, LedgerPageComponent_Conditional_59_For_20_Conditional_24_Template, 1, 0);
    i0.ɵɵtext(25);
    i0.ɵɵpipe(26, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 14, entry_r7.occurredOn, "dd/MM/yyyy"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.getAccountName(entry_r7.accountCode));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r7.accountCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r7.referenceCode);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r7.costCenter);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(entry_r7.description);
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r7.memberId ? 18 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(entry_r7.type === "INCOME" ? 20 : 21);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("text-income", entry_r7.type === "INCOME")("text-expense", entry_r7.type === "EXPENSE");
    i0.ɵɵadvance();
    i0.ɵɵconditional(entry_r7.type === "INCOME" ? 23 : 24);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(26, 17, entry_r7.amount, "BRL", "symbol", "1.2-2"), " ");
} }
function LedgerPageComponent_Conditional_59_ForEmpty_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 71)(2, "p");
    i0.ɵɵtext(3, "Nenhum lan\u00E7amento cont\u00E1bil encontrado para o filtro aplicado.");
    i0.ɵɵelementEnd()()();
} }
function LedgerPageComponent_Conditional_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25)(1, "table", 59)(2, "thead")(3, "tr")(4, "th");
    i0.ɵɵtext(5, "Data");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th");
    i0.ɵɵtext(7, "Conta");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "th");
    i0.ɵɵtext(9, "Refer\u00EAncia");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th");
    i0.ɵɵtext(11, "Centro de Custo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Hist\u00F3rico Cont\u00E1bil / V\u00EDnculo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th");
    i0.ɵɵtext(15, "Natureza");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 60);
    i0.ɵɵtext(17, "Valor (R$)");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "tbody");
    i0.ɵɵrepeaterCreate(19, LedgerPageComponent_Conditional_59_For_20_Template, 27, 22, "tr", null, _forTrack1, false, LedgerPageComponent_Conditional_59_ForEmpty_21_Template, 4, 0, "tr");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(19);
    i0.ɵɵrepeater(ctx_r1.searchedEntries());
} }
export class LedgerPageComponent {
    ledger = inject(LedgerService);
    communityService = inject(CommunityService);
    memberService = inject(MemberService);
    report = inject(ReportService);
    fb = inject(FormBuilder);
    start = input();
    end = input();
    showNewEntry = signal(false);
    successMessage = signal(null);
    searchTerm = signal('');
    currentNature = signal('INCOME');
    // Opções do plano de contas filtradas pela natureza selecionada
    currentAccountOptions = computed(() => {
        const nature = this.currentNature();
        return CHART_OF_ACCOUNTS.filter((acc) => acc.nature === nature);
    });
    constructor() {
        // Reage automaticamente à mudança da comunidade ativa no header
        effect(() => {
            const activeId = this.communityService.activeCommunityId();
            this.ledger.loadEntries(this.start(), this.end()).subscribe();
            this.memberService.loadMembers(activeId).subscribe();
        });
    }
    // Sinais computados para busca textual em memória sobre os registros filtrados
    searchedEntries = computed(() => {
        const term = this.searchTerm().trim().toLowerCase();
        const list = this.ledger.filteredEntries();
        if (!term)
            return list;
        return list.filter((e) => {
            const memberName = e.memberId ? this.getMemberName(e.memberId).toLowerCase() : '';
            return (e.description.toLowerCase().includes(term) ||
                e.accountCode.toLowerCase().includes(term) ||
                e.costCenter.toLowerCase().includes(term) ||
                e.referenceCode.toLowerCase().includes(term) ||
                memberName.includes(term));
        });
    });
    entryForm = this.fb.group({
        type: ['INCOME', Validators.required],
        accountCode: ['1.1.01', Validators.required],
        referenceCode: ['REC-' + Math.floor(1000 + Math.random() * 9000), Validators.required],
        costCenter: ['Geral', Validators.required],
        description: ['', [Validators.required, Validators.minLength(3)]],
        amount: ['', [Validators.required, Validators.min(0.01)]],
        occurredOn: [new Date().toISOString().substring(0, 10), Validators.required],
        memberId: [''],
    });
    ngOnInit() {
        const activeId = this.communityService.activeCommunityId();
        this.ledger.loadEntries(this.start(), this.end()).subscribe();
        this.memberService.loadMembers(activeId).subscribe();
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
                memberId: '',
            });
        }
    }
    onRefresh() {
        this.ledger.refresh();
        this.memberService.loadMembers(this.communityService.activeCommunityId()).subscribe();
    }
    onFilterType(type) {
        this.ledger.setFilterType(type);
    }
    onSearchInput(event) {
        const val = event.target.value;
        this.searchTerm.set(val);
    }
    toggleNewEntryForm() {
        this.showNewEntry.update((v) => !v);
    }
    submitEntry() {
        if (this.entryForm.invalid) {
            this.entryForm.markAllAsTouched();
            return;
        }
        const val = this.entryForm.getRawValue();
        const dto = {
            type: val.type,
            accountCode: val.accountCode,
            referenceCode: val.referenceCode,
            costCenter: val.costCenter,
            description: val.description,
            amount: Number(val.amount),
            occurredOn: val.occurredOn,
            memberId: (val.type === 'INCOME' && val.memberId) ? val.memberId : undefined,
        };
        this.ledger.createEntry(dto).subscribe({
            next: () => {
                this.successMessage.set('Lançamento contábil registrado no razão com sucesso!');
                this.entryForm.patchValue({
                    description: '',
                    amount: '',
                    memberId: '',
                    referenceCode: (this.currentNature() === 'INCOME' ? 'REC-' : 'DESP-') + Math.floor(1000 + Math.random() * 9000),
                });
                this.showNewEntry.set(false);
            },
        });
    }
    getMemberName(memberId) {
        if (!memberId)
            return '';
        const m = this.memberService.members().find((item) => item.id === memberId);
        return m ? m.name : 'Dizimista';
    }
    getAccountName(accountCode) {
        const acc = CHART_OF_ACCOUNTS.find((a) => a.code === accountCode);
        if (!acc)
            return accountCode;
        return acc.name.replace(/^[0-9.]+\s*-\s*/, '');
    }
    exportPdf() {
        this.report.downloadLedgerPdf(this.start(), this.end());
    }
    exportCsv() {
        this.report.downloadLedgerCsv(this.start(), this.end());
    }
    static ɵfac = function LedgerPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LedgerPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LedgerPageComponent, selectors: [["app-ledger-page"]], inputs: { start: [1, "start"], end: [1, "end"] }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 60, vars: 36, consts: [[1, "ledger-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], [1, "header-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "message", "showDismiss"], [1, "alert", "alert-success"], [1, "card", "form-card"], [1, "card", "filter-bar"], [1, "filter-group"], [1, "pills"], ["type", "button", 1, "pill", 3, "click"], [1, "filter-group", "flex-1"], ["for", "searchTerm"], ["id", "searchTerm", "type", "search", "placeholder", "Filtrar por descri\u00E7\u00E3o, conta, membro ou centro de custo...", 3, "input", "value"], [1, "filter-actions"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "summary-strip"], [1, "summary-item"], [1, "text-income"], [1, "text-expense"], [1, "card", "table-card"], [1, "loading-state"], [1, "table-responsive"], [1, "spinner"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "retry", "dismiss", "message", "showDismiss"], [1, "btn-close", 3, "click"], [1, "card-title-bar"], [1, "entry-form", 3, "ngSubmit", "formGroup"], [1, "form-row"], [1, "field"], ["for", "type"], ["id", "type", "formControlName", "type", 3, "change"], ["value", "INCOME"], ["value", "EXPENSE"], [1, "field", "flex-2"], ["for", "accountCode"], ["id", "accountCode", "formControlName", "accountCode"], [3, "value"], ["for", "amount"], ["id", "amount", "type", "number", "step", "0.01", "formControlName", "amount", "placeholder", "0.00"], ["for", "occurredOn"], ["id", "occurredOn", "type", "date", "formControlName", "occurredOn"], ["for", "description"], ["id", "description", "type", "text", "formControlName", "description", "placeholder", "Ex: Doa\u00E7\u00E3o de campanha comunit\u00E1ria"], ["for", "costCenter"], ["id", "costCenter", "type", "text", "formControlName", "costCenter", "placeholder", "Ex: Pastoral Familiar"], ["for", "referenceCode"], ["id", "referenceCode", "type", "text", "formControlName", "referenceCode", "placeholder", "Ex: REC-1024, NF-3450"], [1, "form-row", "highlight-box"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["for", "memberId"], ["id", "memberId", "formControlName", "memberId"], ["value", ""], [1, "spinner-large"], [1, "data-table"], [1, "text-right"], [1, "col-date"], [1, "account-cell"], [1, "account-desc"], [1, "account-code"], [1, "text-muted"], [1, "history-cell"], [1, "badge-member"], [1, "badge", "badge-income"], [1, "badge", "badge-expense"], [1, "text-right", "col-amount"], ["colspan", "7", 1, "empty-state"]], template: function LedgerPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "Contabilidade & Governan\u00E7a");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Livro Raz\u00E3o Cont\u00E1bil");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Auditoria, concilia\u00E7\u00E3o e escritura\u00E7\u00E3o das movimenta\u00E7\u00F5es da comunidade.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 4)(10, "button", 5);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_10_listener() { return ctx.onRefresh(); });
            i0.ɵɵtemplate(11, LedgerPageComponent_Conditional_11_Template, 2, 0)(12, LedgerPageComponent_Conditional_12_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "button", 6);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_13_listener() { return ctx.toggleNewEntryForm(); });
            i0.ɵɵtext(14, " + Novo Lan\u00E7amento ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(15, LedgerPageComponent_Conditional_15_Template, 1, 2, "app-dom-bosquinho-state", 7)(16, LedgerPageComponent_Conditional_16_Template, 5, 1, "div", 8)(17, LedgerPageComponent_Conditional_17_Template, 50, 4, "section", 9);
            i0.ɵɵelementStart(18, "section", 10)(19, "div", 11)(20, "label");
            i0.ɵɵtext(21, "Filtro por Natureza");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 12)(23, "button", 13);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_23_listener() { return ctx.onFilterType("ALL"); });
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "button", 13);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_25_listener() { return ctx.onFilterType("INCOME"); });
            i0.ɵɵtext(26, " Receitas ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "button", 13);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_27_listener() { return ctx.onFilterType("EXPENSE"); });
            i0.ɵɵtext(28, " Despesas ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "div", 14)(30, "label", 15);
            i0.ɵɵtext(31, "Busca R\u00E1pida");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "input", 16);
            i0.ɵɵlistener("input", function LedgerPageComponent_Template_input_input_32_listener($event) { return ctx.onSearchInput($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 17)(34, "button", 18);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_34_listener() { return ctx.exportPdf(); });
            i0.ɵɵtext(35, "PDF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "button", 18);
            i0.ɵɵlistener("click", function LedgerPageComponent_Template_button_click_36_listener() { return ctx.exportCsv(); });
            i0.ɵɵtext(37, "CSV");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(38, "section", 19)(39, "div", 20)(40, "span");
            i0.ɵɵtext(41, "Receitas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "strong", 21);
            i0.ɵɵtext(43);
            i0.ɵɵpipe(44, "currency");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 20)(46, "span");
            i0.ɵɵtext(47, "Despesas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "strong", 22);
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "currency");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "div", 20)(52, "span");
            i0.ɵɵtext(53, "Saldo L\u00EDquido");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "strong");
            i0.ɵɵtext(55);
            i0.ɵɵpipe(56, "currency");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "section", 23);
            i0.ɵɵtemplate(58, LedgerPageComponent_Conditional_58_Template, 4, 0, "div", 24)(59, LedgerPageComponent_Conditional_59_Template, 22, 1, "div", 25);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_2_0;
            let tmp_3_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.ledger.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.ledger.loading() ? 11 : 12);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_2_0 = ctx.ledger.error()) ? 15 : -1, tmp_2_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional((tmp_3_0 = ctx.successMessage()) ? 16 : -1, tmp_3_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.showNewEntry() ? 17 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("active", ctx.ledger.filterType() === "ALL");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" Todos (", ctx.ledger.totalCount(), ") ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.ledger.filterType() === "INCOME");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.ledger.filterType() === "EXPENSE");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.searchTerm());
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(44, 21, ctx.ledger.totalIncome(), "BRL", "symbol", "1.2-2"));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(50, 26, ctx.ledger.totalExpense(), "BRL", "symbol", "1.2-2"));
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("text-income", ctx.ledger.netBalance() >= 0)("text-expense", ctx.ledger.netBalance() < 0);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(56, 31, ctx.ledger.netBalance(), "BRL", "symbol", "1.2-2"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.ledger.loading() && ctx.ledger.entries().length === 0 ? 58 : 59);
        } }, dependencies: [CommonModule, i1.CurrencyPipe, i1.DatePipe, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DomBosquinhoStateComponent], styles: [".ledger-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card[_ngcontent-%COMP%] { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .entry-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .highlight-box[_ngcontent-%COMP%] { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .filter-bar[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: flex-end; }\n    .filter-group[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; }\n    .filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .filter-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .pills[_ngcontent-%COMP%] { display: flex; gap: 0.3rem; background: #f1f5f9; padding: 0.2rem; border-radius: 6px; }\n    .pill[_ngcontent-%COMP%] { background: transparent; border: none; font-size: 0.8rem; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer; color: #64748b; }\n    .pill.active[_ngcontent-%COMP%] { background: #fff; color: #1d4ed8; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }\n    .filter-actions[_ngcontent-%COMP%] { display: flex; gap: 0.5rem; }\n    .summary-strip[_ngcontent-%COMP%] { display: flex; gap: 1rem; flex-wrap: wrap; }\n    .summary-item[_ngcontent-%COMP%] { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1.25rem; display: flex; flex-direction: column; gap: 0.2rem; flex: 1; min-width: 160px; }\n    .summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }\n    .summary-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { font-size: 1.25rem; }\n    .table-card[_ngcontent-%COMP%] { padding: 0; overflow: hidden; }\n    .table-responsive[_ngcontent-%COMP%] { overflow-x: auto; }\n    .data-table[_ngcontent-%COMP%] { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .col-date[_ngcontent-%COMP%] { white-space: nowrap; color: #64748b; }\n    .account-cell[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.15rem; }\n    .account-desc[_ngcontent-%COMP%] { color: #0f172a; font-size: 0.85rem; }\n    .account-code[_ngcontent-%COMP%] { color: #64748b; font-size: 0.72rem; font-family: monospace; }\n    .history-cell[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.25rem; }\n    .badge[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }\n    .badge-income[_ngcontent-%COMP%] { background: #dcfce7; color: #15803d; }\n    .badge-expense[_ngcontent-%COMP%] { background: #fee2e2; color: #b91c1c; }\n    .badge-member[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 600; color: #0284c7; background: #e0f2fe; padding: 0.15rem 0.45rem; border-radius: 4px; display: inline-flex; width: fit-content; }\n    .text-income[_ngcontent-%COMP%] { color: #059669; }\n    .text-expense[_ngcontent-%COMP%] { color: #dc2626; }\n    .text-right[_ngcontent-%COMP%] { text-align: right; }\n    .col-amount[_ngcontent-%COMP%] { font-weight: 600; font-variant-numeric: tabular-nums; }\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary[_ngcontent-%COMP%] { background: #1d4ed8; color: #fff; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-sm[_ngcontent-%COMP%] { padding: 0.4rem 0.75rem; font-size: 0.8rem; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner[_ngcontent-%COMP%] { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; display: inline-block; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LedgerPageComponent, [{
        type: Component,
        args: [{ selector: 'app-ledger-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe, DatePipe, DomBosquinhoStateComponent], template: `
    <div class="ledger-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Contabilidade & Governança</span>
          <h1>Livro Razão Contábil</h1>
          <p class="subtitle">Auditoria, conciliação e escrituração das movimentações da comunidade.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn btn-secondary" (click)="onRefresh()" [disabled]="ledger.loading()">
            @if (ledger.loading()) {
              <span class="spinner"></span> Sincronizando...
            } @else {
              Atualizar
            }
          </button>
          <button type="button" class="btn btn-primary" (click)="toggleNewEntryForm()">
            + Novo Lançamento
          </button>
        </div>
      </header>

      <!-- Feedback de Erro com Dom Bosquinho -->
      @if (ledger.error(); as err) {
        <app-dom-bosquinho-state
          mode="error"
          title="Ops! Dom Bosquinho avisa que houve um contratempo"
          [message]="err"
          [showDismiss]="true"
          (retry)="onRefresh()"
          (dismiss)="ledger.clearError()">
        </app-dom-bosquinho-state>
      }
      @if (successMessage(); as msg) {
        <div class="alert alert-success">
          <span>{{ msg }}</span>
          <button class="btn-close" (click)="successMessage.set(null)">&times;</button>
        </div>
      }

      <!-- Formulário de Novo Lançamento (Colapsável) -->
      @if (showNewEntry()) {
        <section class="card form-card">
          <div class="card-title-bar">
            <h3>Novo Registro no Razão</h3>
            <button class="btn-close" (click)="toggleNewEntryForm()">&times;</button>
          </div>
          <form [formGroup]="entryForm" (ngSubmit)="submitEntry()" class="entry-form">
            <div class="form-row">
              <div class="field">
                <label for="type">Natureza</label>
                <select id="type" formControlName="type" (change)="onTypeChange()">
                  <option value="INCOME">Receita (Crédito / Entrada)</option>
                  <option value="EXPENSE">Despesa (Débito / Saída)</option>
                </select>
              </div>
              <div class="field flex-2">
                <label for="accountCode">Conta Contábil (Plano de Contas)</label>
                <select id="accountCode" formControlName="accountCode">
                  @for (acc of currentAccountOptions(); track acc.code) {
                    <option [value]="acc.code">{{ acc.name }}</option>
                  }
                </select>
              </div>
              <div class="field">
                <label for="amount">Valor (R$)</label>
                <input id="amount" type="number" step="0.01" formControlName="amount" placeholder="0.00" />
              </div>
              <div class="field">
                <label for="occurredOn">Data</label>
                <input id="occurredOn" type="date" formControlName="occurredOn" />
              </div>
            </div>

            <div class="form-row">
              <div class="field flex-2">
                <label for="description">Histórico / Descrição</label>
                <input id="description" type="text" formControlName="description" placeholder="Ex: Doação de campanha comunitária" />
              </div>
              <div class="field">
                <label for="costCenter">Centro de Custo</label>
                <input id="costCenter" type="text" formControlName="costCenter" placeholder="Ex: Pastoral Familiar" />
              </div>
              <div class="field">
                <label for="referenceCode">Cód. Referência (Doc/Recibo)</label>
                <input id="referenceCode" type="text" formControlName="referenceCode" placeholder="Ex: REC-1024, NF-3450" />
              </div>
            </div>

            @if (currentNature() === 'INCOME') {
              <div class="form-row highlight-box">
                <div class="field flex-2">
                  <label for="memberId">
                    <span>👤 Membro / Dizimista Vinculado (Opcional)</span>
                  </label>
                  <select id="memberId" formControlName="memberId">
                    <option value="">Nenhum (Movimentação geral da paróquia)</option>
                    @for (m of memberService.members(); track m.id) {
                      <option [value]="m.id">{{ m.name }}</option>
                    }
                  </select>
                </div>
              </div>
            }

            <div class="form-actions">
              <button type="button" class="btn btn-secondary" (click)="toggleNewEntryForm()">Cancelar</button>
              <button type="submit" class="btn btn-primary" [disabled]="entryForm.invalid || ledger.loading()">
                @if (ledger.loading()) {
                  <span class="spinner"></span> Salvando...
                } @else {
                  Salvar Lançamento
                }
              </button>
            </div>
          </form>
        </section>
      }

      <!-- Painel de Filtros e Busca -->
      <section class="card filter-bar">
        <div class="filter-group">
          <label>Filtro por Natureza</label>
          <div class="pills">
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'ALL'"
              (click)="onFilterType('ALL')">
              Todos ({{ ledger.totalCount() }})
            </button>
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'INCOME'"
              (click)="onFilterType('INCOME')">
              Receitas
            </button>
            <button
              type="button"
              class="pill"
              [class.active]="ledger.filterType() === 'EXPENSE'"
              (click)="onFilterType('EXPENSE')">
              Despesas
            </button>
          </div>
        </div>

        <div class="filter-group flex-1">
          <label for="searchTerm">Busca Rápida</label>
          <input
            id="searchTerm"
            type="search"
            [value]="searchTerm()"
            (input)="onSearchInput($event)"
            placeholder="Filtrar por descrição, conta, membro ou centro de custo..."
          />
        </div>

        <div class="filter-actions">
          <button type="button" class="btn btn-secondary btn-sm" (click)="exportPdf()">PDF</button>
          <button type="button" class="btn btn-secondary btn-sm" (click)="exportCsv()">CSV</button>
        </div>
      </section>

      <!-- Totais Rápidos do Período -->
      <section class="summary-strip">
        <div class="summary-item">
          <span>Receitas</span>
          <strong class="text-income">{{ ledger.totalIncome() | currency:'BRL':'symbol':'1.2-2' }}</strong>
        </div>
        <div class="summary-item">
          <span>Despesas</span>
          <strong class="text-expense">{{ ledger.totalExpense() | currency:'BRL':'symbol':'1.2-2' }}</strong>
        </div>
        <div class="summary-item">
          <span>Saldo Líquido</span>
          <strong [class.text-income]="ledger.netBalance() >= 0" [class.text-expense]="ledger.netBalance() < 0">
            {{ ledger.netBalance() | currency:'BRL':'symbol':'1.2-2' }}
          </strong>
        </div>
      </section>

      <!-- Tabela Analítica com Vínculo de Membros -->
      <section class="card table-card">
        @if (ledger.loading() && ledger.entries().length === 0) {
          <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Carregando livro razão...</p>
          </div>
        } @else {
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Conta</th>
                  <th>Referência</th>
                  <th>Centro de Custo</th>
                  <th>Histórico Contábil / Vínculo</th>
                  <th>Natureza</th>
                  <th class="text-right">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                @for (entry of searchedEntries(); track entry.id) {
                  <tr>
                    <td class="col-date">{{ entry.occurredOn | date:'dd/MM/yyyy' }}</td>
                    <td>
                      <div class="account-cell">
                        <strong class="account-desc">{{ getAccountName(entry.accountCode) }}</strong>
                        <span class="account-code">{{ entry.accountCode }}</span>
                      </div>
                    </td>
                    <td class="text-muted">{{ entry.referenceCode }}</td>
                    <td>{{ entry.costCenter }}</td>
                    <td>
                      <div class="history-cell">
                        <strong>{{ entry.description }}</strong>
                        @if (entry.memberId) {
                          <span class="badge-member">
                            👤 {{ getMemberName(entry.memberId) }}
                          </span>
                        }
                      </div>
                    </td>
                    <td>
                      @if (entry.type === 'INCOME') {
                        <span class="badge badge-income">Receita</span>
                      } @else {
                        <span class="badge badge-expense">Despesa</span>
                      }
                    </td>
                    <td class="text-right col-amount" [class.text-income]="entry.type === 'INCOME'" [class.text-expense]="entry.type === 'EXPENSE'">
                      @if (entry.type === 'INCOME') { + } @else { - }
                      {{ entry.amount | currency:'BRL':'symbol':'1.2-2' }}
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="empty-state">
                      <p>Nenhum lançamento contábil encontrado para o filtro aplicado.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </div>
  `, styles: ["\n    .ledger-container { display: flex; flex-direction: column; gap: 1.25rem; }\n    .page-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }\n    .page-header h1 { margin: 0.2rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin: 0.25rem 0 0; }\n    .header-actions { display: flex; gap: 0.6rem; align-items: center; }\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .form-card { box-shadow: 0 4px 12px rgba(0,0,0,0.06); }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.6rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .entry-form { display: flex; flex-direction: column; gap: 1rem; }\n    .form-row { display: flex; flex-wrap: wrap; gap: 1rem; }\n    .highlight-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 140px; }\n    .flex-2 { flex: 2; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input, .field select { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .form-actions { display: flex; justify-content: flex-end; gap: 0.6rem; }\n    .filter-bar { display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: flex-end; }\n    .filter-group { display: flex; flex-direction: column; gap: 0.35rem; }\n    .filter-group label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .filter-group input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; }\n    .pills { display: flex; gap: 0.3rem; background: #f1f5f9; padding: 0.2rem; border-radius: 6px; }\n    .pill { background: transparent; border: none; font-size: 0.8rem; padding: 0.4rem 0.7rem; border-radius: 4px; cursor: pointer; color: #64748b; }\n    .pill.active { background: #fff; color: #1d4ed8; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }\n    .filter-actions { display: flex; gap: 0.5rem; }\n    .summary-strip { display: flex; gap: 1rem; flex-wrap: wrap; }\n    .summary-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1.25rem; display: flex; flex-direction: column; gap: 0.2rem; flex: 1; min-width: 160px; }\n    .summary-item span { font-size: 0.75rem; text-transform: uppercase; font-weight: 600; color: #64748b; }\n    .summary-item strong { font-size: 1.25rem; }\n    .table-card { padding: 0; overflow: hidden; }\n    .table-responsive { overflow-x: auto; }\n    .data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem; }\n    .data-table th { background: #f8fafc; color: #475569; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; }\n    .data-table td { padding: 0.8rem 1rem; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }\n    .col-date { white-space: nowrap; color: #64748b; }\n    .account-cell { display: flex; flex-direction: column; gap: 0.15rem; }\n    .account-desc { color: #0f172a; font-size: 0.85rem; }\n    .account-code { color: #64748b; font-size: 0.72rem; font-family: monospace; }\n    .history-cell { display: flex; flex-direction: column; gap: 0.25rem; }\n    .badge { font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 9999px; }\n    .badge-income { background: #dcfce7; color: #15803d; }\n    .badge-expense { background: #fee2e2; color: #b91c1c; }\n    .badge-member { font-size: 0.75rem; font-weight: 600; color: #0284c7; background: #e0f2fe; padding: 0.15rem 0.45rem; border-radius: 4px; display: inline-flex; width: fit-content; }\n    .text-income { color: #059669; }\n    .text-expense { color: #dc2626; }\n    .text-right { text-align: right; }\n    .col-amount { font-weight: 600; font-variant-numeric: tabular-nums; }\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn-primary { background: #1d4ed8; color: #fff; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-sm { padding: 0.4rem 0.75rem; font-size: 0.8rem; }\n    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #94a3b8; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 2.5rem 1rem; }\n    .loading-state { text-align: center; padding: 3rem 1rem; color: #64748b; }\n    .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LedgerPageComponent, { className: "LedgerPageComponent", filePath: "src\\app\\pages\\ledger-page.component.ts", lineNumber: 333 }); })();
//# sourceMappingURL=ledger-page.component.js.map