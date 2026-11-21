import { Component, computed, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function FinanceChartComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Sem dados no per\u00EDodo");
    i0.ɵɵelementEnd();
} }
function FinanceChartComponent_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Super\u00E1vit Projetado (", ctx_r0.incomePercent(), "% receitas)");
} }
function FinanceChartComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Aten\u00E7\u00E3o ao D\u00E9ficit (", ctx_r0.expensePercent(), "% despesas)");
} }
export class FinanceChartComponent {
    totalIncome = input.required();
    totalExpense = input.required();
    radius = 45;
    circumference = 2 * Math.PI * this.radius; // ~282.74
    total = computed(() => {
        return (this.totalIncome() || 0) + (this.totalExpense() || 0);
    });
    incomePercent = computed(() => {
        const tot = this.total();
        if (tot <= 0)
            return 50;
        return Math.round(((this.totalIncome() || 0) / tot) * 100);
    });
    expensePercent = computed(() => {
        const tot = this.total();
        if (tot <= 0)
            return 50;
        return 100 - this.incomePercent();
    });
    incomeDashOffset = computed(() => {
        const pct = this.incomePercent();
        return this.circumference * (1 - pct / 100);
    });
    static ɵfac = function FinanceChartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FinanceChartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FinanceChartComponent, selectors: [["app-finance-chart"]], inputs: { totalIncome: [1, "totalIncome"], totalExpense: [1, "totalExpense"] }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 50, vars: 24, consts: [[1, "chart-container", "card"], [1, "chart-header"], [1, "chart-subtitle"], [1, "badge-ratio"], [1, "status-favorable"], [1, "status-alert"], [1, "chart-content"], [1, "chart-visual"], ["viewBox", "0 0 120 120", 1, "donut-svg"], ["cx", "60", "cy", "60", "r", "45", "fill", "transparent", "stroke", "#ef4444", "stroke-width", "16"], ["cx", "60", "cy", "60", "r", "45", "fill", "transparent", "stroke", "#22c55e", "stroke-width", "16", "stroke-linecap", "round", 1, "donut-segment"], ["x", "60", "y", "55", "text-anchor", "middle", 1, "donut-center-title"], ["x", "60", "y", "73", "text-anchor", "middle", 1, "donut-center-pct"], [1, "chart-details"], [1, "legend-card", "legend-income"], [1, "legend-indicator"], [1, "legend-info"], [1, "legend-label"], [1, "legend-value"], [1, "legend-percent"], [1, "legend-card", "legend-expense"], [1, "bar-comparison"], [1, "bar-labels"], [1, "progress-track"], [1, "progress-fill", "income-fill"], [1, "progress-fill", "expense-fill"]], template: function FinanceChartComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h3");
            i0.ɵɵtext(4, "Propor\u00E7\u00E3o Financeira: Receitas x Despesas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p", 2);
            i0.ɵɵtext(6, "Comparativo percentual de entradas e sa\u00EDdas consolidadas");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3);
            i0.ɵɵtemplate(8, FinanceChartComponent_Conditional_8_Template, 2, 0, "span")(9, FinanceChartComponent_Conditional_9_Template, 2, 1, "span", 4)(10, FinanceChartComponent_Conditional_10_Template, 2, 1, "span", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 6)(12, "div", 7);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(13, "svg", 8);
            i0.ɵɵelement(14, "circle", 9)(15, "circle", 10);
            i0.ɵɵelementStart(16, "text", 11);
            i0.ɵɵtext(17, "RECEITAS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "text", 12);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(20, "div", 13)(21, "div", 14);
            i0.ɵɵelement(22, "div", 15);
            i0.ɵɵelementStart(23, "div", 16)(24, "span", 17);
            i0.ɵɵtext(25, "Receitas Totais");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "strong", 18);
            i0.ɵɵtext(27);
            i0.ɵɵpipe(28, "currency");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "span", 19);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 20);
            i0.ɵɵelement(32, "div", 15);
            i0.ɵɵelementStart(33, "div", 16)(34, "span", 17);
            i0.ɵɵtext(35, "Despesas Totais");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "strong", 18);
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "currency");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "span", 19);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 21)(42, "div", 22)(43, "span");
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span");
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 23);
            i0.ɵɵelement(48, "div", 24)(49, "div", 25);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵconditional(ctx.total() === 0 ? 8 : ctx.incomePercent() >= 50 ? 9 : 10);
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("stroke-dasharray", ctx.circumference)("stroke-dashoffset", ctx.incomeDashOffset());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", ctx.incomePercent(), "%");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(28, 14, ctx.totalIncome(), "BRL", "symbol", "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.incomePercent(), "%");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(38, 19, ctx.totalExpense(), "BRL", "symbol", "1.2-2"));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1("", ctx.expensePercent(), "%");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Entradas: ", ctx.incomePercent(), "%");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("Sa\u00EDdas: ", ctx.expensePercent(), "%");
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.incomePercent(), "%");
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("width", ctx.expensePercent(), "%");
        } }, dependencies: [CommonModule, i1.CurrencyPipe], styles: [".chart-container[_ngcontent-%COMP%] {\n      margin-bottom: 1.5rem;\n      padding: 1.5rem;\n      background: #ffffff;\n      border-radius: 12px;\n      border: 1px solid #e2e8f0;\n      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n    }\n\n    .chart-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      margin-bottom: 1.5rem;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n    }\n\n    .chart-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin: 0 0 0.25rem 0;\n      font-size: 1.15rem;\n      color: #0f172a;\n      font-weight: 700;\n    }\n\n    .chart-subtitle[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .badge-ratio[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 600;\n    }\n\n    .status-favorable[_ngcontent-%COMP%] {\n      background: #dcfce7;\n      color: #15803d;\n      padding: 0.35rem 0.75rem;\n      border-radius: 9999px;\n    }\n\n    .status-alert[_ngcontent-%COMP%] {\n      background: #fee2e2;\n      color: #b91c1c;\n      padding: 0.35rem 0.75rem;\n      border-radius: 9999px;\n    }\n\n    .chart-content[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 180px 1fr;\n      align-items: center;\n      gap: 2rem;\n    }\n\n    @media (max-width: 640px) {\n      .chart-content[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        justify-items: center;\n      }\n    }\n\n    .chart-visual[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .donut-svg[_ngcontent-%COMP%] {\n      width: 150px;\n      height: 150px;\n      transform: rotate(-90deg);\n    }\n\n    .donut-segment[_ngcontent-%COMP%] {\n      transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .donut-center-title[_ngcontent-%COMP%] {\n      font-size: 7px;\n      font-weight: 700;\n      fill: #64748b;\n      letter-spacing: 0.08em;\n      transform: rotate(90deg);\n      transform-origin: 60px 60px;\n    }\n\n    .donut-center-pct[_ngcontent-%COMP%] {\n      font-size: 14px;\n      font-weight: 800;\n      fill: #0f172a;\n      transform: rotate(90deg);\n      transform-origin: 60px 60px;\n    }\n\n    .chart-details[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.875rem;\n      width: 100%;\n    }\n\n    .legend-card[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      padding: 0.75rem 1rem;\n      border-radius: 8px;\n      background: #f8fafc;\n      border: 1px solid #f1f5f9;\n      gap: 1rem;\n    }\n\n    .legend-indicator[_ngcontent-%COMP%] {\n      width: 12px;\n      height: 12px;\n      border-radius: 50%;\n      flex-shrink: 0;\n    }\n\n    .legend-income[_ngcontent-%COMP%]   .legend-indicator[_ngcontent-%COMP%] {\n      background: #22c55e;\n      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);\n    }\n\n    .legend-expense[_ngcontent-%COMP%]   .legend-indicator[_ngcontent-%COMP%] {\n      background: #ef4444;\n      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);\n    }\n\n    .legend-info[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .legend-label[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: #64748b;\n    }\n\n    .legend-value[_ngcontent-%COMP%] {\n      font-size: 1.05rem;\n      color: #1e293b;\n      font-weight: 700;\n    }\n\n    .legend-percent[_ngcontent-%COMP%] {\n      font-size: 1.1rem;\n      font-weight: 800;\n      color: #334155;\n    }\n\n    .bar-comparison[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.35rem;\n      margin-top: 0.25rem;\n    }\n\n    .bar-labels[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      font-size: 0.75rem;\n      font-weight: 600;\n      color: #64748b;\n    }\n\n    .progress-track[_ngcontent-%COMP%] {\n      height: 10px;\n      background: #f1f5f9;\n      border-radius: 9999px;\n      overflow: hidden;\n      display: flex;\n    }\n\n    .progress-fill[_ngcontent-%COMP%] {\n      height: 100%;\n      transition: width 0.5s ease-in-out;\n    }\n\n    .income-fill[_ngcontent-%COMP%] {\n      background: #22c55e;\n    }\n\n    .expense-fill[_ngcontent-%COMP%] {\n      background: #ef4444;\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FinanceChartComponent, [{
        type: Component,
        args: [{ selector: 'app-finance-chart', standalone: true, imports: [CommonModule, CurrencyPipe], template: `
    <div class="chart-container card">
      <div class="chart-header">
        <div>
          <h3>Proporção Financeira: Receitas x Despesas</h3>
          <p class="chart-subtitle">Comparativo percentual de entradas e saídas consolidadas</p>
        </div>
        <div class="badge-ratio">
          @if (total() === 0) {
            <span>Sem dados no período</span>
          } @else if (incomePercent() >= 50) {
            <span class="status-favorable">Superávit Projetado ({{ incomePercent() }}% receitas)</span>
          } @else {
            <span class="status-alert">Atenção ao Déficit ({{ expensePercent() }}% despesas)</span>
          }
        </div>
      </div>

      <div class="chart-content">
        <!-- Gráfico em Donut SVG Responsivo e Dinâmico -->
        <div class="chart-visual">
          <svg viewBox="0 0 120 120" class="donut-svg">
            <!-- Círculo de Fundo (Despesas) -->
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="transparent"
              stroke="#ef4444"
              stroke-width="16"
            />
            <!-- Círculo de Sobreposição (Receitas) -->
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="transparent"
              stroke="#22c55e"
              stroke-width="16"
              [attr.stroke-dasharray]="circumference"
              [attr.stroke-dashoffset]="incomeDashOffset()"
              stroke-linecap="round"
              class="donut-segment"
            />
            <!-- Texto Central do Donut -->
            <text x="60" y="55" text-anchor="middle" class="donut-center-title">RECEITAS</text>
            <text x="60" y="73" text-anchor="middle" class="donut-center-pct">{{ incomePercent() }}%</text>
          </svg>
        </div>

        <!-- Estatísticas e Legendas Detalhadas -->
        <div class="chart-details">
          <div class="legend-card legend-income">
            <div class="legend-indicator"></div>
            <div class="legend-info">
              <span class="legend-label">Receitas Totais</span>
              <strong class="legend-value">{{ totalIncome() | currency:'BRL':'symbol':'1.2-2' }}</strong>
            </div>
            <span class="legend-percent">{{ incomePercent() }}%</span>
          </div>

          <div class="legend-card legend-expense">
            <div class="legend-indicator"></div>
            <div class="legend-info">
              <span class="legend-label">Despesas Totais</span>
              <strong class="legend-value">{{ totalExpense() | currency:'BRL':'symbol':'1.2-2' }}</strong>
            </div>
            <span class="legend-percent">{{ expensePercent() }}%</span>
          </div>

          <!-- Barra Linear Proporcional -->
          <div class="bar-comparison">
            <div class="bar-labels">
              <span>Entradas: {{ incomePercent() }}%</span>
              <span>Saídas: {{ expensePercent() }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill income-fill" [style.width.%]="incomePercent()"></div>
              <div class="progress-fill expense-fill" [style.width.%]="expensePercent()"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["\n    .chart-container {\n      margin-bottom: 1.5rem;\n      padding: 1.5rem;\n      background: #ffffff;\n      border-radius: 12px;\n      border: 1px solid #e2e8f0;\n      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n    }\n\n    .chart-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      margin-bottom: 1.5rem;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n    }\n\n    .chart-header h3 {\n      margin: 0 0 0.25rem 0;\n      font-size: 1.15rem;\n      color: #0f172a;\n      font-weight: 700;\n    }\n\n    .chart-subtitle {\n      margin: 0;\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .badge-ratio {\n      font-size: 0.8rem;\n      font-weight: 600;\n    }\n\n    .status-favorable {\n      background: #dcfce7;\n      color: #15803d;\n      padding: 0.35rem 0.75rem;\n      border-radius: 9999px;\n    }\n\n    .status-alert {\n      background: #fee2e2;\n      color: #b91c1c;\n      padding: 0.35rem 0.75rem;\n      border-radius: 9999px;\n    }\n\n    .chart-content {\n      display: grid;\n      grid-template-columns: 180px 1fr;\n      align-items: center;\n      gap: 2rem;\n    }\n\n    @media (max-width: 640px) {\n      .chart-content {\n        grid-template-columns: 1fr;\n        justify-items: center;\n      }\n    }\n\n    .chart-visual {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .donut-svg {\n      width: 150px;\n      height: 150px;\n      transform: rotate(-90deg);\n    }\n\n    .donut-segment {\n      transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n    }\n\n    .donut-center-title {\n      font-size: 7px;\n      font-weight: 700;\n      fill: #64748b;\n      letter-spacing: 0.08em;\n      transform: rotate(90deg);\n      transform-origin: 60px 60px;\n    }\n\n    .donut-center-pct {\n      font-size: 14px;\n      font-weight: 800;\n      fill: #0f172a;\n      transform: rotate(90deg);\n      transform-origin: 60px 60px;\n    }\n\n    .chart-details {\n      display: flex;\n      flex-direction: column;\n      gap: 0.875rem;\n      width: 100%;\n    }\n\n    .legend-card {\n      display: flex;\n      align-items: center;\n      padding: 0.75rem 1rem;\n      border-radius: 8px;\n      background: #f8fafc;\n      border: 1px solid #f1f5f9;\n      gap: 1rem;\n    }\n\n    .legend-indicator {\n      width: 12px;\n      height: 12px;\n      border-radius: 50%;\n      flex-shrink: 0;\n    }\n\n    .legend-income .legend-indicator {\n      background: #22c55e;\n      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);\n    }\n\n    .legend-expense .legend-indicator {\n      background: #ef4444;\n      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);\n    }\n\n    .legend-info {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .legend-label {\n      font-size: 0.8rem;\n      color: #64748b;\n    }\n\n    .legend-value {\n      font-size: 1.05rem;\n      color: #1e293b;\n      font-weight: 700;\n    }\n\n    .legend-percent {\n      font-size: 1.1rem;\n      font-weight: 800;\n      color: #334155;\n    }\n\n    .bar-comparison {\n      display: flex;\n      flex-direction: column;\n      gap: 0.35rem;\n      margin-top: 0.25rem;\n    }\n\n    .bar-labels {\n      display: flex;\n      justify-content: space-between;\n      font-size: 0.75rem;\n      font-weight: 600;\n      color: #64748b;\n    }\n\n    .progress-track {\n      height: 10px;\n      background: #f1f5f9;\n      border-radius: 9999px;\n      overflow: hidden;\n      display: flex;\n    }\n\n    .progress-fill {\n      height: 100%;\n      transition: width 0.5s ease-in-out;\n    }\n\n    .income-fill {\n      background: #22c55e;\n    }\n\n    .expense-fill {\n      background: #ef4444;\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FinanceChartComponent, { className: "FinanceChartComponent", filePath: "src\\app\\shared\\components\\finance-chart.component.ts", lineNumber: 285 }); })();
//# sourceMappingURL=finance-chart.component.js.map