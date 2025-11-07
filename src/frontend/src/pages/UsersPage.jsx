import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import userService from '../services/userService.js';

const ROLE_OPTIONS = ['COORDINATION', 'SECRETARIAT', 'TREASURER', 'PRIEST', 'FAITHFUL'];

function UsersPage() {
  const { profile } = useAuth();
  const authorities = profile?.authorities ?? [];
  const canManage = authorities.includes('users:manage');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ email: '', password: '', roles: ['FAITHFUL'] });
  const [editingId, setEditingId] = useState(null);
  const [editingRoles, setEditingRoles] = useState([]);

  useEffect(() => {
    if (!canManage) {
      return;
    }
    userService
      .list()
      .then((list) => {
        setUsers(list);
        setError(null);
      })
      .catch(() => setError('Não foi possível carregar os usuários.'))
      .finally(() => setLoading(false));
  }, [canManage]);

  if (!canManage) {
    return (
      <div className="grid" style={{ gap: '2rem' }}>
        <div>
          <h1 className="page-title">Gestão de usuários</h1>
          <p>Seu perfil não possui permissão para administrar contas.</p>
        </div>
      </div>
    );
  }

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === 'roles') {
      setForm((current) => {
        const roles = new Set(current.roles);
        if (checked) {
          roles.add(value);
        } else {
          roles.delete(value);
        }
        return { ...current, roles: Array.from(roles) };
      });
    } else {
      setForm((current) => ({ ...current, [name]: type === 'number' ? Number(value) : value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      const created = await userService.create({
        email: form.email,
        password: form.password,
        roles: form.roles
      });
      setUsers((current) => [...current, created]);
      setForm({ email: '', password: '', roles: ['FAITHFUL'] });
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao criar o usuário.';
      setError(message);
    }
  };

  const toggleRole = (role) => {
    setEditingRoles((current) => {
      const next = new Set(current);
      if (next.has(role)) {
        next.delete(role);
      } else {
        next.add(role);
      }
      return Array.from(next);
    });
  };

  const startEditing = (user) => {
    setEditingId(user.id);
    setEditingRoles(user.roles ?? []);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingRoles([]);
  };

  const saveRoles = async () => {
    try {
      const updated = await userService.updateRoles(editingId, editingRoles);
      setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
      cancelEditing();
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao atualizar permissões.';
      setError(message);
    }
  };

  const handlePasswordReset = async (user) => {
    const newPassword = window.prompt('Informe a nova senha para o usuário:');
    if (!newPassword) {
      return;
    }
    try {
      const updated = await userService.updatePassword(user.id, newPassword);
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      alert('Senha atualizada com sucesso.');
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao atualizar a senha.';
      setError(message);
    }
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Gestão de usuários</h1>
        <p>Crie contas, defina papéis e atualize credenciais dos responsáveis pela paróquia.</p>
      </div>

      {error && <p className="error" role="alert">{error}</p>}

      <section className="section">
        <h2>Novo usuário</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha provisória</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={handleFormChange} />
          </div>
          <div className="input-group" style={{ gridColumn: '1 / -1' }}>
            <span>Perfis</span>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
              {ROLE_OPTIONS.map((role) => (
                <label key={role} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="roles"
                    value={role}
                    checked={form.roles.includes(role)}
                    onChange={handleFormChange}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="primary-button" type="submit">
              Criar usuário
            </button>
          </div>
        </form>
      </section>

      <section className="section">
        <h2>Contas cadastradas</h2>
        {loading ? (
          <p>Carregando…</p>
        ) : users.length === 0 ? (
          <p>Nenhum usuário cadastrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Papéis</th>
                <th>Autoridades</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    {editingId === user.id ? (
                      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
                        {ROLE_OPTIONS.map((role) => (
                          <label key={role} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={editingRoles.includes(role)}
                              onChange={() => toggleRole(role)}
                            />
                            {role}
                          </label>
                        ))}
                      </div>
                    ) : (
                      (user.roles ?? []).join(', ')
                    )}
                  </td>
                  <td>{(user.authorities ?? []).join(', ')}</td>
                  <td style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {editingId === user.id ? (
                      <>
                        <button type="button" onClick={saveRoles} className="primary-button" style={{ padding: '0.25rem 0.75rem' }}>
                          Salvar
                        </button>
                        <button type="button" onClick={cancelEditing} style={{ padding: '0.25rem 0.75rem' }}>
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button type="button" onClick={() => startEditing(user)} style={{ padding: '0.25rem 0.75rem' }}>
                        Editar papéis
                      </button>
                    )}
                    <button type="button" onClick={() => handlePasswordReset(user)} style={{ padding: '0.25rem 0.75rem' }}>
                      Redefinir senha
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

export default UsersPage;
