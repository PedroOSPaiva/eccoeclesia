import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BirthdaysPage from './pages/BirthdaysPage.jsx';
import ExpensesPage from './pages/ExpensesPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import LedgerPage from './pages/LedgerPage.jsx';
import SplashScreen from './components/SplashScreen.jsx';
import PasswordResetPage from './pages/PasswordResetPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';

function App() {
  const { isAuthenticated, tokens } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!tokens?.mustChangePassword) return;
    if (location.pathname !== '/password-reset') {
      navigate('/password-reset', { replace: true });
    }
  }, [isAuthenticated, tokens, location.pathname, navigate]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/birthdays" element={<BirthdaysPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/ledger" element={<LedgerPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default App;
