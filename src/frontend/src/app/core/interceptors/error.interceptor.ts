import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          toastService.error('Não foi possível carregar os dados (recurso não encontrado no servidor).');
        } else if (error.status >= 500) {
          toastService.error('Erro interno no servidor (500). Tente novamente mais tarde.');
        } else if (error.status === 0) {
          toastService.error('Não foi possível conectar ao servidor. Verifique se o backend está em execução.');
        } else if (error.status === 403) {
          toastService.error('Acesso negado: seu usuário não possui permissão para esta ação.');
        }
      }
      return throwError(() => error);
    })
  );
};
