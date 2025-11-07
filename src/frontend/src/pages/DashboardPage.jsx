import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import StatCard from '../components/StatCard.jsx';
import reportService from '../services/reportService.js';

const COLORS = ['#134e4a', '#0f766e', '#0891b2', '#2563eb', '#7c3aed', '#f97316'];

function DashboardPage() {
  const [data, setData] = useState({
    revenues: [],
    expenseTotal: 0,
    revenueTotal: 0,
    netResult: 0,
    groupedExpenses: {},
    groupedRevenues: {},
    inventorySummary: { totalItems: 0, consumables: 0, durables: 0, lowStock: 0 },
    alerts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodType, setPeriodType] = useState('month');
  const [referenceDate, setReferenceDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  });

  const range = useMemo(() => computeRange(periodType, referenceDate), [periodType, referenceDate]);

  useEffect(() => {
    if (!range.startDate || !range.endDate) {
      return;
    }
    setLoading(true);
    reportService
      .loadDashboardData(range)
      .then((loaded) => {
        setData(loaded);
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os indicadores.'))
      .finally(() => setLoading(false));
  }, [range.startDate, range.endDate]);

  const expenseChartData = useMemo(
    () =>
      Object.entries(data.groupedExpenses).map(([name, value]) => ({
        name,
        value: Number(value)
      })),
    [data.groupedExpenses]
  );

  const revenueChartData = useMemo(
    () =>
      Object.entries(data.groupedRevenues).map(([name, value]) => ({
        name,
        value: Number(value)
      })),
    [data.groupedRevenues]
  );

  const monthInputValue = useMemo(
    () => `${referenceDate.getUTCFullYear()}-${String(referenceDate.getUTCMonth() + 1).padStart(2, '0')}`,
    [referenceDate]
  );

  const yearInputValue = useMemo(() => String(referenceDate.getUTCFullYear()), [referenceDate]);

  const handleMonthChange = (event) => {
    const value = event.target.value;
    if (!value) {
      return;
    }
    const parsed = new Date(`${value}-01T00:00:00Z`);
    if (!Number.isNaN(parsed.getTime())) {
      setReferenceDate(new Date(Date.UTC(parsed.getUTCFullYear(), parsed.getUTCMonth(), 1)));
    }
  };

  const handleYearChange = (event) => {
    const year = Number(event.target.value);
    if (Number.isNaN(year)) {
      return;
    }
    setReferenceDate(new Date(Date.UTC(year, referenceDate.getUTCMonth(), 1)));
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <header>
        <h1 className="page-title">Visão Geral</h1>
        <p>
          Resumo financeiro e de estoque da paróquia entre {range.startDate} e {range.endDate}.
        </p>
        <div className="grid" style={{ gap: '1rem', marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="input-group">
            <label htmlFor="period-type">Período</label>
            <select id="period-type" value={periodType} onChange={(event) => setPeriodType(event.target.value)}>
              <option value="month">Mensal</option>
              <option value="quarter">Trimestral</option>
              <option value="year">Anual</option>
            </select>
          </div>
          {periodType === 'year' ? (
            <div className="input-group">
              <label htmlFor="reference-year">Ano de referência</label>
              <input
                id="reference-year"
                type="number"
                min="2000"
                max="2100"
                value={yearInputValue}
                onChange={handleYearChange}
              />
            </div>
          ) : (
            <div className="input-group">
              <label htmlFor="reference-month">Mês de referência</label>
              <input id="reference-month" type="month" value={monthInputValue} onChange={handleMonthChange} />
            </div>
          )}
        </div>
      </header>

      {error && <p className="error" role="alert">{error}</p>}

      <section
        className="grid"
        style={{
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
        }}
      >
        <StatCard title="Total de Receitas" value={`R$ ${data.revenueTotal.toFixed(2)}`} description="Entradas registradas" />
        <StatCard title="Total de Gastos" value={`R$ ${data.expenseTotal.toFixed(2)}`} description="Despesas registradas" />
        <StatCard
          title="Resultado Líquido"
          value={`R$ ${data.netResult.toFixed(2)}`}
          description="Receitas menos despesas"
        />
        <StatCard title="Itens no estoque" value={data.inventorySummary.totalItems} description="Itens cadastrados" />
        <StatCard title="Alertas de estoque" value={data.inventorySummary.lowStock} description="Itens abaixo do mínimo" />
        <StatCard title="Alertas recentes" value={data.alerts.length} description="Itens que precisam de ação" />
      </section>

      <section className="section">
        <h2>Distribuição de gastos</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : expenseChartData.length === 0 ? (
          <p>Nenhum gasto registrado.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={expenseChartData} innerRadius={60} outerRadius={120} paddingAngle={4}>
                  {expenseChartData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Distribuição de receitas</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : revenueChartData.length === 0 ? (
          <p>Nenhuma receita registrada.</p>
        ) : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={revenueChartData} innerRadius={60} outerRadius={120} paddingAngle={4}>
                  {revenueChartData.map((entry, index) => (
                    <Cell key={`revenue-cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Alertas de estoque</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : data.alerts.length === 0 ? (
          <p>Nenhum alerta no momento.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantidade</th>
                <th>Mínimo</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {data.alerts.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.minimumQuantity}</td>
                  <td>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;

function computeRange(periodType, referenceDate) {
  if (!(referenceDate instanceof Date) || Number.isNaN(referenceDate.getTime())) {
    return { startDate: null, endDate: null };
  }
  const year = referenceDate.getUTCFullYear();
  const month = referenceDate.getUTCMonth();
  let startMonth = month;
  let monthsToAdd = 1;
  if (periodType === 'quarter') {
    startMonth = Math.floor(month / 3) * 3;
    monthsToAdd = 3;
  } else if (periodType === 'year') {
    startMonth = 0;
    monthsToAdd = 12;
  }
  const start = new Date(Date.UTC(year, startMonth, 1));
  const end = new Date(Date.UTC(year, startMonth + monthsToAdd, 0));
  return {
    startDate: formatDate(start),
    endDate: formatDate(end)
  };
}

function formatDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
