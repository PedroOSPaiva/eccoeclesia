import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import ledgerService from '../services/ledgerService.js';
import './LedgerPage.css';

function LedgerPage() {
  const { hasPermission } = useAuth();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ type: 'INCOME', accountCode: '1.1.01', description: '', amount: '', referenceCode: '', costCenter: '' });
  const [report, setReport] = useState('');
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
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [items, reportText] = await Promise.all([ledgerService.list(), ledgerService.fetchReportText()]);
      setEntries(items);
      setReport(reportText);
    } catch (err) {
      setError(err?.message ?? 'Falha ao carregar lançamentos');
    } finally {
      setLoading(false);
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
    const blob = kind === 'pdf' ? await ledgerService.downloadPdf() : await ledgerService.downloadCsv();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.download = kind === 'pdf' ? 'demonstrativo.pdf' : 'demonstrativo.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="ledger-page">
      <header className="ledger-header">
        <div>
          <h1>Razão Financeiro</h1>
          <p>Cadastre receitas e despesas com código de conta, centro de custo e referência.</p>
        </div>
        <div className="ledger-actions">
          <button type="button" onClick={() => download('pdf')}>Baixar PDF</button>
          <button type="button" onClick={() => download('csv')}>Baixar CSV</button>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}

      <div className="ledger-grid">
        <section className="card">
          <h2>Novo lançamento</h2>
          {!canWrite && <p className="muted">Apenas perfis autorizados podem registrar lançamentos.</p>}
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
              <input value={form.accountCode} onChange={(e) => setForm({ ...form, accountCode: e.target.value })} required />
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
            <button type="submit" disabled={loading || !canWrite}>Gravar</button>
          </form>
        </section>

        <section className="card">
          <h2>Lançamentos</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Conta</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Ref.</th>
                  <th>Centro</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.occurredOn}</td>
                    <td>{entry.type}</td>
                    <td>{entry.accountCode}</td>
                    <td>{entry.description}</td>
                    <td>R$ {Number(entry.amount).toFixed(2)}</td>
                    <td>{entry.referenceCode}</td>
                    <td>{entry.costCenter}</td>
                  </tr>
                ))}
                {entries.length === 0 && (
                  <tr>
                    <td colSpan="7" className="muted">Nenhum lançamento encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </div>

      <section className="card report-card">
        <div className="report-header">
          <h2>Demonstrativo consolidado</h2>
          <button type="button" onClick={refresh}>Recarregar</button>
        </div>
        <pre className="report-block">{report}</pre>
      </section>
    </div>
  );
}

export default LedgerPage;
