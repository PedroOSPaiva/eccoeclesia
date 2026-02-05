import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Brand from '../components/Brand.jsx';
import authService from '../services/authService.js';
import './LoginPage.css';

function ForgotPasswordPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(searchParams.get('token') ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [issuedToken, setIssuedToken] = useState(null);

  const canReset = useMemo(() => token.trim().length > 0, [token]);

  const handleRequestToken = async (event) => {
    event.preventDefault();
    setRequestError(null);
    setIssuedToken(null);
    try {
      setRequestLoading(true);
      const response = await authService.forgotPassword(email);
      setIssuedToken(response);
      setToken(response.resetToken ?? '');
    } catch (err) {
      setRequestError(err.response?.data?.error ?? 'Não foi possível solicitar recuperação de senha.');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setResetError(null);
    setResetSuccess(false);
    if (password.length < 8) {
      setResetError('A nova senha precisa ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setResetError('As senhas não conferem.');
      return;
    }
    try {
      setResetLoading(true);
      await authService.resetPassword(token, password);
      setResetSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setResetError(err.response?.data?.error ?? 'Não foi possível redefinir a senha.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ gap: '1rem' }}>
        <Brand subtitle="Recuperação de acesso" />
        <p className="eyebrow">Solicite um token e redefina sua senha.</p>

        <form onSubmit={handleRequestToken} className="input-group" style={{ gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="forgot-email">E-mail da conta</label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu.email@paroquia.org"
            required
          />
          <button className="primary-button" type="submit" disabled={requestLoading}>
            {requestLoading ? 'Solicitando…' : 'Gerar token de recuperação'}
          </button>
        </form>

        {requestError && <p className="error" role="alert">{requestError}</p>}
        {issuedToken?.resetToken && (
          <div className="helper" style={{ background: '#ecfeff', padding: '0.75rem', borderRadius: '0.75rem' }}>
            <strong>Token gerado:</strong> <code>{issuedToken.resetToken}</code>
            <br />
            <small>Expira em: {issuedToken.expiresAt}</small>
          </div>
        )}

        <hr style={{ width: '100%', border: 0, borderTop: '1px solid #e2e8f0' }} />

        <form onSubmit={handleResetPassword} className="input-group" style={{ gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="reset-token">Token de recuperação</label>
          <input
            id="reset-token"
            type="text"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Cole o token aqui"
            required
          />

          <label htmlFor="reset-password">Nova senha</label>
          <input
            id="reset-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <label htmlFor="reset-confirm-password">Confirmar nova senha</label>
          <input
            id="reset-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          <button className="primary-button" type="submit" disabled={resetLoading || !canReset}>
            {resetLoading ? 'Redefinindo…' : 'Redefinir senha'}
          </button>
        </form>

        {resetError && <p className="error" role="alert">{resetError}</p>}
        {resetSuccess && <p className="helper" role="status">Senha redefinida com sucesso. Faça login novamente.</p>}

        <Link to="/login" className="helper" style={{ textAlign: 'center' }}>
          Voltar para login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
