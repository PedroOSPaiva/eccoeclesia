import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Brand from './Brand.jsx';
import './Layout.css';

function Layout() {
  const { logout, hasPermission, tokens } = useAuth();
  const warningDays = tokens?.daysUntilPasswordExpiry ?? null;
  const showWarning = warningDays !== null && warningDays <= 30 && warningDays > 0;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/dashboard" className="brand-link" aria-label="Ir para o dashboard">
          <Brand layout="inline" size="lg" tone="inverse" subtitle="Painel" />
        </NavLink>

        <nav aria-label="Navegação principal">
          <div className="nav-group">
            <p className="nav-group__title">Geral</p>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              Dashboard
            </NavLink>
            <NavLink to="/birthdays" className={({ isActive }) => (isActive ? 'active' : '')}>
              Aniversariantes
            </NavLink>
            <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
              Estoque
            </NavLink>
          </div>

          <div className="nav-group">
            <p className="nav-group__title">Financeiro</p>
            <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
              Gastos
            </NavLink>
            {hasPermission('finance:read') && (
              <>
                <NavLink to="/ledger" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Lançamentos
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Relatórios
                </NavLink>
              </>
            )}
          </div>
        </nav>

        <button type="button" className="logout" onClick={logout}>
          Sair
        </button>
      </aside>
      <main className="content">
        {showWarning && (
          <div className="warning-banner">
            Sua senha expira em {warningDays} dia(s). Atualize-a para manter o acesso seguro.
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
