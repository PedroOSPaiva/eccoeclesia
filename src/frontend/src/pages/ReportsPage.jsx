import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import reportService from '../services/reportService.js';

function ReportsPage() {
  const [data, setData] = useState({ expenses: [], revenues: [], inventoryItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [revenueCategoryFilter, setRevenueCategoryFilter] = useState('');
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
      .then((result) => {
        setData({ expenses: result.expenses, revenues: result.revenues, inventoryItems: result.inventoryItems });
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os relatórios.'))
      .finally(() => setLoading(false));
  }, [range.startDate, range.endDate]);

  const expensesByCategory = useMemo(() => {
    const totals = data.expenses.reduce((acc, expense) => {
      const category = expense.category ?? 'Não categorizado';
      acc[category] = (acc[category] ?? 0) + Number(expense.amount ?? 0);
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
  }, [data.expenses]);

  const revenuesByCategory = useMemo(() => {
    const totals = data.revenues.reduce((acc, revenue) => {
      const category = revenue.category ?? 'Não categorizado';
      acc[category] = (acc[category] ?? 0) + Number(revenue.amount ?? 0);
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
  }, [data.revenues]);

  const filteredExpenses = useMemo(() => {
    if (!categoryFilter) {
      return data.expenses;
    }
    return data.expenses.filter((expense) => (expense.category ?? 'Não categorizado') === categoryFilter);
  }, [data.expenses, categoryFilter]);

  const filteredRevenues = useMemo(() => {
    if (!revenueCategoryFilter) {
      return data.revenues;
    }
    return data.revenues.filter((revenue) => (revenue.category ?? 'Não categorizado') === revenueCategoryFilter);
  }, [data.revenues, revenueCategoryFilter]);

  const inventoryByType = useMemo(() => {
    const grouped = data.inventoryItems.reduce(
      (acc, item) => {
        const type = item.type === 'CONSUMABLE' ? 'Consumíveis' : 'Duráveis';
        acc[type] = (acc[type] ?? 0) + Number(item.quantity ?? 0);
        return acc;
      },
      {}
    );
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [data.inventoryItems]);

  const categories = useMemo(
    () => [''].concat([...new Set(data.expenses.map((expense) => expense.category ?? 'Não categorizado'))]),
    [data.expenses]
  );

  const revenueCategories = useMemo(
    () => [''].concat([...new Set(data.revenues.map((revenue) => revenue.category ?? 'Não categorizado'))]),
    [data.revenues]
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
      <div>
        <h1 className="page-title">Relatórios analíticos</h1>
        <p>
          Visualize tendências de receitas, gastos e movimentação de estoque entre {range.startDate} e {range.endDate}.
        </p>
        <div className="grid" style={{ gap: '1rem', marginTop: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="input-group">
            <label htmlFor="report-period">Período</label>
            <select id="report-period" value={periodType} onChange={(event) => setPeriodType(event.target.value)}>
              <option value="month">Mensal</option>
              <option value="quarter">Trimestral</option>
              <option value="year">Anual</option>
            </select>
          </div>
          {periodType === 'year' ? (
            <div className="input-group">
              <label htmlFor="report-year">Ano de referência</label>
              <input id="report-year" type="number" min="2000" max="2100" value={yearInputValue} onChange={handleYearChange} />
            </div>
          ) : (
            <div className="input-group">
              <label htmlFor="report-month">Mês de referência</label>
              <input id="report-month" type="month" value={monthInputValue} onChange={handleMonthChange} />
            </div>
          )}
        </div>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <section className="section">
        <h2>Gastos por categoria</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : expensesByCategory.length === 0 ? (
          <p>Nenhum dado disponível.</p>
        ) : (
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={expensesByCategory}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="value" name="Valor" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Receitas por categoria</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : revenuesByCategory.length === 0 ? (
          <p>Nenhum dado disponível.</p>
        ) : (
          <div style={{ width: '100%', height: 360 }}>
            <ResponsiveContainer>
              <BarChart data={revenuesByCategory}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={80} />
                <YAxis tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="value" name="Valor" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Detalhes de despesas</h2>
        <div className="input-group" style={{ maxWidth: '240px' }}>
          <label htmlFor="category-filter">Filtrar por categoria</label>
          <select id="category-filter" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category || 'Todas'}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Carregando…</p>
        ) : filteredExpenses.length === 0 ? (
          <p>Nenhum gasto encontrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.category ?? 'Não categorizado'}</td>
                  <td>R$ {Number(expense.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="section">
        <h2>Detalhes de receitas</h2>
        <div className="input-group" style={{ maxWidth: '240px' }}>
          <label htmlFor="revenue-category-filter">Filtrar por categoria</label>
          <select
            id="revenue-category-filter"
            value={revenueCategoryFilter}
            onChange={(event) => setRevenueCategoryFilter(event.target.value)}
          >
            {revenueCategories.map((category) => (
              <option key={category} value={category}>
                {category || 'Todas'}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Carregando…</p>
        ) : filteredRevenues.length === 0 ? (
          <p>Nenhuma receita encontrada.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenues.map((revenue) => (
                <tr key={revenue.id}>
                  <td>{revenue.description}</td>
                  <td>{revenue.category ?? 'Não categorizado'}</td>
                  <td>R$ {Number(revenue.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="section">
        <h2>Estoque por tipo</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : inventoryByType.length === 0 ? (
          <p>Nenhum item cadastrado.</p>
        ) : (
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={inventoryByType}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Quantidade" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}

export default ReportsPage;

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
