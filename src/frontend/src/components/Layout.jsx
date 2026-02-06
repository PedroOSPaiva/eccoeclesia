import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import Brand from './Brand.jsx';
import './Layout.css';

const linkClassName = ({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`;

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

        <nav aria-label="Navegação principal" className="sidebar-nav">
          <section className="nav-group" aria-label="Módulos gerais">
            <p className="nav-group__title">Geral</p>
            <NavLink to="/dashboard" className={linkClassName}>
              Dashboard
            </NavLink>
            <NavLink to="/birthdays" className={linkClassName}>
              Aniversariantes
            </NavLink>
            <NavLink to="/inventory" className={linkClassName}>
              Estoque
            </NavLink>
          </section>

          <section className="nav-group" aria-label="Módulos financeiros">
            <p className="nav-group__title">Financeiro</p>
            <NavLink to="/expenses" className={linkClassName}>
              Gastos
            </NavLink>
            {hasPermission('finance:read') && (
              <>
                <NavLink to="/ledger" className={linkClassName}>
                  Lançamentos
                </NavLink>
                <NavLink to="/reports" className={linkClassName}>
                  Relatórios
                </NavLink>
              </>
            )}
          </section>
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
