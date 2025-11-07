import { useEffect, useState } from 'react';
import expenseService from '../services/expenseService.js';

const defaultForm = { amount: '', description: '', category: '' };

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(() => ({ ...defaultForm }));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    expenseService
      .list()
      .then((items) => setExpenses(items))
      .catch(() => setError('Não foi possível carregar os gastos.'))
      .finally(() => setLoading(false));
  }, []);

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
        const updated = await expenseService.update(editingId, payload);
        setExpenses((current) => current.map((expense) => (expense.id === editingId ? updated : expense)));
      } else {
        const created = await expenseService.create(payload);
        setExpenses((current) => [created, ...current]);
      }
      setForm({ ...defaultForm });
      setEditingId(null);
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao salvar o gasto.';
      setError(message);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      amount: expense.amount != null ? String(expense.amount) : '',
      description: expense.description ?? '',
      category: expense.category ?? ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este gasto?')) {
      return;
    }
    await expenseService.remove(id);
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Gestão de gastos</h1>
        <p>Registre novas despesas e acompanhe lançamentos existentes.</p>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <section className="section">
        <h2>{editingId ? 'Editar gasto' : 'Novo gasto'}</h2>
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
            <input
              id="description"
              name="description"
              required
              value={form.description}
              onChange={handleChange}
            />
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

      <section className="section">
        <h2>Lançamentos</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : expenses.length === 0 ? (
          <p>Nenhum gasto cadastrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.description}</td>
                  <td>{expense.category ?? 'Não informada'}</td>
                  <td>R$ {Number(expense.amount).toFixed(2)}</td>
                  <td>
                    <button type="button" onClick={() => handleEdit(expense)} style={{ marginRight: '0.5rem' }}>
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(expense.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default ExpensesPage;
