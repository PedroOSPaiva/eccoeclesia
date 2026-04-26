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
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  { path: 'reset-password', component: PasswordResetPageComponent },
  { path: '', canActivate: [authGuard], component: DashboardPageComponent },
  { path: 'ledger', canActivate: [authGuard], component: LedgerPageComponent },
  { path: 'reports', canActivate: [authGuard], component: ReportsPageComponent },
  { path: 'expenses', canActivate: [authGuard], component: ExpensesPageComponent },
  { path: 'revenues', canActivate: [authGuard], component: RevenuesPageComponent },
  { path: 'inventory', canActivate: [authGuard], component: InventoryPageComponent },
  { path: 'birthdays', canActivate: [authGuard], component: BirthdaysPageComponent },
  { path: 'users', canActivate: [authGuard], component: UsersPageComponent },
];
