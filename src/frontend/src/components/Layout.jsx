import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Layout.css';

function Layout() {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">EcoEcclesia</h1>
        <nav>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/expenses" className={({ isActive }) => (isActive ? 'active' : '')}>
            Gastos
          </NavLink>
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
