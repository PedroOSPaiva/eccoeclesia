import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Brand from './Brand.jsx';
import './Layout.css';

function Layout() {
  const { logout, hasPermission } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Brand layout="inline" size="lg" tone="inverse" subtitle="Painel" />
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/birthdays" className={({ isActive }) => (isActive ? 'active' : '')}>
            Aniversariantes
          </NavLink>
          <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
            Gastos
          </NavLink>
          {hasPermission('finance:read') && (
            <NavLink to="/ledger" className={({ isActive }) => (isActive ? 'active' : '')}>
              Financeiro
            </NavLink>
          )}
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
            Estoque
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
            Relatórios
          </NavLink>
        </nav>
        <button type="button" className="logout" onClick={logout}>
          Sair
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
