import { Component, computed, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-finance-chart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
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
  `,
  styles: [`
    .chart-container {
      margin-bottom: 1.5rem;
      padding: 1.5rem;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .chart-header h3 {
      margin: 0 0 0.25rem 0;
      font-size: 1.15rem;
      color: #0f172a;
      font-weight: 700;
    }

    .chart-subtitle {
      margin: 0;
      font-size: 0.85rem;
      color: #64748b;
    }

    .badge-ratio {
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-favorable {
      background: #dcfce7;
      color: #15803d;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
    }

    .status-alert {
      background: #fee2e2;
      color: #b91c1c;
      padding: 0.35rem 0.75rem;
      border-radius: 9999px;
    }

    .chart-content {
      display: grid;
      grid-template-columns: 180px 1fr;
      align-items: center;
      gap: 2rem;
    }

    @media (max-width: 640px) {
      .chart-content {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }

    .chart-visual {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .donut-svg {
      width: 150px;
      height: 150px;
      transform: rotate(-90deg);
    }

    .donut-segment {
      transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .donut-center-title {
      font-size: 7px;
      font-weight: 700;
      fill: #64748b;
      letter-spacing: 0.08em;
      transform: rotate(90deg);
      transform-origin: 60px 60px;
    }

    .donut-center-pct {
      font-size: 14px;
      font-weight: 800;
      fill: #0f172a;
      transform: rotate(90deg);
      transform-origin: 60px 60px;
    }

    .chart-details {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      width: 100%;
    }

    .legend-card {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      background: #f8fafc;
      border: 1px solid #f1f5f9;
      gap: 1rem;
    }

    .legend-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .legend-income .legend-indicator {
      background: #22c55e;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
    }

    .legend-expense .legend-indicator {
      background: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
    }

    .legend-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .legend-label {
      font-size: 0.8rem;
      color: #64748b;
    }

    .legend-value {
      font-size: 1.05rem;
      color: #1e293b;
      font-weight: 700;
    }

    .legend-percent {
      font-size: 1.1rem;
      font-weight: 800;
      color: #334155;
    }

    .bar-comparison {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-top: 0.25rem;
    }

    .bar-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
    }

    .progress-track {
      height: 10px;
      background: #f1f5f9;
      border-radius: 9999px;
      overflow: hidden;
      display: flex;
    }

    .progress-fill {
      height: 100%;
      transition: width 0.5s ease-in-out;
    }

    .income-fill {
      background: #22c55e;
    }

    .expense-fill {
      background: #ef4444;
    }
  `],
})
export class FinanceChartComponent {
  readonly totalIncome = input.required<number>();
  readonly totalExpense = input.required<number>();

  protected readonly radius = 45;
  protected readonly circumference = 2 * Math.PI * this.radius; // ~282.74

  protected readonly total = computed<number>(() => {
    return (this.totalIncome() || 0) + (this.totalExpense() || 0);
  });

  protected readonly incomePercent = computed<number>(() => {
    const tot = this.total();
    if (tot <= 0) return 50;
    return Math.round(((this.totalIncome() || 0) / tot) * 100);
  });

  protected readonly expensePercent = computed<number>(() => {
    const tot = this.total();
    if (tot <= 0) return 50;
    return 100 - this.incomePercent();
  });

  protected readonly incomeDashOffset = computed<number>(() => {
    const pct = this.incomePercent();
    return this.circumference * (1 - pct / 100);
  });
}
