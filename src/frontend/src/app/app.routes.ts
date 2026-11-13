import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './pages/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { LedgerPageComponent } from './pages/ledger-page.component';
import { ReportsPageComponent } from './pages/reports-page.component';
import { ExpensesPageComponent } from './pages/expenses-page.component';
import { RevenuesPageComponent } from './pages/revenues-page.component';
import { InventoryPageComponent } from './pages/inventory-page.component';
import { BirthdaysPageComponent } from './pages/birthdays-page.component';
import { UsersPageComponent } from './pages/users-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page.component';
import { PasswordResetPageComponent } from './pages/password-reset-page.component';

export const routes: Routes = [
  // Rotas Públicas (Autenticação)
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'Login | EcoEcclesia',
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    title: 'Recuperar Senha | EcoEcclesia',
  },
  {
    path: 'reset-password',
    component: PasswordResetPageComponent,
    title: 'Redefinir Senha | EcoEcclesia',
  },

  // Rotas Protegidas (Módulos do Sistema)
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardPageComponent,
    title: 'Dashboard Financeiro | EcoEcclesia',
  },
  {
    path: 'ledger',
    canActivate: [authGuard],
    component: LedgerPageComponent,
    title: 'Livro Razão Contábil | EcoEcclesia',
  },
  {
    path: 'reports',
    canActivate: [authGuard],
    component: ReportsPageComponent,
    title: 'Relatórios Financeiros | EcoEcclesia',
  },
  {
    path: 'expenses',
    canActivate: [authGuard],
    component: ExpensesPageComponent,
    title: 'Controle de Despesas | EcoEcclesia',
  },
  {
    path: 'revenues',
    canActivate: [authGuard],
    component: RevenuesPageComponent,
    title: 'Controle de Receitas | EcoEcclesia',
  },
  {
    path: 'inventory',
    canActivate: [authGuard],
    component: InventoryPageComponent,
    title: 'Inventário Patrimonial | EcoEcclesia',
  },
  {
    path: 'birthdays',
    canActivate: [authGuard],
    component: BirthdaysPageComponent,
    title: 'Aniversariantes | EcoEcclesia',
  },
  {
    path: 'users',
    canActivate: [authGuard],
    component: UsersPageComponent,
    title: 'Gestão de Usuários | EcoEcclesia',
  },

  // Redirecionamento de rota inexistente
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
