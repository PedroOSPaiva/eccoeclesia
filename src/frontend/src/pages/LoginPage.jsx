import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import './LoginPage.css';

function LoginPage() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      const message = err.response?.data?.message ?? 'Não foi possível entrar. Verifique as credenciais.';
      setError(message);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>EcoEcclesia</h1>
        <p>Faça login para acessar os dashboards administrativos.</p>
        {error && <p className="error" role="alert">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu.email@paroquia.org"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            required
          />
        </div>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
