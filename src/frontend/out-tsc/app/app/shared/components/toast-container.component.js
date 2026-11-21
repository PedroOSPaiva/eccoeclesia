import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function ToastContainerComponent_For_2_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4);
    i0.ɵɵelement(1, "circle", 7)(2, "line", 8)(3, "line", 9);
    i0.ɵɵelementEnd();
} }
function ToastContainerComponent_For_2_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4);
    i0.ɵɵelement(1, "path", 10)(2, "polyline", 11);
    i0.ɵɵelementEnd();
} }
function ToastContainerComponent_For_2_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4);
    i0.ɵɵelement(1, "path", 12)(2, "line", 13)(3, "line", 14);
    i0.ɵɵelementEnd();
} }
function ToastContainerComponent_For_2_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 4);
    i0.ɵɵelement(1, "circle", 7)(2, "line", 15)(3, "line", 16);
    i0.ɵɵelementEnd();
} }
function ToastContainerComponent_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
    i0.ɵɵtemplate(2, ToastContainerComponent_For_2_Case_2_Template, 4, 0, ":svg:svg", 4)(3, ToastContainerComponent_For_2_Case_3_Template, 3, 0, ":svg:svg", 4)(4, ToastContainerComponent_For_2_Case_4_Template, 4, 0, ":svg:svg", 4)(5, ToastContainerComponent_For_2_Case_5_Template, 4, 0, ":svg:svg", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 5);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 6);
    i0.ɵɵlistener("click", function ToastContainerComponent_For_2_Template_button_click_8_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toastService.dismiss(toast_r2.id)); });
    i0.ɵɵtext(9, "\u00D7");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_11_0;
    const toast_r2 = ctx.$implicit;
    i0.ɵɵclassMapInterpolate1("toast toast-", toast_r2.type, "");
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = toast_r2.type) === "error" ? 2 : tmp_11_0 === "success" ? 3 : tmp_11_0 === "warning" ? 4 : 5);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(toast_r2.message);
} }
export class ToastContainerComponent {
    toastService = inject(ToastService);
    static ɵfac = function ToastContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastContainerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastContainerComponent, selectors: [["app-toast-container"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 0, consts: [["aria-live", "polite", "aria-atomic", "true", 1, "toast-container"], ["role", "alert", 3, "class"], ["role", "alert"], [1, "toast-icon"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], [1, "toast-body"], ["type", "button", "aria-label", "Fechar", 1, "toast-close", 3, "click"], ["cx", "12", "cy", "12", "r", "10"], ["x1", "12", "y1", "8", "x2", "12", "y2", "12"], ["x1", "12", "y1", "16", "x2", "12.01", "y2", "16"], ["d", "M22 11.08V12a10 10 0 1 1-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], ["d", "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"], ["x1", "12", "y1", "9", "x2", "12", "y2", "13"], ["x1", "12", "y1", "17", "x2", "12.01", "y2", "17"], ["x1", "12", "y1", "16", "x2", "12", "y2", "12"], ["x1", "12", "y1", "8", "x2", "12.01", "y2", "8"]], template: function ToastContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵrepeaterCreate(1, ToastContainerComponent_For_2_Template, 10, 5, "div", 1, _forTrack0);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.toastService.toasts());
        } }, dependencies: [CommonModule], styles: [".toast-container[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 1.25rem;\n      right: 1.25rem;\n      z-index: 99999;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n      max-width: 440px;\n      width: calc(100% - 2.5rem);\n      pointer-events: none;\n    }\n\n    .toast[_ngcontent-%COMP%] {\n      pointer-events: auto;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.875rem 1.125rem;\n      border-radius: 10px;\n      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n      font-size: 0.9rem;\n      line-height: 1.4;\n      animation: _ngcontent-%COMP%_toast-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n      transition: all 0.2s ease;\n    }\n\n    .toast-icon[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      flex-shrink: 0;\n    }\n\n    .toast-body[_ngcontent-%COMP%] {\n      flex: 1;\n      font-weight: 500;\n    }\n\n    .toast-error[_ngcontent-%COMP%] {\n      background: #fef2f2;\n      color: #991b1b;\n      border: 1px solid #fecaca;\n      border-left: 4px solid #ef4444;\n    }\n\n    .toast-success[_ngcontent-%COMP%] {\n      background: #f0fdf4;\n      color: #166534;\n      border: 1px solid #bbf7d0;\n      border-left: 4px solid #22c55e;\n    }\n\n    .toast-warning[_ngcontent-%COMP%] {\n      background: #fffbeb;\n      color: #92400e;\n      border: 1px solid #fde68a;\n      border-left: 4px solid #f59e0b;\n    }\n\n    .toast-info[_ngcontent-%COMP%] {\n      background: #eff6ff;\n      color: #1e40af;\n      border: 1px solid #bfdbfe;\n      border-left: 4px solid #3b82f6;\n    }\n\n    .toast-close[_ngcontent-%COMP%] {\n      background: none;\n      border: none;\n      color: inherit;\n      opacity: 0.6;\n      cursor: pointer;\n      padding: 0;\n      margin-left: auto;\n      font-size: 1.25rem;\n      line-height: 1;\n      transition: opacity 0.15s;\n    }\n    .toast-close[_ngcontent-%COMP%]:hover {\n      opacity: 1;\n    }\n\n    @keyframes _ngcontent-%COMP%_toast-slide-in {\n      from {\n        transform: translateX(100%);\n        opacity: 0;\n      }\n      to {\n        transform: translateX(0);\n        opacity: 1;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastContainerComponent, [{
        type: Component,
        args: [{ selector: 'app-toast-container', standalone: true, imports: [CommonModule], template: `
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast toast-{{ toast.type }}" role="alert">
          <div class="toast-icon">
            @switch (toast.type) {
              @case ('error') {
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              }
              @case ('success') {
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              }
              @case ('warning') {
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              }
              @default {
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              }
            }
          </div>
          <div class="toast-body">{{ toast.message }}</div>
          <button type="button" class="toast-close" (click)="toastService.dismiss(toast.id)" aria-label="Fechar">&times;</button>
        </div>
      }
    </div>
  `, styles: ["\n    .toast-container {\n      position: fixed;\n      top: 1.25rem;\n      right: 1.25rem;\n      z-index: 99999;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n      max-width: 440px;\n      width: calc(100% - 2.5rem);\n      pointer-events: none;\n    }\n\n    .toast {\n      pointer-events: auto;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.875rem 1.125rem;\n      border-radius: 10px;\n      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);\n      font-size: 0.9rem;\n      line-height: 1.4;\n      animation: toast-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n      transition: all 0.2s ease;\n    }\n\n    .toast-icon {\n      display: flex;\n      align-items: center;\n      flex-shrink: 0;\n    }\n\n    .toast-body {\n      flex: 1;\n      font-weight: 500;\n    }\n\n    .toast-error {\n      background: #fef2f2;\n      color: #991b1b;\n      border: 1px solid #fecaca;\n      border-left: 4px solid #ef4444;\n    }\n\n    .toast-success {\n      background: #f0fdf4;\n      color: #166534;\n      border: 1px solid #bbf7d0;\n      border-left: 4px solid #22c55e;\n    }\n\n    .toast-warning {\n      background: #fffbeb;\n      color: #92400e;\n      border: 1px solid #fde68a;\n      border-left: 4px solid #f59e0b;\n    }\n\n    .toast-info {\n      background: #eff6ff;\n      color: #1e40af;\n      border: 1px solid #bfdbfe;\n      border-left: 4px solid #3b82f6;\n    }\n\n    .toast-close {\n      background: none;\n      border: none;\n      color: inherit;\n      opacity: 0.6;\n      cursor: pointer;\n      padding: 0;\n      margin-left: auto;\n      font-size: 1.25rem;\n      line-height: 1;\n      transition: opacity 0.15s;\n    }\n    .toast-close:hover {\n      opacity: 1;\n    }\n\n    @keyframes toast-slide-in {\n      from {\n        transform: translateX(100%);\n        opacity: 0;\n      }\n      to {\n        transform: translateX(0);\n        opacity: 1;\n      }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastContainerComponent, { className: "ToastContainerComponent", filePath: "src\\app\\shared\\components\\toast-container.component.ts", lineNumber: 145 }); })();
//# sourceMappingURL=toast-container.component.js.map