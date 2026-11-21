import { inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
export class BaseApiService {
    http = inject(HttpClient);
    _items = signal([]);
    _loading = signal(false);
    _error = signal(null);
    items = this._items.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    load(params) {
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
        return this.http.get(this.apiUrl, { params: httpParams }).pipe(tap({
            next: (data) => this._items.set(data ?? []),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar dados.'),
        }), finalize(() => this._loading.set(false)));
    }
    create(dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.post(this.apiUrl, dto).pipe(tap({
            next: (created) => this._items.update((list) => [created, ...list]),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao registrar item.'),
        }), finalize(() => this._loading.set(false)));
    }
    delete(id) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap({
            next: () => this._items.update((list) => list.filter((item) => item.id !== id)),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao excluir item.'),
        }), finalize(() => this._loading.set(false)));
    }
    clearError() {
        this._error.set(null);
    }
}
//# sourceMappingURL=base-api.service.js.map