import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
function DomBosquinhoStateComponent_Conditional_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelement(1, "span", 66);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Carregando dados da comunidade...");
    i0.ɵɵelementEnd()();
} }
function DomBosquinhoStateComponent_Conditional_72_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 71);
    i0.ɵɵlistener("click", function DomBosquinhoStateComponent_Conditional_72_Conditional_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onDismissClick()); });
    i0.ɵɵtext(1, " Dispensar ");
    i0.ɵɵelementEnd();
} }
function DomBosquinhoStateComponent_Conditional_72_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 65)(1, "button", 67);
    i0.ɵɵlistener("click", function DomBosquinhoStateComponent_Conditional_72_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRetryClick()); });
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 68);
    i0.ɵɵelement(3, "path", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, DomBosquinhoStateComponent_Conditional_72_Conditional_5_Template, 2, 0, "button", 70);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.retryLabel, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showDismiss ? 5 : -1);
} }
export class DomBosquinhoStateComponent {
    mode = 'error';
    title;
    message;
    showRetry = true;
    showDismiss = false;
    retryLabel = 'Tentar Novamente';
    retry = new EventEmitter();
    dismiss = new EventEmitter();
    get displayTitle() {
        if (this.title)
            return this.title;
        return this.mode === 'loading'
            ? 'Buscando registros com dedicação...'
            : 'Calma, já vamos resolver!';
    }
    get displayMessage() {
        if (this.message)
            return this.message;
        return this.mode === 'loading'
            ? 'Dom Bosquinho está conectando ao servidor paroquial para trazer as informações atualizadas.'
            : 'Dom Bosco nos ensina a nunca perder a paz e a alegria! Tivemos uma pequena dificuldade para carregar os dados desta tela. Que tal tentar novamente?';
    }
    onRetryClick() {
        this.retry.emit();
    }
    onDismissClick() {
        this.dismiss.emit();
    }
    static ɵfac = function DomBosquinhoStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DomBosquinhoStateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DomBosquinhoStateComponent, selectors: [["app-dom-bosquinho-state"]], inputs: { mode: "mode", title: "title", message: "message", showRetry: "showRetry", showDismiss: "showDismiss", retryLabel: "retryLabel" }, outputs: { retry: "retry", dismiss: "dismiss" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 73, vars: 8, consts: [["role", "alert", 1, "dom-bosco-card"], [1, "character-container"], ["viewBox", "0 0 160 160", "width", "135", "height", "135", "role", "img", "aria-label", "S\u00E3o Jo\u00E3o Bosco", 1, "dom-bosco-svg"], ["id", "db-halo", "x1", "0", "y1", "0", "x2", "1", "y2", "1"], ["offset", "0%", "stop-color", "#fef08a"], ["offset", "50%", "stop-color", "#f59e0b"], ["offset", "100%", "stop-color", "#d97706"], ["id", "db-bg", "cx", "50%", "cy", "45%", "r", "60%"], ["offset", "0%", "stop-color", "#ffffff"], ["offset", "70%", "stop-color", "#fefce8"], ["offset", "100%", "stop-color", "#fef3c7"], ["id", "db-cassock", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-color", "#1e293b"], ["offset", "100%", "stop-color", "#0f172a"], ["id", "db-hair", "x1", "0", "y1", "0", "x2", "1", "y2", "1"], ["offset", "0%", "stop-color", "#3d2c1e"], ["offset", "50%", "stop-color", "#241a12"], ["offset", "100%", "stop-color", "#17100b"], ["id", "db-skin", "x1", "0", "y1", "0", "x2", "0", "y2", "1"], ["offset", "0%", "stop-color", "#ffedd5"], ["offset", "100%", "stop-color", "#fed7aa"], ["cx", "80", "cy", "80", "r", "74", "fill", "url(#db-bg)", "stroke", "#fde047", "stroke-width", "1.5"], ["cx", "80", "cy", "62", "r", "50", "fill", "none", "stroke", "url(#db-halo)", "stroke-width", "2.5", "stroke-dasharray", "8 4", "opacity", "0.85", 1, "halo-circle"], ["cx", "80", "cy", "62", "r", "46", "fill", "#fef9c3", "opacity", "0.35"], ["d", "M34 154 C35 130, 48 114, 64 109 L96 109 C112 114, 125 130, 126 154 Z", "fill", "url(#db-cassock)"], ["d", "M80 119 L80 154", "stroke", "#334155", "stroke-width", "1.5"], ["cx", "80", "cy", "126", "r", "1.5", "fill", "#475569"], ["cx", "80", "cy", "135", "r", "1.5", "fill", "#475569"], ["cx", "80", "cy", "144", "r", "1.5", "fill", "#475569"], ["d", "M68 108 L92 108 L89 120 L71 120 Z", "fill", "#ffffff", "stroke", "#cbd5e1", "stroke-width", "0.8"], ["d", "M74 108 L86 108 L85 117 L75 117 Z", "fill", "#f8fafc"], ["d", "M70 94 L70 110 L90 110 L90 94 Z", "fill", "url(#db-skin)"], ["d", "M70 94 C76 99, 84 99, 90 94 L90 100 C84 103, 76 103, 70 100 Z", "fill", "#fbcfe8", "opacity", "0.3"], ["d", "M51 72 C49 68, 48 80, 52 83 C54 84, 55 80, 54 74 Z", "fill", "#fed7aa"], ["d", "M52 74 C51 75, 51 79, 53 80", "stroke", "#f97316", "stroke-width", "0.8", "fill", "none", "opacity", "0.5"], ["d", "M109 72 C111 68, 112 80, 108 83 C106 84, 105 80, 106 74 Z", "fill", "#fed7aa"], ["d", "M108 74 C109 75, 109 79, 107 80", "stroke", "#f97316", "stroke-width", "0.8", "fill", "none", "opacity", "0.5"], ["d", "M53 66 C53 84, 63 98, 80 98 C97 98, 107 84, 107 66 C107 51, 96 46, 80 46 C64 46, 53 51, 53 66 Z", "fill", "url(#db-skin)"], ["d", "M51 64 C47 54, 52 42, 62 36 C72 30, 88 30, 98 36 C108 42, 113 54, 109 64 C112 70, 111 76, 107 80 C106 74, 107 67, 105 63 C103 54, 96 48, 80 48 C64 48, 57 54, 55 63 C53 67, 54 74, 53 80 C49 76, 48 70, 51 64 Z", "fill", "url(#db-hair)"], ["d", "M50 58 C51 44, 60 35, 75 33 C88 32, 104 36, 110 49 C113 56, 112 66, 108 72 C106 64, 106 58, 102 53 C96 46, 88 44, 78 45 C68 46, 58 50, 50 58 Z", "fill", "url(#db-hair)"], ["d", "M54 58 C58 50, 68 47, 73 47 C79 47, 85 51, 93 49 C100 47, 104 53, 106 58 C100 55, 93 54, 88 56 C80 59, 72 61, 64 58 C59 56, 56 57, 54 58 Z", "fill", "#2d2015"], ["d", "M68 46 C74 41, 84 41, 92 43 C96 44, 102 47, 105 52 C101 48, 95 46, 88 45 C80 44, 74 44, 68 46 Z", "fill", "#4a3728", "opacity", "0.6"], ["d", "M63 65 C67 62.5, 73 63, 76 65.5", "stroke", "#2b1d11", "stroke-width", "2.2", "stroke-linecap", "round", "fill", "none"], ["d", "M84 65.5 C87 63, 93 62.5, 97 65", "stroke", "#2b1d11", "stroke-width", "2.2", "stroke-linecap", "round", "fill", "none"], ["d", "M64 71.5 Q70 67.5 76 71.5", "stroke", "#1f2937", "stroke-width", "2", "stroke-linecap", "round", "fill", "none"], ["d", "M65 72.5 Q70 75 75 72.5", "stroke", "#9ca3af", "stroke-width", "0.8", "stroke-linecap", "round", "fill", "none"], ["cx", "70", "cy", "71.8", "rx", "3.2", "ry", "3", "fill", "#2d2015"], ["cx", "70", "cy", "71.8", "r", "1.8", "fill", "#0f172a"], ["cx", "71", "cy", "70.8", "r", "0.9", "fill", "#ffffff"], ["d", "M84 71.5 Q90 67.5 96 71.5", "stroke", "#1f2937", "stroke-width", "2", "stroke-linecap", "round", "fill", "none"], ["d", "M85 72.5 Q90 75 95 72.5", "stroke", "#9ca3af", "stroke-width", "0.8", "stroke-linecap", "round", "fill", "none"], ["cx", "90", "cy", "71.8", "rx", "3.2", "ry", "3", "fill", "#2d2015"], ["cx", "90", "cy", "71.8", "r", "1.8", "fill", "#0f172a"], ["cx", "91", "cy", "70.8", "r", "0.9", "fill", "#ffffff"], ["d", "M80 67 L80 77.5 C80 79.5, 78 80.5, 77 79.5", "stroke", "#d97706", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round", "fill", "none", "opacity", "0.65"], ["d", "M81 79.5 C82.5 79.5, 83.5 78.5, 83.5 77.5", "stroke", "#d97706", "stroke-width", "1.2", "stroke-linecap", "round", "fill", "none", "opacity", "0.45"], ["d", "M72 85.5 C76 89.5, 84 89.5, 88 85.5", "stroke", "#991b1b", "stroke-width", "2.2", "stroke-linecap", "round", "fill", "none"], ["d", "M70.5 84.5 C71 85.5, 71.5 86, 72 86.5", "stroke", "#b45309", "stroke-width", "1.2", "stroke-linecap", "round", "fill", "none", "opacity", "0.5"], ["d", "M89.5 84.5 C89 85.5, 88.5 86, 88 86.5", "stroke", "#b45309", "stroke-width", "1.2", "stroke-linecap", "round", "fill", "none", "opacity", "0.5"], ["d", "M76 90 C78.5 91.5, 81.5 91.5, 84 90", "stroke", "#ea580c", "stroke-width", "1.2", "stroke-linecap", "round", "fill", "none", "opacity", "0.35"], [1, "patron-badge"], [1, "message-container"], [1, "message-bubble"], [1, "quote-tag"], [1, "loading-indicator"], [1, "action-row"], [1, "spinner-small"], ["type", "button", 1, "btn-retry", 3, "click"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"], ["type", "button", 1, "btn-dismiss"], ["type", "button", 1, "btn-dismiss", 3, "click"]], template: function DomBosquinhoStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(2, "svg", 2)(3, "defs")(4, "linearGradient", 3);
            i0.ɵɵelement(5, "stop", 4)(6, "stop", 5)(7, "stop", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "radialGradient", 7);
            i0.ɵɵelement(9, "stop", 8)(10, "stop", 9)(11, "stop", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "linearGradient", 11);
            i0.ɵɵelement(13, "stop", 12)(14, "stop", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "linearGradient", 14);
            i0.ɵɵelement(16, "stop", 15)(17, "stop", 16)(18, "stop", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "linearGradient", 18);
            i0.ɵɵelement(20, "stop", 19)(21, "stop", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(22, "circle", 21)(23, "circle", 22)(24, "circle", 23)(25, "path", 24)(26, "path", 25)(27, "circle", 26)(28, "circle", 27)(29, "circle", 28)(30, "path", 29)(31, "path", 30)(32, "path", 31)(33, "path", 32)(34, "path", 33)(35, "path", 34)(36, "path", 35)(37, "path", 36)(38, "path", 37)(39, "path", 38)(40, "path", 39)(41, "path", 40)(42, "path", 41)(43, "path", 42)(44, "path", 43)(45, "path", 44)(46, "path", 45)(47, "ellipse", 46)(48, "circle", 47)(49, "circle", 48)(50, "path", 49)(51, "path", 50)(52, "ellipse", 51)(53, "circle", 52)(54, "circle", 53)(55, "path", 54)(56, "path", 55)(57, "path", 56)(58, "path", 57)(59, "path", 58)(60, "path", 59);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(61, "span", 60);
            i0.ɵɵtext(62, "S\u00E3o Jo\u00E3o Bosco \u2022 Padroeiro");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "div", 61)(64, "div", 62)(65, "span", 63);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "h3");
            i0.ɵɵtext(68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "p");
            i0.ɵɵtext(70);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(71, DomBosquinhoStateComponent_Conditional_71_Template, 4, 0, "div", 64)(72, DomBosquinhoStateComponent_Conditional_72_Template, 6, 2, "div", 65);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("is-loading-mode", ctx.mode === "loading");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("pulse-halo", ctx.mode === "loading");
            i0.ɵɵadvance(64);
            i0.ɵɵtextInterpolate1(" ", ctx.mode === "loading" ? "\u201CDom Bosquinho a postos!\u201D" : "\u201CServi ao Senhor com alegria!\u201D", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.displayTitle);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.displayMessage);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode === "loading" ? 71 : ctx.showRetry ? 72 : -1);
        } }, dependencies: [CommonModule], styles: [".dom-bosco-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 1.75rem;\n      padding: 1.75rem;\n      background: linear-gradient(135deg, #ffffff 0%, #fefce8 100%);\n      border: 1px solid #fef08a;\n      border-left: 6px solid #eab308;\n      border-radius: 14px;\n      box-shadow: 0 4px 14px rgba(234, 179, 8, 0.1);\n      margin: 1.25rem 0;\n      flex-wrap: wrap;\n      animation: _ngcontent-%COMP%_fadeIn 0.3s ease-in-out;\n    }\n\n    .dom-bosco-card.is-loading-mode[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);\n      border: 1px solid #bfdbfe;\n      border-left: 6px solid #3b82f6;\n      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.08);\n    }\n\n    @keyframes _ngcontent-%COMP%_fadeIn {\n      from { opacity: 0; transform: translateY(4px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .character-container[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.5rem;\n      flex-shrink: 0;\n    }\n\n    .dom-bosco-svg[_ngcontent-%COMP%] {\n      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.06));\n      animation: _ngcontent-%COMP%_float-gentle 3.5s ease-in-out infinite;\n    }\n\n    .waving-hand[_ngcontent-%COMP%] {\n      transform-origin: 118px 98px;\n      animation: _ngcontent-%COMP%_wave 2.5s ease-in-out infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_wave {\n      0%, 100% { transform: rotate(0deg); }\n      25% { transform: rotate(-8deg); }\n      75% { transform: rotate(10deg); }\n    }\n\n    @keyframes _ngcontent-%COMP%_float-gentle {\n      0%, 100% { transform: translateY(0); }\n      50% { transform: translateY(-4px); }\n    }\n\n    .pulse-halo[_ngcontent-%COMP%]   .halo-circle[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite alternate;\n    }\n\n    @keyframes _ngcontent-%COMP%_pulse-glow {\n      0% { opacity: 0.6; stroke-width: 2; }\n      100% { opacity: 1; stroke-width: 3.5; stroke: #3b82f6; fill: #dbeafe; }\n    }\n\n    .patron-badge[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      font-weight: 700;\n      color: #854d0e;\n      background: #fef08a;\n      padding: 0.2rem 0.65rem;\n      border-radius: 9999px;\n      letter-spacing: 0.03em;\n      border: 1px solid #fde047;\n    }\n\n    .is-loading-mode[_ngcontent-%COMP%]   .patron-badge[_ngcontent-%COMP%] {\n      color: #1e40af;\n      background: #dbeafe;\n      border-color: #bfdbfe;\n    }\n\n    .message-container[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 260px;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .message-bubble[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.35rem;\n    }\n\n    .quote-tag[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 700;\n      font-style: italic;\n      color: #b45309;\n      letter-spacing: 0.02em;\n    }\n\n    .is-loading-mode[_ngcontent-%COMP%]   .quote-tag[_ngcontent-%COMP%] {\n      color: #2563eb;\n    }\n\n    .message-bubble[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 1.15rem;\n      color: #78350f;\n      font-weight: 800;\n    }\n\n    .is-loading-mode[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      color: #1e3a8a;\n    }\n\n    .message-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.92rem;\n      color: #451a03;\n      line-height: 1.55;\n    }\n\n    .is-loading-mode[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      color: #1e293b;\n    }\n\n    .loading-indicator[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.6rem;\n      font-size: 0.85rem;\n      font-weight: 600;\n      color: #2563eb;\n      margin-top: 0.25rem;\n    }\n\n    .spinner-small[_ngcontent-%COMP%] {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #93c5fd;\n      border-top-color: #2563eb;\n      border-radius: 50%;\n      animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .action-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      margin-top: 0.25rem;\n    }\n\n    .btn-retry[_ngcontent-%COMP%] {\n      background: #d97706;\n      color: #ffffff;\n      border: 0;\n      padding: 0.55rem 1.15rem;\n      border-radius: 8px;\n      font-weight: 600;\n      font-size: 0.85rem;\n      cursor: pointer;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      transition: background 0.15s, transform 0.15s;\n      box-shadow: 0 2px 4px rgba(217, 119, 6, 0.25);\n    }\n\n    .btn-retry[_ngcontent-%COMP%]:hover {\n      background: #b45309;\n      transform: translateY(-1px);\n    }\n\n    .btn-dismiss[_ngcontent-%COMP%] {\n      background: transparent;\n      color: #78350f;\n      border: 1px solid #fde047;\n      padding: 0.5rem 0.9rem;\n      border-radius: 8px;\n      font-weight: 600;\n      font-size: 0.82rem;\n      cursor: pointer;\n      transition: background 0.15s;\n    }\n\n    .btn-dismiss[_ngcontent-%COMP%]:hover {\n      background: #fef08a;\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DomBosquinhoStateComponent, [{
        type: Component,
        args: [{ selector: 'app-dom-bosquinho-state', standalone: true, imports: [CommonModule], template: `
    <div class="dom-bosco-card" [class.is-loading-mode]="mode === 'loading'" role="alert">
      <!-- Ilustração Vetorial: Dom Bosquinho (São João Bosco em traço maduro e acolhedor) -->
      <div class="character-container">
        <svg viewBox="0 0 160 160" width="135" height="135" class="dom-bosco-svg" [class.pulse-halo]="mode === 'loading'" role="img" aria-label="São João Bosco">
          <defs>
            <!-- Gradiente da Auréola -->
            <linearGradient id="db-halo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#d97706" />
            </linearGradient>

            <!-- Gradiente do Círculo de Fundo -->
            <radialGradient id="db-bg" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="70%" stop-color="#fefce8" />
              <stop offset="100%" stop-color="#fef3c7" />
            </radialGradient>

            <!-- Gradiente da Batina -->
            <linearGradient id="db-cassock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>

            <!-- Gradiente do Cabelo -->
            <linearGradient id="db-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#3d2c1e" />
              <stop offset="50%" stop-color="#241a12" />
              <stop offset="100%" stop-color="#17100b" />
            </linearGradient>

            <!-- Gradiente da Pele -->
            <linearGradient id="db-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffedd5" />
              <stop offset="100%" stop-color="#fed7aa" />
            </linearGradient>
          </defs>

          <!-- Fundo Circular Delicado -->
          <circle cx="80" cy="80" r="74" fill="url(#db-bg)" stroke="#fde047" stroke-width="1.5" />

          <!-- Auréola Dourada Luminosa de Santidade -->
          <circle cx="80" cy="62" r="50" fill="none" stroke="url(#db-halo)" stroke-width="2.5" stroke-dasharray="8 4" class="halo-circle" opacity="0.85" />
          <circle cx="80" cy="62" r="46" fill="#fef9c3" opacity="0.35" />

          <!-- Batina Preta Sacerdotal (Ombros e Busto) -->
          <path d="M34 154 C35 130, 48 114, 64 109 L96 109 C112 114, 125 130, 126 154 Z" fill="url(#db-cassock)" />
          <!-- Dobras e Costura da Batina -->
          <path d="M80 119 L80 154" stroke="#334155" stroke-width="1.5" />
          <!-- Botões Pequenos da Batina -->
          <circle cx="80" cy="126" r="1.5" fill="#475569" />
          <circle cx="80" cy="135" r="1.5" fill="#475569" />
          <circle cx="80" cy="144" r="1.5" fill="#475569" />

          <!-- Colarinho Romano Branco (Alzacolletto Clerical) -->
          <path d="M68 108 L92 108 L89 120 L71 120 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8" />
          <path d="M74 108 L86 108 L85 117 L75 117 Z" fill="#f8fafc" />

          <!-- Pescoço com Sombra Suave -->
          <path d="M70 94 L70 110 L90 110 L90 94 Z" fill="url(#db-skin)" />
          <path d="M70 94 C76 99, 84 99, 90 94 L90 100 C84 103, 76 103, 70 100 Z" fill="#fbcfe8" opacity="0.3" />

          <!-- Orelhas -->
          <path d="M51 72 C49 68, 48 80, 52 83 C54 84, 55 80, 54 74 Z" fill="#fed7aa" />
          <path d="M52 74 C51 75, 51 79, 53 80" stroke="#f97316" stroke-width="0.8" fill="none" opacity="0.5" />
          <path d="M109 72 C111 68, 112 80, 108 83 C106 84, 105 80, 106 74 Z" fill="#fed7aa" />
          <path d="M108 74 C109 75, 109 79, 107 80" stroke="#f97316" stroke-width="0.8" fill="none" opacity="0.5" />

          <!-- Rosto Sereno de Dom Bosco -->
          <path d="M53 66 C53 84, 63 98, 80 98 C97 98, 107 84, 107 66 C107 51, 96 46, 80 46 C64 46, 53 51, 53 66 Z" fill="url(#db-skin)" />

          <!-- Cabelos de Fundo / Laterais Onduladas -->
          <path d="M51 64 C47 54, 52 42, 62 36 C72 30, 88 30, 98 36 C108 42, 113 54, 109 64 C112 70, 111 76, 107 80 C106 74, 107 67, 105 63 C103 54, 96 48, 80 48 C64 48, 57 54, 55 63 C53 67, 54 74, 53 80 C49 76, 48 70, 51 64 Z" fill="url(#db-hair)" />

          <!-- Cabelo Frontal com Risca Lateral e Ondas Clássicas -->
          <path d="M50 58 C51 44, 60 35, 75 33 C88 32, 104 36, 110 49 C113 56, 112 66, 108 72 C106 64, 106 58, 102 53 C96 46, 88 44, 78 45 C68 46, 58 50, 50 58 Z" fill="url(#db-hair)" />
          <!-- Franja com risca lateral característica -->
          <path d="M54 58 C58 50, 68 47, 73 47 C79 47, 85 51, 93 49 C100 47, 104 53, 106 58 C100 55, 93 54, 88 56 C80 59, 72 61, 64 58 C59 56, 56 57, 54 58 Z" fill="#2d2015" />
          <path d="M68 46 C74 41, 84 41, 92 43 C96 44, 102 47, 105 52 C101 48, 95 46, 88 45 C80 44, 74 44, 68 46 Z" fill="#4a3728" opacity="0.6" />

          <!-- Sobrancelhas Naturais e Expressivas -->
          <path d="M63 65 C67 62.5, 73 63, 76 65.5" stroke="#2b1d11" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <path d="M84 65.5 C87 63, 93 62.5, 97 65" stroke="#2b1d11" stroke-width="2.2" stroke-linecap="round" fill="none" />

          <!-- Olhos Serenos e Acolhedores -->
          <!-- Olho Esquerdo -->
          <path d="M64 71.5 Q70 67.5 76 71.5" stroke="#1f2937" stroke-width="2" stroke-linecap="round" fill="none" />
          <path d="M65 72.5 Q70 75 75 72.5" stroke="#9ca3af" stroke-width="0.8" stroke-linecap="round" fill="none" />
          <ellipse cx="70" cy="71.8" rx="3.2" ry="3" fill="#2d2015" />
          <circle cx="70" cy="71.8" r="1.8" fill="#0f172a" />
          <circle cx="71" cy="70.8" r="0.9" fill="#ffffff" />

          <!-- Olho Direito -->
          <path d="M84 71.5 Q90 67.5 96 71.5" stroke="#1f2937" stroke-width="2" stroke-linecap="round" fill="none" />
          <path d="M85 72.5 Q90 75 95 72.5" stroke="#9ca3af" stroke-width="0.8" stroke-linecap="round" fill="none" />
          <ellipse cx="90" cy="71.8" rx="3.2" ry="3" fill="#2d2015" />
          <circle cx="90" cy="71.8" r="1.8" fill="#0f172a" />
          <circle cx="91" cy="70.8" r="0.9" fill="#ffffff" />

          <!-- Nariz Suave e Digno -->
          <path d="M80 67 L80 77.5 C80 79.5, 78 80.5, 77 79.5" stroke="#d97706" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.65" />
          <path d="M81 79.5 C82.5 79.5, 83.5 78.5, 83.5 77.5" stroke="#d97706" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.45" />

          <!-- Sorriso Sereno, Paternal e Acolhedor -->
          <path d="M72 85.5 C76 89.5, 84 89.5, 88 85.5" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round" fill="none" />
          <path d="M70.5 84.5 C71 85.5, 71.5 86, 72 86.5" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5" />
          <path d="M89.5 84.5 C89 85.5, 88.5 86, 88 86.5" stroke="#b45309" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.5" />
          <path d="M76 90 C78.5 91.5, 81.5 91.5, 84 90" stroke="#ea580c" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.35" />
        </svg>

        <span class="patron-badge">São João Bosco &bull; Padroeiro</span>
      </div>

      <!-- Balão de Mensagem e Ação -->
      <div class="message-container">
        <div class="message-bubble">
          <span class="quote-tag">
            {{ mode === 'loading' ? '“Dom Bosquinho a postos!”' : '“Servi ao Senhor com alegria!”' }}
          </span>
          <h3>{{ displayTitle }}</h3>
          <p>{{ displayMessage }}</p>
        </div>

        @if (mode === 'loading') {
          <div class="loading-indicator">
            <span class="spinner-small"></span>
            <span>Carregando dados da comunidade...</span>
          </div>
        } @else if (showRetry) {
          <div class="action-row">
            <button type="button" class="btn-retry" (click)="onRetryClick()">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/>
              </svg>
              {{ retryLabel }}
            </button>
            @if (showDismiss) {
              <button type="button" class="btn-dismiss" (click)="onDismissClick()">
                Dispensar
              </button>
            }
          </div>
        }
      </div>
    </div>
  `, styles: ["\n    .dom-bosco-card {\n      display: flex;\n      align-items: center;\n      gap: 1.75rem;\n      padding: 1.75rem;\n      background: linear-gradient(135deg, #ffffff 0%, #fefce8 100%);\n      border: 1px solid #fef08a;\n      border-left: 6px solid #eab308;\n      border-radius: 14px;\n      box-shadow: 0 4px 14px rgba(234, 179, 8, 0.1);\n      margin: 1.25rem 0;\n      flex-wrap: wrap;\n      animation: fadeIn 0.3s ease-in-out;\n    }\n\n    .dom-bosco-card.is-loading-mode {\n      background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);\n      border: 1px solid #bfdbfe;\n      border-left: 6px solid #3b82f6;\n      box-shadow: 0 4px 14px rgba(59, 130, 246, 0.08);\n    }\n\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(4px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n\n    .character-container {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.5rem;\n      flex-shrink: 0;\n    }\n\n    .dom-bosco-svg {\n      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.06));\n      animation: float-gentle 3.5s ease-in-out infinite;\n    }\n\n    .waving-hand {\n      transform-origin: 118px 98px;\n      animation: wave 2.5s ease-in-out infinite;\n    }\n\n    @keyframes wave {\n      0%, 100% { transform: rotate(0deg); }\n      25% { transform: rotate(-8deg); }\n      75% { transform: rotate(10deg); }\n    }\n\n    @keyframes float-gentle {\n      0%, 100% { transform: translateY(0); }\n      50% { transform: translateY(-4px); }\n    }\n\n    .pulse-halo .halo-circle {\n      animation: pulse-glow 2s ease-in-out infinite alternate;\n    }\n\n    @keyframes pulse-glow {\n      0% { opacity: 0.6; stroke-width: 2; }\n      100% { opacity: 1; stroke-width: 3.5; stroke: #3b82f6; fill: #dbeafe; }\n    }\n\n    .patron-badge {\n      font-size: 0.72rem;\n      font-weight: 700;\n      color: #854d0e;\n      background: #fef08a;\n      padding: 0.2rem 0.65rem;\n      border-radius: 9999px;\n      letter-spacing: 0.03em;\n      border: 1px solid #fde047;\n    }\n\n    .is-loading-mode .patron-badge {\n      color: #1e40af;\n      background: #dbeafe;\n      border-color: #bfdbfe;\n    }\n\n    .message-container {\n      flex: 1;\n      min-width: 260px;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .message-bubble {\n      display: flex;\n      flex-direction: column;\n      gap: 0.35rem;\n    }\n\n    .quote-tag {\n      font-size: 0.8rem;\n      font-weight: 700;\n      font-style: italic;\n      color: #b45309;\n      letter-spacing: 0.02em;\n    }\n\n    .is-loading-mode .quote-tag {\n      color: #2563eb;\n    }\n\n    .message-bubble h3 {\n      margin: 0;\n      font-size: 1.15rem;\n      color: #78350f;\n      font-weight: 800;\n    }\n\n    .is-loading-mode .message-bubble h3 {\n      color: #1e3a8a;\n    }\n\n    .message-bubble p {\n      margin: 0;\n      font-size: 0.92rem;\n      color: #451a03;\n      line-height: 1.55;\n    }\n\n    .is-loading-mode .message-bubble p {\n      color: #1e293b;\n    }\n\n    .loading-indicator {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.6rem;\n      font-size: 0.85rem;\n      font-weight: 600;\n      color: #2563eb;\n      margin-top: 0.25rem;\n    }\n\n    .spinner-small {\n      width: 16px;\n      height: 16px;\n      border: 2px solid #93c5fd;\n      border-top-color: #2563eb;\n      border-radius: 50%;\n      animation: spin 0.8s linear infinite;\n    }\n\n    @keyframes spin {\n      to { transform: rotate(360deg); }\n    }\n\n    .action-row {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      margin-top: 0.25rem;\n    }\n\n    .btn-retry {\n      background: #d97706;\n      color: #ffffff;\n      border: 0;\n      padding: 0.55rem 1.15rem;\n      border-radius: 8px;\n      font-weight: 600;\n      font-size: 0.85rem;\n      cursor: pointer;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      transition: background 0.15s, transform 0.15s;\n      box-shadow: 0 2px 4px rgba(217, 119, 6, 0.25);\n    }\n\n    .btn-retry:hover {\n      background: #b45309;\n      transform: translateY(-1px);\n    }\n\n    .btn-dismiss {\n      background: transparent;\n      color: #78350f;\n      border: 1px solid #fde047;\n      padding: 0.5rem 0.9rem;\n      border-radius: 8px;\n      font-weight: 600;\n      font-size: 0.82rem;\n      cursor: pointer;\n      transition: background 0.15s;\n    }\n\n    .btn-dismiss:hover {\n      background: #fef08a;\n    }\n  "] }]
    }], null, { mode: [{
            type: Input
        }], title: [{
            type: Input
        }], message: [{
            type: Input
        }], showRetry: [{
            type: Input
        }], showDismiss: [{
            type: Input
        }], retryLabel: [{
            type: Input
        }], retry: [{
            type: Output
        }], dismiss: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DomBosquinhoStateComponent, { className: "DomBosquinhoStateComponent", filePath: "src\\app\\shared\\components\\dom-bosquinho-state.component.ts", lineNumber: 355 }); })();
//# sourceMappingURL=dom-bosquinho-state.component.js.map