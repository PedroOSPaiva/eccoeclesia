import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import userService from '../services/userService.js';

const ROLE_OPTIONS = ['ADMIN', 'FINANCE', 'VOLUNTEER'];

function UsersPage() {
  const { profile } = useAuth();
  const authorities = profile?.authorities ?? [];
  const canManage = authorities.includes('users:manage');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    roles: ['VOLUNTEER'],
    fullName: '',
    birthDate: '',
    address: '',
    photoUrl: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editingRoles, setEditingRoles] = useState([]);
  const [profileEditingId, setProfileEditingId] = useState(null);
  const [profileForm, setProfileForm] = useState({
    email: '',
    fullName: '',
    birthDate: '',
    address: '',
    photoUrl: ''
  });

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
        roles: form.roles,
        fullName: form.fullName,
        birthDate: form.birthDate,
        address: form.address,
        photoUrl: form.photoUrl
      });
      setUsers((current) => [...current, created]);
      setForm({ email: '', password: '', roles: ['VOLUNTEER'], fullName: '', birthDate: '', address: '', photoUrl: '' });
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

  const startProfileEditing = (user) => {
    setProfileEditingId(user.id);
    setProfileForm({
      email: user.email ?? '',
      fullName: user.fullName ?? '',
      birthDate: user.birthDate ?? '',
      address: user.address ?? '',
      photoUrl: user.photoUrl ?? ''
    });
  };

  const cancelProfileEditing = () => {
    setProfileEditingId(null);
    setProfileForm({ email: '', fullName: '', birthDate: '', address: '', photoUrl: '' });
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      const updated = await userService.updateProfile(profileEditingId, profileForm);
      setUsers((current) => current.map((user) => (user.id === updated.id ? updated : user)));
      cancelProfileEditing();
    } catch (err) {
      const message = err.response?.data?.message ?? 'Erro ao atualizar o perfil.';
      setError(message);
    }
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
            <label htmlFor="fullName">Nome completo</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required value={form.email} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha provisória</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="birthDate">Data de nascimento</label>
            <input id="birthDate" name="birthDate" type="date" value={form.birthDate} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="address">Endereço</label>
            <input id="address" name="address" value={form.address} onChange={handleFormChange} />
          </div>
          <div className="input-group">
            <label htmlFor="photoUrl">Foto (URL)</label>
            <input id="photoUrl" name="photoUrl" value={form.photoUrl} onChange={handleFormChange} />
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
                <th>Nome</th>
                <th>Nascimento</th>
                <th>Endereço</th>
                <th>Foto</th>
                <th>Papéis</th>
                <th>Autoridades</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.fullName ?? '-'}</td>
                  <td>{user.birthDate ?? '-'}</td>
                  <td>{user.address ?? '-'}</td>
                  <td>
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={`Foto de ${user.fullName ?? user.email}`}
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
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
                    <button type="button" onClick={() => startProfileEditing(user)} style={{ padding: '0.25rem 0.75rem' }}>
                      Editar perfil
                    </button>
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

      {profileEditingId && (
        <section className="section">
          <h2>Editar perfil</h2>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="profileEmail">E-mail</label>
              <input
                id="profileEmail"
                name="email"
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="profileFullName">Nome completo</label>
              <input id="profileFullName" name="fullName" value={profileForm.fullName} onChange={handleProfileChange} />
            </div>
            <div className="input-group">
              <label htmlFor="profileBirthDate">Data de nascimento</label>
              <input
                id="profileBirthDate"
                name="birthDate"
                type="date"
                value={profileForm.birthDate}
                onChange={handleProfileChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="profileAddress">Endereço</label>
              <input id="profileAddress" name="address" value={profileForm.address} onChange={handleProfileChange} />
            </div>
            <div className="input-group">
              <label htmlFor="profilePhotoUrl">Foto (URL)</label>
              <input id="profilePhotoUrl" name="photoUrl" value={profileForm.photoUrl} onChange={handleProfileChange} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem' }}>
              <button type="button" className="primary-button" onClick={saveProfile}>
                Salvar perfil
              </button>
              <button type="button" onClick={cancelProfileEditing}>
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default UsersPage;
