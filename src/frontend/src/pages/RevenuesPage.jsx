import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import revenueService from '../services/revenueService.js';

const defaultForm = { amount: '', description: '', category: '' };

function RevenuesPage() {
  const { profile } = useAuth();
  const authorities = profile?.authorities ?? [];
  const canManage = authorities.includes('revenues:manage');
  const canView = canManage || authorities.includes('reports:view');

  const [revenues, setRevenues] = useState([]);
  const [form, setForm] = useState(() => ({ ...defaultForm }));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canView) {
      return;
    }
    revenueService
      .list()
      .then((items) => setRevenues(items))
      .catch(() => setError('Não foi possível carregar as receitas.'))
      .finally(() => setLoading(false));
  }, [canView]);

  if (!canView) {
    return (
      <div className="grid" style={{ gap: '2rem' }}>
        <div>
          <h1 className="page-title">Receitas</h1>
          <p>Seu perfil não possui permissão para visualizar receitas financeiras.</p>
        </div>
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      amount: Number(form.amount),
      description: form.description,
      category: form.category || null
    };

    try {
      setError(null);
      if (editingId) {
        const updated = await revenueService.update(editingId, payload);
        setRevenues((current) => current.map((revenue) => (revenue.id === editingId ? updated : revenue)));
      } else {
        const created = await revenueService.create(payload);
        setRevenues((current) => [created, ...current]);
      }
      setForm({ ...defaultForm });
      setEditingId(null);
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao salvar a receita.';
      setError(message);
    }
  };

  const handleEdit = (revenue) => {
    setEditingId(revenue.id);
    setForm({
      amount: revenue.amount != null ? String(revenue.amount) : '',
      description: revenue.description ?? '',
      category: revenue.category ?? ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) {
      return;
    }
    await revenueService.remove(id);
    setRevenues((current) => current.filter((revenue) => revenue.id !== id));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) {
      return '';
    }
    try {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(isoDate));
    } catch (error) {
      return isoDate;
    }
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Gestão de receitas</h1>
        <p>Registre contribuições e acompanhe entradas financeiras.</p>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      {canManage && (
        <section className="section">
          <h2>{editingId ? 'Editar receita' : 'Nova receita'}</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="amount">Valor (R$)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                required
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Descrição</label>
              <input id="description" name="description" required value={form.description} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="category">Categoria</label>
              <input id="category" name="category" value={form.category} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="primary-button" type="submit">
                {editingId ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="section">
        <h2>Lançamentos</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : revenues.length === 0 ? (
          <p>Nenhuma receita cadastrada.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Data</th>
                {canManage && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {revenues.map((revenue) => (
                <tr key={revenue.id}>
                  <td>{revenue.description}</td>
                  <td>{revenue.category ?? 'Não informada'}</td>
                  <td>R$ {Number(revenue.amount).toFixed(2)}</td>
                  <td>{formatDate(revenue.createdAt)}</td>
                  {canManage && (
                    <td>
                      <button type="button" onClick={() => handleEdit(revenue)} style={{ marginRight: '0.5rem' }}>
                        Editar
                      </button>
                      <button type="button" onClick={() => handleDelete(revenue.id)}>Excluir</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default RevenuesPage;
