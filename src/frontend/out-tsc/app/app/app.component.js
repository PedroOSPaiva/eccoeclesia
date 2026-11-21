import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { CommunityService } from './core/services/community.service';
import { ToastContainerComponent } from './shared/components/toast-container.component';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function AppComponent_Conditional_1_For_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const comm_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", comm_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" \u26EA ", comm_r3.name, " ", comm_r3.isMainParish ? "(Matriz)" : "", " ");
} }
function AppComponent_Conditional_1_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26)(1, "div", 27)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 28);
    i0.ɵɵlistener("click", function AppComponent_Conditional_1_Conditional_39_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.communityService.clearNotice()); });
    i0.ɵɵtext(5, "\u00D7");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx);
} }
function AppComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "header", 2)(1, "div", 3)(2, "div", 4);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 5);
    i0.ɵɵelement(4, "path", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "EcoEcclesia");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "nav")(8, "a", 7);
    i0.ɵɵtext(9, "Dashboard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "a", 8);
    i0.ɵɵtext(11, "Raz\u00E3o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "a", 9);
    i0.ɵɵtext(13, "Relat\u00F3rios");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "a", 10);
    i0.ɵɵtext(15, "Despesas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "a", 11);
    i0.ɵɵtext(17, "Receitas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "a", 12);
    i0.ɵɵtext(19, "Membros");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "a", 13);
    i0.ɵɵtext(21, "Anivers\u00E1rios");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "a", 14);
    i0.ɵɵtext(23, "Invent\u00E1rio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "a", 15);
    i0.ɵɵtext(25, "Usu\u00E1rios");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 16)(27, "div", 17);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(28, "svg", 18);
    i0.ɵɵelement(29, "circle", 19)(30, "line", 20)(31, "path", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(32, "select", 22);
    i0.ɵɵlistener("change", function AppComponent_Conditional_1_Template_select_change_32_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCommunityChange($event)); });
    i0.ɵɵelementStart(33, "option", 23);
    i0.ɵɵtext(34, "\uD83C\uDF10 Todas (Consolidado)");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(35, AppComponent_Conditional_1_For_36_Template, 2, 3, "option", 24, _forTrack0);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "button", 25);
    i0.ɵɵlistener("click", function AppComponent_Conditional_1_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(38, "Sair");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(39, AppComponent_Conditional_1_Conditional_39_Template, 6, 1, "div", 26);
} if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(32);
    i0.ɵɵproperty("value", (tmp_1_0 = ctx_r1.communityService.activeCommunityId()) !== null && tmp_1_0 !== undefined ? tmp_1_0 : "ALL");
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.communityService.communities());
    i0.ɵɵadvance(4);
    i0.ɵɵconditional((tmp_3_0 = ctx_r1.communityService.noticeMessage()) ? 39 : -1, tmp_3_0);
} }
function AppComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "footer", 1)(1, "div", 29)(2, "div", 30)(3, "strong");
    i0.ɵɵtext(4, "EcoEcclesia");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " \u2022 Gest\u00E3o \u2022 Governan\u00E7a \u2022 Zelo Pastoral ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 31)(7, "span");
    i0.ɵɵtext(8, "Em mem\u00F3ria carinhosa de ");
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10, "Dona Cristina C\u00E9lia Pesca");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11, " & ");
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13, "Av\u00F3 Arlete");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "div", 32)(15, "a", 33);
    i0.ɵɵtext(16, "Hist\u00F3ria & Dedicat\u00F3ria \u2192");
    i0.ɵɵelementEnd()()()();
} }
export class AppComponent {
    auth = inject(AuthService);
    communityService = inject(CommunityService);
    router = inject(Router);
    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.communityService.loadCommunities().subscribe();
        }
    }
    onCommunityChange(event) {
        const select = event.target;
        this.communityService.setActiveCommunity(select.value);
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
    static ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 4, consts: [[1, "container", "page-content"], [1, "app-footer"], [1, "topbar"], [1, "container", "nav"], [1, "brand"], ["viewBox", "0 0 24 24", "width", "22", "height", "22", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "brand-icon"], ["d", "M3 21h18M5 21V7l7-4 7 4v14M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"], ["routerLink", "/dashboard"], ["routerLink", "/ledger"], ["routerLink", "/reports"], ["routerLink", "/expenses"], ["routerLink", "/revenues"], ["routerLink", "/members"], ["routerLink", "/birthdays"], ["routerLink", "/inventory"], ["routerLink", "/users"], [1, "header-right"], ["title", "Filtrar escopo por comunidade", 1, "community-picker"], ["viewBox", "0 0 24 24", "width", "16", "height", "16", "fill", "none", "stroke", "currentColor", "stroke-width", "2", "stroke-linecap", "round", "stroke-linejoin", "round", 1, "picker-icon"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "2", "y1", "12", "x2", "22", "y2", "12"], ["d", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"], ["id", "communitySelect", 1, "community-select", 3, "change", "value"], ["value", "ALL"], [3, "value"], ["type", "button", 1, "btn-logout", 3, "click"], [1, "community-toast"], [1, "container", "toast-content"], [1, "toast-close", 3, "click"], [1, "container", "footer-content"], [1, "footer-left"], [1, "footer-center"], [1, "footer-right"], ["routerLink", "/about", 1, "footer-link"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-toast-container");
            i0.ɵɵtemplate(1, AppComponent_Conditional_1_Template, 40, 2);
            i0.ɵɵelementStart(2, "main", 0);
            i0.ɵɵelement(3, "router-outlet");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, AppComponent_Conditional_4_Template, 17, 0, "footer", 1);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.auth.isLoggedIn() ? 1 : -1);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("padding-top", ctx.auth.isLoggedIn() ? "1.5rem" : "3rem");
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.auth.isLoggedIn() ? 4 : -1);
        } }, dependencies: [CommonModule, RouterOutlet, RouterLink, ToastContainerComponent], styles: [".topbar[_ngcontent-%COMP%] { background:#0f172a; color:#fff; padding:.75rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }\r\n.nav[_ngcontent-%COMP%] { display:flex; gap:1.25rem; align-items:center; }\r\n.brand[_ngcontent-%COMP%] { display:flex; align-items:center; gap:0.5rem; color:#f8fafc; font-size:1.1rem; }\r\n.brand-icon[_ngcontent-%COMP%] { color:#38bdf8; }\r\nnav[_ngcontent-%COMP%] { display:flex; gap:0.85rem; flex-wrap:wrap; flex:1; align-items:center; }\r\na[_ngcontent-%COMP%] { color:#94a3b8; text-decoration:none; font-size:0.875rem; font-weight:500; transition:color 0.15s ease, background 0.15s ease; padding:0.3rem 0.5rem; border-radius:6px; }\r\na[_ngcontent-%COMP%]:hover { color:#f8fafc; background: rgba(255,255,255,0.06); }\r\n\r\n.header-right[_ngcontent-%COMP%] { display:flex; align-items:center; gap:0.75rem; }\r\n\r\n.community-picker[_ngcontent-%COMP%] { display:flex; align-items:center; gap:0.4rem; background:#1e293b; border:1px solid #334155; border-radius:6px; padding:0.25rem 0.6rem; }\r\n.picker-icon[_ngcontent-%COMP%] { color:#38bdf8; flex-shrink:0; }\r\n.community-select[_ngcontent-%COMP%] { background:transparent; border:none; color:#f1f5f9; font-size:0.825rem; font-weight:500; outline:none; cursor:pointer; max-width:210px; }\r\n.community-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] { background:#0f172a; color:#f8fafc; }\r\n\r\n.btn-logout[_ngcontent-%COMP%] { background:#ef4444; color:#fff; border:none; border-radius:6px; padding:0.45rem 0.85rem; font-size:0.8rem; font-weight:600; cursor:pointer; transition:background 0.15s ease; }\r\n.btn-logout[_ngcontent-%COMP%]:hover { background:#dc2626; }\r\n\r\n.community-toast[_ngcontent-%COMP%] { background:#0284c7; color:#fff; font-size:0.85rem; font-weight:500; padding:0.4rem 0; box-shadow:0 2px 4px rgba(0,0,0,0.1); }\r\n.toast-content[_ngcontent-%COMP%] { display:flex; justify-content:space-between; align-items:center; }\r\n.toast-close[_ngcontent-%COMP%] { background:none; border:none; color:#e0f2fe; font-size:1.2rem; cursor:pointer; line-height:1; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ToastContainerComponent], template: "<app-toast-container></app-toast-container>\r\n\r\n@if (auth.isLoggedIn()) {\r\n  <header class=\"topbar\">\r\n    <div class=\"container nav\">\r\n      <div class=\"brand\">\r\n        <svg class=\"brand-icon\" viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n          <path d=\"M3 21h18M5 21V7l7-4 7 4v14M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6\" />\r\n        </svg>\r\n        <strong>EcoEcclesia</strong>\r\n      </div>\r\n\r\n      <nav>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n        <a routerLink=\"/ledger\">Raz\u00E3o</a>\r\n        <a routerLink=\"/reports\">Relat\u00F3rios</a>\r\n        <a routerLink=\"/expenses\">Despesas</a>\r\n        <a routerLink=\"/revenues\">Receitas</a>\r\n        <a routerLink=\"/members\">Membros</a>\r\n        <a routerLink=\"/birthdays\">Anivers\u00E1rios</a>\r\n        <a routerLink=\"/inventory\">Invent\u00E1rio</a>\r\n        <a routerLink=\"/users\">Usu\u00E1rios</a>\r\n      </nav>\r\n\r\n      <div class=\"header-right\">\r\n        <!-- Seletor de Comunidade Ativa -->\r\n        <div class=\"community-picker\" title=\"Filtrar escopo por comunidade\">\r\n          <svg class=\"picker-icon\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\r\n            <circle cx=\"12\" cy=\"12\" r=\"10\" />\r\n            <line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\" />\r\n            <path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\" />\r\n          </svg>\r\n          <select\r\n            id=\"communitySelect\"\r\n            [value]=\"communityService.activeCommunityId() ?? 'ALL'\"\r\n            (change)=\"onCommunityChange($event)\"\r\n            class=\"community-select\"\r\n          >\r\n            <option value=\"ALL\">\uD83C\uDF10 Todas (Consolidado)</option>\r\n            @for (comm of communityService.communities(); track comm.id) {\r\n              <option [value]=\"comm.id\">\r\n                \u26EA {{ comm.name }} {{ comm.isMainParish ? '(Matriz)' : '' }}\r\n              </option>\r\n            }\r\n          </select>\r\n        </div>\r\n\r\n        <button type=\"button\" class=\"btn-logout\" (click)=\"logout()\">Sair</button>\r\n      </div>\r\n    </div>\r\n  </header>\r\n\r\n  @if (communityService.noticeMessage(); as notice) {\r\n    <div class=\"community-toast\">\r\n      <div class=\"container toast-content\">\r\n        <span>{{ notice }}</span>\r\n        <button class=\"toast-close\" (click)=\"communityService.clearNotice()\">&times;</button>\r\n      </div>\r\n    </div>\r\n  }\r\n}\r\n\r\n<main class=\"container page-content\" [style.paddingTop]=\"auth.isLoggedIn() ? '1.5rem' : '3rem'\">\r\n  <router-outlet></router-outlet>\r\n</main>\r\n\r\n@if (auth.isLoggedIn()) {\r\n  <footer class=\"app-footer\">\r\n    <div class=\"container footer-content\">\r\n      <div class=\"footer-left\">\r\n        <strong>EcoEcclesia</strong> &bull; Gest\u00E3o &bull; Governan\u00E7a &bull; Zelo Pastoral\r\n      </div>\r\n      <div class=\"footer-center\">\r\n        <span>Em mem\u00F3ria carinhosa de <strong>Dona Cristina C\u00E9lia Pesca</strong> & <strong>Av\u00F3 Arlete</strong></span>\r\n      </div>\r\n      <div class=\"footer-right\">\r\n        <a routerLink=\"/about\" class=\"footer-link\">Hist\u00F3ria & Dedicat\u00F3ria &rarr;</a>\r\n      </div>\r\n    </div>\r\n  </footer>\r\n}\r\n", styles: [".topbar { background:#0f172a; color:#fff; padding:.75rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }\r\n.nav { display:flex; gap:1.25rem; align-items:center; }\r\n.brand { display:flex; align-items:center; gap:0.5rem; color:#f8fafc; font-size:1.1rem; }\r\n.brand-icon { color:#38bdf8; }\r\nnav { display:flex; gap:0.85rem; flex-wrap:wrap; flex:1; align-items:center; }\r\na { color:#94a3b8; text-decoration:none; font-size:0.875rem; font-weight:500; transition:color 0.15s ease, background 0.15s ease; padding:0.3rem 0.5rem; border-radius:6px; }\r\na:hover { color:#f8fafc; background: rgba(255,255,255,0.06); }\r\n\r\n.header-right { display:flex; align-items:center; gap:0.75rem; }\r\n\r\n.community-picker { display:flex; align-items:center; gap:0.4rem; background:#1e293b; border:1px solid #334155; border-radius:6px; padding:0.25rem 0.6rem; }\r\n.picker-icon { color:#38bdf8; flex-shrink:0; }\r\n.community-select { background:transparent; border:none; color:#f1f5f9; font-size:0.825rem; font-weight:500; outline:none; cursor:pointer; max-width:210px; }\r\n.community-select option { background:#0f172a; color:#f8fafc; }\r\n\r\n.btn-logout { background:#ef4444; color:#fff; border:none; border-radius:6px; padding:0.45rem 0.85rem; font-size:0.8rem; font-weight:600; cursor:pointer; transition:background 0.15s ease; }\r\n.btn-logout:hover { background:#dc2626; }\r\n\r\n.community-toast { background:#0284c7; color:#fff; font-size:0.85rem; font-weight:500; padding:0.4rem 0; box-shadow:0 2px 4px rgba(0,0,0,0.1); }\r\n.toast-content { display:flex; justify-content:space-between; align-items:center; }\r\n.toast-close { background:none; border:none; color:#e0f2fe; font-size:1.2rem; cursor:pointer; line-height:1; }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 15 }); })();
//# sourceMappingURL=app.component.js.map