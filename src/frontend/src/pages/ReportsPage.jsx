import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import reportService from '../services/reportService.js';

function ReportsPage() {
  const [data, setData] = useState({ expenses: [], inventoryItems: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    reportService
      .loadDashboardData()
      .then((result) => {
        setData({ expenses: result.expenses, inventoryItems: result.inventoryItems });
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os relatórios.'))
      .finally(() => setLoading(false));
  }, []);

  const expensesByCategory = useMemo(() => {
    const totals = data.expenses.reduce((acc, expense) => {
      const category = expense.category ?? 'Não categorizado';
      acc[category] = (acc[category] ?? 0) + Number(expense.amount ?? 0);
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));
  }, [data.expenses]);

  const filteredExpenses = useMemo(() => {
    if (!categoryFilter) {
      return data.expenses;
    }
    return data.expenses.filter((expense) => (expense.category ?? 'Não categorizado') === categoryFilter);
  }, [data.expenses, categoryFilter]);

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

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Relatórios analíticos</h1>
        <p>Visualize tendências de gastos e movimentação de estoque.</p>
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
