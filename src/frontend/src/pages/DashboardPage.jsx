import { useEffect, useMemo, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import StatCard from '../components/StatCard.jsx';
import reportService from '../services/reportService.js';

const COLORS = ['#134e4a', '#0f766e', '#0891b2', '#2563eb', '#7c3aed', '#f97316'];

function DashboardPage() {
  const [data, setData] = useState({
    expenseTotal: 0,
    groupedExpenses: {},
    inventorySummary: { totalItems: 0, consumables: 0, durables: 0, lowStock: 0 },
    alerts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    reportService
      .loadDashboardData()
      .then((loaded) => {
        setData(loaded);
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os indicadores.'))
      .finally(() => setLoading(false));
  }, []);

  const expenseChartData = useMemo(
    () =>
      Object.entries(data.groupedExpenses).map(([name, value]) => ({
        name,
        value: Number(value)
      })),
    [data.groupedExpenses]
  );

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <header>
        <h1 className="page-title">Visão Geral</h1>
        <p>Resumo financeiro e de estoque da paróquia.</p>
      </header>

      {error && <p className="error" role="alert">{error}</p>}

      <section className="grid cols-2">
        <StatCard title="Total de Gastos" value={`R$ ${data.expenseTotal.toFixed(2)}`} description="Despesas registradas no período" />
        <StatCard title="Itens no estoque" value={data.inventorySummary.totalItems} description="Itens cadastrados" />
        <StatCard title="Alertas de estoque" value={data.inventorySummary.lowStock} description="Itens abaixo do mínimo" />
        <StatCard title="Solicitações recentes" value={data.alerts.length} description="Itens que precisam de ação" />
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
