import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'error' | 'success' | 'info' | 'warning';
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  show(message: string, type: 'error' | 'success' | 'info' | 'warning' = 'info', durationMs = 4500): string {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      message,
      type,
      createdAt: Date.now(),
    };

    // Evita duplicatas consecutivas idênticas num curto intervalo
    const current = this._toasts();
    if (current.length > 0 && current[current.length - 1].message === message) {
      return current[current.length - 1].id;
    }

    this._toasts.update((toasts) => [...toasts, newToast]);

    if (durationMs > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, durationMs);
    }

    return id;
  }

  error(message: string, durationMs = 5000): string {
    return this.show(message, 'error', durationMs);
  }

  success(message: string, durationMs = 3500): string {
    return this.show(message, 'success', durationMs);
  }

  info(message: string, durationMs = 4000): string {
    return this.show(message, 'info', durationMs);
  }

  warning(message: string, durationMs = 4500): string {
    return this.show(message, 'warning', durationMs);
  }

  dismiss(id: string): void {
    this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}
