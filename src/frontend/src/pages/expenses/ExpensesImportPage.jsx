import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlerts } from '../../components/Alerts.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import financeService from '../../services/financeService.js';

function ExpensesImportPage() {
  const { profile } = useAuth();
  const authorities = profile?.authorities ?? [];
  const canImport = authorities.includes('expenses:manage');
  const navigate = useNavigate();
  const { showSuccess, showError, showInfo } = useAlerts();
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  if (!canImport) {
    return (
      <div className="grid" style={{ gap: '2rem' }}>
        <div>
          <h1 className="page-title">Importar extrato financeiro</h1>
          <p>Seu perfil não possui permissão para importar extratos financeiros.</p>
          <Link to="/expenses">Voltar para gastos</Link>
        </div>
      </div>
    );
  }

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Selecione um arquivo CSV para continuar.');
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setSubmitting(true);
      setError(null);
      const importResult = await financeService.importStatement(formData);
      setResult(importResult);
      formElement.reset();
      setFile(null);

      const successMessage = `${importResult.expensesImported} despesa(s) e ${importResult.revenuesImported} receita(s) importadas.`;
      showSuccess('Importação concluída', successMessage);

      if (importResult.skipped > 0) {
        const infoMessage = `${importResult.skipped} lançamento(s) foram ignorados.`;
        showInfo('Linhas ignoradas', infoMessage);
      }

      if (importResult.errors && importResult.errors.length > 0) {
        showError('Erros encontrados', importResult.errors.join('\n'));
      }
    } catch (err) {
      const message = err.response?.data?.message ?? 'Não foi possível importar o extrato.';
      setError(message);
      showError('Erro ao importar', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Importar extrato financeiro</h1>
        <p>Envie um arquivo CSV para cadastrar despesas e receitas automaticamente.</p>
        <button type="button" onClick={() => navigate('/expenses')} style={{ background: 'none', border: 'none', padding: 0, color: '#2563eb', cursor: 'pointer' }}>
          ← Voltar para gastos
        </button>
      </div>

      <section className="section">
        <h2>Selecionar arquivo</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="statement-file">Arquivo CSV</label>
            <input
              id="statement-file"
              name="file"
              type="file"
              accept=".csv,text/csv"
              required
              onChange={handleFileChange}
            />
            <small style={{ color: '#64748b' }}>O arquivo deve seguir o layout fornecido pelo banco.</small>
          </div>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? 'Importando…' : 'Importar extrato'}
            </button>
            <button type="button" onClick={() => navigate('/expenses')} style={{ border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </form>
      </section>

      {result && (
        <section className="section">
          <h2>Resultado da última importação</h2>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
            <li>Despesas importadas: {result.expensesImported}</li>
            <li>Receitas importadas: {result.revenuesImported}</li>
            <li>Linhas ignoradas: {result.skipped}</li>
          </ul>

          {result.errors && result.errors.length > 0 ? (
            <div style={{ marginTop: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Erros encontrados</h3>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {result.errors.map((lineError, index) => (
                  <li key={index}>{lineError}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ marginTop: '1rem', color: '#16a34a' }}>Nenhum erro identificado.</p>
          )}
        </section>
      )}
    </div>
  );
}

export default ExpensesImportPage;
