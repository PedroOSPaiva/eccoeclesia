import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(() => authService.loadTokens());
  const [profile, setProfile] = useState(() => {
    if (!tokens) return null;
    return { email: tokens.email, role: tokens.role, permissions: tokens.permissions ?? [] };
  });
  const [loading, setLoading] = useState(false);
  const isAuthenticated = Boolean(tokens?.accessToken);

  useEffect(() => {
    authService.subscribe(setTokens);
    return () => authService.unsubscribe(setTokens);
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      setTokens(result);
      setProfile({ email: result.email, role: result.role, permissions: result.permissions ?? [] });
      navigate('/dashboard', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setTokens(null);
    setProfile(null);
    navigate('/login', { replace: true });
  };

  const hasPermission = (permission) => profile?.permissions?.includes(permission);

  const value = useMemo(
    () => ({
      tokens,
      profile,
      isAuthenticated,
      login: handleLogin,
      logout,
      loading,
      hasPermission
    }),
    [tokens, profile, isAuthenticated, loading, hasPermission]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
