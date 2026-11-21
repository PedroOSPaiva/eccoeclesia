import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../core/services/report.service';
import { AuthService } from '../core/services/auth.service';
import { CommunityService } from '../core/services/community.service';
import { ParishLeadershipService } from '../core/services/parish-leadership.service';
import { DomBosquinhoStateComponent } from '../shared/components/dom-bosquinho-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
function ReportsPageComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-dom-bosquinho-state", 23);
    i0.ɵɵlistener("retry", function ReportsPageComponent_Conditional_9_Template_app_dom_bosquinho_state_retry_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.generatePreview()); })("dismiss", function ReportsPageComponent_Conditional_9_Template_app_dom_bosquinho_state_dismiss_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reportService.clearError()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", ctx)("showDismiss", true);
} }
function ReportsPageComponent_Conditional_10_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 31);
    i0.ɵɵlistener("click", function ReportsPageComponent_Conditional_10_Conditional_11_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.leadershipSuccess.set(null)); });
    i0.ɵɵtext(4, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.leadershipSuccess());
} }
function ReportsPageComponent_Conditional_10_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 28)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx);
} }
function ReportsPageComponent_Conditional_10_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵelement(1, "div", 32);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Carregando respons\u00E1veis paroquiais...");
    i0.ɵɵelementEnd()();
} }
function ReportsPageComponent_Conditional_10_Conditional_14_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "div", 34)(2, "label");
    i0.ɵɵtext(3, "Cargo / Fun\u00E7\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 35);
    i0.ɵɵlistener("input", function ReportsPageComponent_Conditional_10_Conditional_14_For_2_Template_input_input_4_listener($event) { const ɵ$index_64_r6 = i0.ɵɵrestoreView(_r5).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateLeaderField(ɵ$index_64_r6, "role", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 36)(6, "label");
    i0.ɵɵtext(7, "Nome Oficial do Respons\u00E1vel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 37);
    i0.ɵɵlistener("input", function ReportsPageComponent_Conditional_10_Conditional_14_For_2_Template_input_input_8_listener($event) { const ɵ$index_64_r6 = i0.ɵɵrestoreView(_r5).$index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateLeaderField(ɵ$index_64_r6, "name", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 38)(10, "button", 39);
    i0.ɵɵlistener("click", function ReportsPageComponent_Conditional_10_Conditional_14_For_2_Template_button_click_10_listener() { const leader_r7 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.saveLeaderItem(leader_r7)); });
    i0.ɵɵtext(11, " Salvar Altera\u00E7\u00E3o ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const leader_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", leader_r7.role);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", leader_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.leadershipService.loading());
} }
function ReportsPageComponent_Conditional_10_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵrepeaterCreate(1, ReportsPageComponent_Conditional_10_Conditional_14_For_2_Template, 12, 3, "div", 33, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.leadersList());
} }
function ReportsPageComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 5)(1, "div", 24)(2, "div")(3, "span", 25);
    i0.ɵɵtext(4, "Administra\u00E7\u00E3o Paroquial");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6, "Respons\u00E1veis Paroquiais (P\u00E1roco, Vig\u00E1rios e Tesoureiros)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 3);
    i0.ɵɵtext(8, "Edite os nomes oficiais que constam no cabe\u00E7alho e assinaturas do relat\u00F3rio em PDF.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 26);
    i0.ɵɵlistener("click", function ReportsPageComponent_Conditional_10_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadLeaders()); });
    i0.ɵɵtext(10, " Atualizar Nomes ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, ReportsPageComponent_Conditional_10_Conditional_11_Template, 5, 1, "div", 27)(12, ReportsPageComponent_Conditional_10_Conditional_12_Template, 3, 1, "div", 28)(13, ReportsPageComponent_Conditional_10_Conditional_13_Template, 4, 0, "div", 29)(14, ReportsPageComponent_Conditional_10_Conditional_14_Template, 3, 0, "div", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r1.leadershipSuccess() ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_2_0 = ctx_r1.leadershipService.error()) ? 12 : -1, tmp_2_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.leadershipService.loading() && ctx_r1.leadersList().length === 0 ? 13 : 14);
} }
function ReportsPageComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 40);
    i0.ɵɵtext(1, " Gerando... ");
} }
function ReportsPageComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Visualizar Pr\u00E9via ");
} }
function ReportsPageComponent_Conditional_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "div", 32);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Processando livro raz\u00E3o e consolidando lan\u00E7amentos cont\u00E1beis...");
    i0.ɵɵelementEnd()();
} }
function ReportsPageComponent_Conditional_42_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "pre", 41);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx);
} }
function ReportsPageComponent_Conditional_42_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "p");
    i0.ɵɵtext(2, "Selecione um intervalo de datas e clique em ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, "Visualizar Pr\u00E9via");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " ou baixe diretamente em PDF/CSV.");
    i0.ɵɵelementEnd()();
} }
function ReportsPageComponent_Conditional_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ReportsPageComponent_Conditional_42_Conditional_0_Template, 2, 1, "pre", 41)(1, ReportsPageComponent_Conditional_42_Conditional_1_Template, 6, 0, "div", 42);
} if (rf & 2) {
    let tmp_1_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵconditional((tmp_1_0 = ctx_r1.reportService.preview()) ? 0 : 1, tmp_1_0);
} }
export class ReportsPageComponent {
    reportService = inject(ReportService);
    authService = inject(AuthService);
    communityService = inject(CommunityService);
    leadershipService = inject(ParishLeadershipService);
    fb = inject(FormBuilder);
    isAdmin = computed(() => this.authService.role() === 'ADMIN');
    leadersList = signal([]);
    leadershipSuccess = signal(null);
    // Inicializa o período no primeiro dia do mês corrente até a data de hoje
    now = new Date();
    firstDayOfMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1).toISOString().substring(0, 10);
    today = this.now.toISOString().substring(0, 10);
    filterForm = this.fb.group({
        start: [this.firstDayOfMonth, Validators.required],
        end: [this.today, Validators.required],
    });
    constructor() {
        effect(() => {
            // Reage automaticamente quando a comunidade ativa muda no seletor global do header
            const commId = this.communityService.activeCommunityId();
            this.generatePreview();
        });
    }
    ngOnInit() {
        this.generatePreview();
        if (this.isAdmin()) {
            this.loadLeaders();
        }
    }
    loadLeaders() {
        this.leadershipService.loadLeaders().subscribe({
            next: (res) => this.leadersList.set(res),
        });
    }
    updateLeaderField(index, field, event) {
        const val = event.target.value;
        this.leadersList.update((list) => {
            const copy = [...list];
            copy[index] = { ...copy[index], [field]: val };
            return copy;
        });
    }
    saveLeaderItem(leader) {
        this.leadershipService.saveLeader(leader).subscribe({
            next: () => {
                this.leadershipSuccess.set(`Responsável "${leader.name}" atualizado com sucesso!`);
            },
        });
    }
    generatePreview() {
        const { start, end } = this.filterForm.getRawValue();
        const commId = this.communityService.activeCommunityId();
        this.reportService.fetchLedgerReportPreview(start || undefined, end || undefined, commId).subscribe();
    }
    downloadPdf() {
        const { start, end } = this.filterForm.getRawValue();
        const commId = this.communityService.activeCommunityId();
        this.reportService.downloadLedgerPdf(start || undefined, end || undefined, commId);
    }
    downloadCsv() {
        const { start, end } = this.filterForm.getRawValue();
        const commId = this.communityService.activeCommunityId();
        this.reportService.downloadLedgerCsv(start || undefined, end || undefined, commId);
    }
    static ɵfac = function ReportsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReportsPageComponent, selectors: [["app-reports-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 43, vars: 9, consts: [[1, "reports-container"], [1, "page-header"], [1, "badge-tag"], [1, "subtitle"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "message", "showDismiss"], [1, "card", "leadership-card"], [1, "card", "filter-card"], [1, "filter-form", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "startDate"], ["id", "startDate", "type", "date", "formControlName", "start"], ["for", "endDate"], ["id", "endDate", "type", "date", "formControlName", "end"], [1, "scope-display"], [1, "badge-scope"], [1, "actions"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-pdf", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-csv", 3, "click", "disabled"], [1, "card", "preview-card"], [1, "preview-header"], [1, "text-hint"], [1, "loading-box"], ["mode", "error", "title", "Ops! Dom Bosquinho avisa que houve um contratempo", 3, "retry", "dismiss", "message", "showDismiss"], [1, "card-title-bar"], [1, "badge-admin"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", 3, "click"], [1, "alert", "alert-success"], [1, "alert", "alert-error"], [1, "loading-state"], [1, "leaders-list"], [1, "btn-close", 3, "click"], [1, "spinner-large"], [1, "leader-row"], [1, "field", "flex-1"], ["type", "text", "placeholder", "Ex: P\u00E1roco, Tesoureiro", 3, "input", "value"], [1, "field", "flex-2"], ["type", "text", "placeholder", "Ex: Pe. Jo\u00E3o Silva, Maria Silva", 3, "input", "value"], [1, "leader-actions"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", 3, "click", "disabled"], [1, "spinner"], [1, "report-terminal"], [1, "empty-state"]], template: function ReportsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div")(3, "span", 2);
            i0.ɵɵtext(4, "M\u00F3dulo Financeiro & Fiscal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "h1");
            i0.ɵɵtext(6, "Relat\u00F3rios do Raz\u00E3o Cont\u00E1bil");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 3);
            i0.ɵɵtext(8, "Emiss\u00E3o de balancetes, extratos anal\u00EDticos e exporta\u00E7\u00E3o oficial em PDF e CSV.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(9, ReportsPageComponent_Conditional_9_Template, 1, 2, "app-dom-bosquinho-state", 4)(10, ReportsPageComponent_Conditional_10_Template, 15, 3, "section", 5);
            i0.ɵɵelementStart(11, "section", 6)(12, "form", 7);
            i0.ɵɵlistener("ngSubmit", function ReportsPageComponent_Template_form_ngSubmit_12_listener() { return ctx.generatePreview(); });
            i0.ɵɵelementStart(13, "div", 8)(14, "label", 9);
            i0.ɵɵtext(15, "Data Inicial");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(16, "input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 8)(18, "label", 11);
            i0.ɵɵtext(19, "Data Final");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(20, "input", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 8)(22, "label");
            i0.ɵɵtext(23, "\u00C2mbito / Comunidade");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 13)(25, "span", 14);
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "div", 15)(28, "button", 16);
            i0.ɵɵtemplate(29, ReportsPageComponent_Conditional_29_Template, 2, 0)(30, ReportsPageComponent_Conditional_30_Template, 1, 0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "button", 17);
            i0.ɵɵlistener("click", function ReportsPageComponent_Template_button_click_31_listener() { return ctx.downloadPdf(); });
            i0.ɵɵtext(32, " Baixar PDF Oficial ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "button", 18);
            i0.ɵɵlistener("click", function ReportsPageComponent_Template_button_click_33_listener() { return ctx.downloadCsv(); });
            i0.ɵɵtext(34, " Exportar CSV ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "section", 19)(36, "div", 20)(37, "h3");
            i0.ɵɵtext(38, "Espelho Anal\u00EDtico do Balancete");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span", 21);
            i0.ɵɵtext(40, "Fonte de dados: Backend Java 21 REST API (/api/reports/ledger)");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(41, ReportsPageComponent_Conditional_41_Template, 4, 0, "div", 22)(42, ReportsPageComponent_Conditional_42_Template, 2, 1);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_0_0;
            let tmp_3_0;
            i0.ɵɵadvance(9);
            i0.ɵɵconditional((tmp_0_0 = ctx.reportService.error()) ? 9 : -1, tmp_0_0);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isAdmin() ? 10 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.filterForm);
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate1(" ", ((tmp_3_0 = ctx.communityService.activeCommunity()) == null ? null : tmp_3_0.name) || "Todas as Comunidades (Consolidado)", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.reportService.loading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.reportService.loading() ? 29 : 30);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.reportService.loading());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.reportService.loading());
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.reportService.loading() ? 41 : 42);
        } }, dependencies: [CommonModule, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, DomBosquinhoStateComponent], styles: [".reports-container[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.5rem; }\n    .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] { margin: 0.25rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag[_ngcontent-%COMP%] { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .badge-admin[_ngcontent-%COMP%] { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.15rem 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 0.25rem; }\n    .subtitle[_ngcontent-%COMP%] { color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }\n    .card[_ngcontent-%COMP%] { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .card-title-bar[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }\n    .card-title-bar[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.15rem; color: #0f172a; }\n    .leadership-card[_ngcontent-%COMP%] { border-left: 4px solid #7c3aed; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }\n    .leaders-list[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.85rem; }\n    .leader-row[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; background: #faf5ff; padding: 0.85rem; border-radius: 8px; border: 1px solid #f3e8ff; }\n    .leader-actions[_ngcontent-%COMP%] { display: flex; align-items: flex-end; }\n    .filter-card[_ngcontent-%COMP%] { box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\n    .filter-form[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; }\n    .field[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.35rem; }\n    .flex-1[_ngcontent-%COMP%] { flex: 1; min-width: 150px; }\n    .flex-2[_ngcontent-%COMP%] { flex: 2; min-width: 250px; }\n    .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .scope-display[_ngcontent-%COMP%] { display: flex; align-items: center; height: 38px; }\n    .badge-scope[_ngcontent-%COMP%] { font-size: 0.85rem; font-weight: 600; color: #1e40af; background: #dbeafe; padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid #bfdbfe; }\n    .actions[_ngcontent-%COMP%] { display: flex; gap: 0.6rem; align-items: center; }\n    .btn[_ngcontent-%COMP%] { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn[_ngcontent-%COMP%]:disabled { opacity: 0.6; cursor: not-allowed; }\n    .btn-primary[_ngcontent-%COMP%] { background: #1d4ed8; color: #fff; }\n    .btn-secondary[_ngcontent-%COMP%] { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-sm[_ngcontent-%COMP%] { padding: 0.45rem 0.8rem; font-size: 0.8rem; }\n    .btn-pdf[_ngcontent-%COMP%] { background: #dc2626; color: #fff; }\n    .btn-csv[_ngcontent-%COMP%] { background: #059669; color: #fff; }\n    .preview-card[_ngcontent-%COMP%] { min-height: 300px; }\n    .preview-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }\n    .preview-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .text-hint[_ngcontent-%COMP%] { font-size: 0.75rem; color: #94a3b8; }\n    .report-terminal[_ngcontent-%COMP%] { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.5; white-space: pre-wrap; }\n    .alert[_ngcontent-%COMP%] { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }\n    .alert-error[_ngcontent-%COMP%] { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success[_ngcontent-%COMP%] { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .btn-close[_ngcontent-%COMP%] { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: inherit; }\n    .empty-state[_ngcontent-%COMP%] { text-align: center; color: #94a3b8; padding: 3rem 1rem; }\n    .loading-box[_ngcontent-%COMP%], .loading-state[_ngcontent-%COMP%] { text-align: center; padding: 2.5rem 1rem; color: #64748b; }\n    .spinner[_ngcontent-%COMP%] { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; display: inline-block; }\n    .spinner-large[_ngcontent-%COMP%] { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: _ngcontent-%COMP%_spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsPageComponent, [{
        type: Component,
        args: [{ selector: 'app-reports-page', standalone: true, imports: [CommonModule, FormsModule, ReactiveFormsModule, DomBosquinhoStateComponent], template: `
    <div class="reports-container">
      <header class="page-header">
        <div>
          <span class="badge-tag">Módulo Financeiro & Fiscal</span>
          <h1>Relatórios do Razão Contábil</h1>
          <p class="subtitle">Emissão de balancetes, extratos analíticos e exportação oficial em PDF e CSV.</p>
        </div>
      </header>

      <!-- Feedback de Erro com Dom Bosquinho -->
      @if (reportService.error(); as err) {
        <app-dom-bosquinho-state
          mode="error"
          title="Ops! Dom Bosquinho avisa que houve um contratempo"
          [message]="err"
          [showDismiss]="true"
          (retry)="generatePreview()"
          (dismiss)="reportService.clearError()">
        </app-dom-bosquinho-state>
      }

      <!-- Painel de Gerenciamento de Liderança Paroquial (Apenas para ADMIN) -->
      @if (isAdmin()) {
        <section class="card leadership-card">
          <div class="card-title-bar">
            <div>
              <span class="badge-admin">Administração Paroquial</span>
              <h3>Responsáveis Paroquiais (Pároco, Vigários e Tesoureiros)</h3>
              <p class="subtitle">Edite os nomes oficiais que constam no cabeçalho e assinaturas do relatório em PDF.</p>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" (click)="loadLeaders()">
              Atualizar Nomes
            </button>
          </div>

          @if (leadershipSuccess()) {
            <div class="alert alert-success">
              <span>{{ leadershipSuccess() }}</span>
              <button class="btn-close" (click)="leadershipSuccess.set(null)">&times;</button>
            </div>
          }
          @if (leadershipService.error(); as lErr) {
            <div class="alert alert-error">
              <span>{{ lErr }}</span>
            </div>
          }

          @if (leadershipService.loading() && leadersList().length === 0) {
            <div class="loading-state">
              <div class="spinner-large"></div>
              <p>Carregando responsáveis paroquiais...</p>
            </div>
          } @else {
            <div class="leaders-list">
              @for (leader of leadersList(); track leader.id; let idx = $index) {
                <div class="leader-row">
                  <div class="field flex-1">
                    <label>Cargo / Função</label>
                    <input type="text" [value]="leader.role" (input)="updateLeaderField(idx, 'role', $event)" placeholder="Ex: Pároco, Tesoureiro" />
                  </div>
                  <div class="field flex-2">
                    <label>Nome Oficial do Responsável</label>
                    <input type="text" [value]="leader.name" (input)="updateLeaderField(idx, 'name', $event)" placeholder="Ex: Pe. João Silva, Maria Silva" />
                  </div>
                  <div class="leader-actions">
                    <button type="button" class="btn btn-primary btn-sm" (click)="saveLeaderItem(leader)" [disabled]="leadershipService.loading()">
                      Salvar Alteração
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </section>
      }

      <!-- Painel de Filtros e Exportação -->
      <section class="card filter-card">
        <form [formGroup]="filterForm" (ngSubmit)="generatePreview()" class="filter-form">
          <div class="field">
            <label for="startDate">Data Inicial</label>
            <input id="startDate" type="date" formControlName="start" />
          </div>

          <div class="field">
            <label for="endDate">Data Final</label>
            <input id="endDate" type="date" formControlName="end" />
          </div>

          <div class="field">
            <label>Âmbito / Comunidade</label>
            <div class="scope-display">
              <span class="badge-scope">
                {{ communityService.activeCommunity()?.name || 'Todas as Comunidades (Consolidado)' }}
              </span>
            </div>
          </div>

          <div class="actions">
            <button type="submit" class="btn btn-primary" [disabled]="reportService.loading()">
              @if (reportService.loading()) {
                <span class="spinner"></span> Gerando...
              } @else {
                Visualizar Prévia
              }
            </button>

            <button type="button" class="btn btn-pdf" (click)="downloadPdf()" [disabled]="reportService.loading()">
              Baixar PDF Oficial
            </button>

            <button type="button" class="btn btn-csv" (click)="downloadCsv()" [disabled]="reportService.loading()">
              Exportar CSV
            </button>
          </div>
        </form>
      </section>

      <!-- Prévia do Relatório -->
      <section class="card preview-card">
        <div class="preview-header">
          <h3>Espelho Analítico do Balancete</h3>
          <span class="text-hint">Fonte de dados: Backend Java 21 REST API (/api/reports/ledger)</span>
        </div>

        @if (reportService.loading()) {
          <div class="loading-box">
            <div class="spinner-large"></div>
            <p>Processando livro razão e consolidando lançamentos contábeis...</p>
          </div>
        } @else {
          @if (reportService.preview(); as previewText) {
            <pre class="report-terminal">{{ previewText }}</pre>
          } @else {
            <div class="empty-state">
              <p>Selecione um intervalo de datas e clique em <strong>Visualizar Prévia</strong> ou baixe diretamente em PDF/CSV.</p>
            </div>
          }
        }
      </section>
    </div>
  `, styles: ["\n    .reports-container { display: flex; flex-direction: column; gap: 1.5rem; }\n    .page-header h1 { margin: 0.25rem 0 0; color: #0f172a; font-size: 1.75rem; }\n    .badge-tag { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #2563eb; background: #eff6ff; padding: 0.2rem 0.5rem; border-radius: 4px; }\n    .badge-admin { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #f5f3ff; padding: 0.15rem 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 0.25rem; }\n    .subtitle { color: #64748b; font-size: 0.875rem; margin-top: 0.25rem; }\n    .card { background: #fff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 1.25rem; }\n    .card-title-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }\n    .card-title-bar h3 { margin: 0; font-size: 1.15rem; color: #0f172a; }\n    .leadership-card { border-left: 4px solid #7c3aed; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }\n    .leaders-list { display: flex; flex-direction: column; gap: 0.85rem; }\n    .leader-row { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; background: #faf5ff; padding: 0.85rem; border-radius: 8px; border: 1px solid #f3e8ff; }\n    .leader-actions { display: flex; align-items: flex-end; }\n    .filter-card { box-shadow: 0 1px 3px rgba(0,0,0,0.05); }\n    .filter-form { display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-end; }\n    .field { display: flex; flex-direction: column; gap: 0.35rem; }\n    .flex-1 { flex: 1; min-width: 150px; }\n    .flex-2 { flex: 2; min-width: 250px; }\n    .field label { font-size: 0.8rem; font-weight: 600; color: #475569; }\n    .field input { padding: 0.55rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.875rem; background: #fff; }\n    .scope-display { display: flex; align-items: center; height: 38px; }\n    .badge-scope { font-size: 0.85rem; font-weight: 600; color: #1e40af; background: #dbeafe; padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid #bfdbfe; }\n    .actions { display: flex; gap: 0.6rem; align-items: center; }\n    .btn { padding: 0.6rem 1rem; border-radius: 8px; font-weight: 500; font-size: 0.875rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 0.4rem; }\n    .btn:disabled { opacity: 0.6; cursor: not-allowed; }\n    .btn-primary { background: #1d4ed8; color: #fff; }\n    .btn-secondary { background: #fff; color: #334155; border: 1px solid #cbd5e1; }\n    .btn-sm { padding: 0.45rem 0.8rem; font-size: 0.8rem; }\n    .btn-pdf { background: #dc2626; color: #fff; }\n    .btn-csv { background: #059669; color: #fff; }\n    .preview-card { min-height: 300px; }\n    .preview-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; margin-bottom: 1rem; }\n    .preview-header h3 { margin: 0; font-size: 1.1rem; color: #0f172a; }\n    .text-hint { font-size: 0.75rem; color: #94a3b8; }\n    .report-terminal { background: #0f172a; color: #e2e8f0; padding: 1.25rem; border-radius: 8px; font-family: 'Courier New', Courier, monospace; font-size: 0.85rem; overflow-x: auto; line-height: 1.5; white-space: pre-wrap; }\n    .alert { padding: 0.75rem 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }\n    .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }\n    .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; }\n    .btn-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: inherit; }\n    .empty-state { text-align: center; color: #94a3b8; padding: 3rem 1rem; }\n    .loading-box, .loading-state { text-align: center; padding: 2.5rem 1rem; color: #64748b; }\n    .spinner { width: 14px; height: 14px; border: 2px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }\n    .spinner-large { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #1d4ed8; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 0.75rem; }\n    @keyframes spin { to { transform: rotate(360deg); } }\n  "] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ReportsPageComponent, { className: "ReportsPageComponent", filePath: "src\\app\\pages\\reports-page.component.ts", lineNumber: 203 }); })();
//# sourceMappingURL=reports-page.component.js.map