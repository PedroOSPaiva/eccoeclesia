import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor HTTP funcional responsável por anexar o token JWT (Bearer)
 * nas requisições destinadas à API REST e interceptar expiração de sessão (401).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.token();

  let authReq = req;

  // Anexa o cabeçalho Authorization se o token existir e a requisição for para a API interna
  if (token && (req.url.startsWith('/api') || req.url.includes('/api/'))) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/api/auth/login')) {
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { sessionExpired: 'true' },
        });
      }
      return throwError(() => error);
    })
  );
};
