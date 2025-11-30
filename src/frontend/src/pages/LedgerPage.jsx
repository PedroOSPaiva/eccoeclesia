import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import ledgerService from '../services/ledgerService.js';
import './LedgerPage.css';

function LedgerPage() {
  const { hasPermission } = useAuth();
  const [entries, setEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ type: 'INCOME', accountCode: '1.1.01', description: '', amount: '', referenceCode: '', costCenter: '' });
  const [report, setReport] = useState('');
  const [period, setPeriod] = useState(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];
    return { start, end };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canWrite = hasPermission('finance:write');

  if (!hasPermission('finance:read')) {
    return (
      <div className="ledger-page">
        <header className="ledger-header">
          <div>
            <h1>Razão Financeiro</h1>
            <p>Seu usuário não possui permissão para visualizar os lançamentos financeiros.</p>
          </div>
        </header>
      </div>
    );
  }

  useEffect(() => {
    refresh();
  }, [period.start, period.end]);

  useEffect(() => {
    loadAccounts();
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [items, reportText] = await Promise.all([ledgerService.list(period), ledgerService.fetchReportText(period)]);
      setEntries(items);
      setReport(reportText);
    } catch (err) {
      setError(err?.message ?? 'Falha ao carregar lançamentos');
    } finally {
      setLoading(false);
    }
  }

  async function loadAccounts() {
    try {
      const all = await ledgerService.listAccounts();
      setAccounts(all);
      if (all.length > 0) {
        setForm((prev) => ({ ...prev, accountCode: prev.accountCode || all[0].code }));
      }
    } catch (err) {
      setError(err?.message ?? 'Falha ao carregar plano de contas');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await ledgerService.create(form);
      setForm({ ...form, description: '', amount: '', referenceCode: '', costCenter: '' });
      await refresh();
    } catch (err) {
      setError(err?.message ?? 'Não foi possível gravar o lançamento');
    }
  }

  async function download(kind) {
    const blob = kind === 'pdf' ? await ledgerService.downloadPdf(period) : await ledgerService.downloadCsv(period);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.download = kind === 'pdf' ? 'demonstrativo.pdf' : 'demonstrativo.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  const totalIncome = entries.filter((e) => e.type === 'INCOME').reduce((sum, e) => sum + Number(e.amount), 0);
  const totalExpense = entries.filter((e) => e.type === 'EXPENSE').reduce((sum, e) => sum + Number(e.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="ledger-page">
      <header className="ledger-header">
        <div>
          <p className="eyebrow">Financeiro</p>
          <h1>Razão e demonstrativo</h1>
          <p className="lede">
            Cadastre receitas e despesas com conta contábil, referência e centro de custo. Baixe o relatório já no
            layout institucional.
          </p>
        </div>
        <div className="toolbar">
          <div className="period-picker">
            <label>
              Início
              <input type="date" value={period.start} onChange={(e) => setPeriod({ ...period, start: e.target.value })} />
            </label>
            <label>
              Fim
              <input type="date" value={period.end} onChange={(e) => setPeriod({ ...period, end: e.target.value })} />
            </label>
            <button type="button" className="ghost" onClick={refresh} disabled={loading}>
              Atualizar
            </button>
          </div>
          <div className="download-group">
            <button type="button" className="secondary" onClick={() => download('csv')}>
              ⇩ CSV
            </button>
            <button type="button" className="primary" onClick={() => download('pdf')}>
              ⇩ PDF oficial
            </button>
          </div>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}

      <section className="summary-grid">
        <div className="summary-card income">
          <p className="label">Receitas no período</p>
          <p className="value">R$ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-card expense">
          <p className="label">Despesas no período</p>
          <p className="value">R$ {totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-card balance">
          <p className="label">Saldo</p>
          <p className="value">R$ {balance.toFixed(2)}</p>
        </div>
      </section>

      <div className="ledger-grid">
        <section className="card">
          <div className="card-head">
            <div>
              <p className="eyebrow">Lançamento</p>
              <h2>Novo registro</h2>
            </div>
            {!canWrite && <span className="pill muted">Somente leitura</span>}
          </div>
          <form onSubmit={handleSubmit} className="ledger-form">
            <label>
              Tipo
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="INCOME">Receita</option>
                <option value="EXPENSE">Despesa</option>
              </select>
            </label>
            <label>
              Código da conta
              <select value={form.accountCode} onChange={(e) => setForm({ ...form, accountCode: e.target.value })}>
                {accounts.map((account) => (
                  <option key={account.code} value={account.code}>
                    {account.code} · {account.description}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Descrição
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            </label>
            <label>
              Valor
              <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </label>
            <label>
              Referência
              <input value={form.referenceCode} onChange={(e) => setForm({ ...form, referenceCode: e.target.value })} />
            </label>
            <label>
              Centro de custo
              <input value={form.costCenter} onChange={(e) => setForm({ ...form, costCenter: e.target.value })} />
            </label>
            <div className="form-actions">
              <button type="submit" className="primary" disabled={loading || !canWrite}>
                Gravar lançamento
              </button>
              <p className="muted">O PDF refletirá as informações salvas.</p>
            </div>
          </form>
        </section>

        <section className="card">
          <div className="card-head">
            <div>
              <p className="eyebrow">Lançamentos</p>
              <h2>Movimentações do período</h2>
            </div>
            {loading && <span className="pill muted">Atualizando…</span>}
          </div>
          {loading ? (
            <div className="skeleton-table" aria-live="polite">Carregando...</div>
          ) : (
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Conta</th>
                  <th>Descrição</th>
                  <th className="text-right">Valor</th>
                  <th>Ref.</th>
                  <th>Centro</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.occurredOn}</td>
                    <td>
                      <span className={`pill ${entry.type === 'INCOME' ? 'success' : 'danger'}`}>
                        {entry.type === 'INCOME' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td>{entry.accountCode}</td>
                    <td>{entry.description}</td>
                    <td className="text-right">R$ {Number(entry.amount).toFixed(2)}</td>
                    <td>{entry.referenceCode}</td>
                    <td>{entry.costCenter}</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan="7" className="muted text-center">Nenhum lançamento encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <section className="card plan-card">
        <div className="plan-header">
          <div>
            <p className="eyebrow">Plano de contas</p>
            <h2>Glossário paroquial</h2>
            <p className="muted">
              Lista oficial com código, classificação, tipo e descrição — use-a como referência para lançar receitas e despesas
              na conta correta.
            </p>
          </div>
          <button type="button" className="ghost" onClick={loadAccounts} disabled={loading}>
            Recarregar
          </button>
        </div>
        <div className="plan-grid">
          <div className="plan-legend">
            <p className="pill muted">Receitas</p>
            <p className="pill danger">Despesas</p>
          </div>
          <div className="plan-table-wrapper">
            <table className="plan-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Classificação</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.code}>
                    <td>{account.code}</td>
                    <td>{account.classification}</td>
                    <td>
                      <span className={`pill ${account.nature === 'INCOME' ? 'success' : 'danger'}`}>{account.type}</span>
                    </td>
                    <td>{account.description}</td>
                  </tr>
                ))}
                {accounts.length === 0 && (
                  <tr>
                    <td colSpan="4" className="muted text-center">Nenhum plano de contas carregado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="card report-card">
        <div className="report-header">
          <h2>Demonstrativo consolidado</h2>
          <button type="button" className="ghost" onClick={refresh} disabled={loading}>
            Recarregar
          </button>
        </div>
        <pre className="report-block">{report}</pre>
      </section>
    </div>
  );
}

export default LedgerPage;
