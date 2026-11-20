import { inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

export abstract class BaseApiService<T extends { id?: string }, TCreate = unknown> {
  protected readonly http = inject(HttpClient);
  protected abstract get apiUrl(): string;

  protected readonly _items = signal<T[]>([]);
  protected readonly _loading = signal<boolean>(false);
  protected readonly _error = signal<string | null>(null);

  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load(params?: Record<string, string>): Observable<T[]> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          httpParams = httpParams.set(key, val);
        }
      });
    }

    return this.http.get<T[]>(this.apiUrl, { params: httpParams }).pipe(
      tap({
        next: (data) => this._items.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar dados.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  create(dto: TCreate | unknown): Observable<T> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<T>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._items.update((list) => [created, ...list]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao registrar item.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  delete(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this._items.update((list) => list.filter((item) => item.id !== id)),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao excluir item.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

