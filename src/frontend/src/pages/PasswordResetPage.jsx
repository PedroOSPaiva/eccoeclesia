import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import authService from '../services/authService.js';

function PasswordResetPage() {
  const { logout, tokens } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não conferem.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      await authService.changePassword(password);
      authService.updateStoredTokens({ mustChangePassword: false, daysUntilPasswordExpiry: 120 });
      setSuccess(true);
      setTimeout(() => window.location.assign('/dashboard'), 800);
    } catch (err) {
      setError(err.response?.data?.error ?? 'Erro ao atualizar a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid" style={{ gap: '2rem' }}>
      <div>
        <h1 className="page-title">Atualize sua senha</h1>
        <p>Este é o primeiro acesso. Por segurança, defina uma nova senha.</p>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
      {success && <p className="success" role="status">Senha atualizada com sucesso. Redirecionando...</p>}

      <section className="section">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="new-password">Nova senha</label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar senha</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </button>
            <button type="button" onClick={logout}>
              Cancelar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PasswordResetPage;
