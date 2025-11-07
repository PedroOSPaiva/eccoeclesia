import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Layout.css';

function Layout() {
  const { logout, profile } = useAuth();
  const authorities = profile?.authorities ?? [];
  const canManageExpenses = authorities.includes('expenses:manage');
  const canViewReports = authorities.includes('reports:view');
  const canManageRevenues = authorities.includes('revenues:manage');
  const canViewInventory = authorities.includes('inventory:view');
  const canManageUsers = authorities.includes('users:manage');

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">EcoEcclesia</h1>
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          {(canManageExpenses || canViewReports) && (
            <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
              Gastos
            </NavLink>
          )}
          {(canManageRevenues || canViewReports) && (
            <NavLink to="/revenues" className={({ isActive }) => (isActive ? 'active' : '')}>
              Receitas
            </NavLink>
          )}
          {canViewInventory && (
            <NavLink to="/inventory" className={({ isActive }) => (isActive ? 'active' : '')}>
              Estoque
            </NavLink>
          )}
          {canViewReports && (
            <NavLink to="/reports" className={({ isActive }) => (isActive ? 'active' : '')}>
              Relatórios
            </NavLink>
          )}
          {canManageUsers && (
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>
              Usuários
            </NavLink>
          )}
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
