import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(() => authService.loadTokens());
  const [profile, setProfile] = useState(() => authService.loadProfile());
  const [loading, setLoading] = useState(false);
  const isAuthenticated = Boolean(tokens?.accessToken);
  const profileRequested = useRef(false);

  useEffect(() => {
    const handleTokensChange = (updatedTokens) => {
      setTokens(updatedTokens);
    };
    const handleProfileChange = (updatedProfile) => {
      setProfile(updatedProfile);
    };
    authService.subscribe(handleTokensChange);
    authService.subscribeToProfile(handleProfileChange);
    return () => {
      authService.unsubscribe(handleTokensChange);
      authService.unsubscribeFromProfile(handleProfileChange);
    };
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const { tokens: newTokens, profile: newProfile } = await authService.login(email, password);
      setTokens(newTokens);
      setProfile(newProfile);
      navigate('/dashboard', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setTokens(null);
    setProfile(null);
    profileRequested.current = false;
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (tokens && !profile && !profileRequested.current) {
      profileRequested.current = true;
      authService
        .fetchProfile()
        .then((fetched) => {
          setProfile(fetched);
        })
        .catch(() => {
          profileRequested.current = false;
        });
    }
  }, [tokens, profile]);

  const value = useMemo(
    () => ({
      tokens,
      profile,
      isAuthenticated,
      login: handleLogin,
      logout,
      loading
    }),
    [tokens, profile, isAuthenticated, loading]
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
