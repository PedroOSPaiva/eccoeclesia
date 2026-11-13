import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { CreateUserDto, UserAccount } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/users';

  private readonly _users = signal<UserAccount[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly users = this._users.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadUsers(): Observable<UserAccount[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<UserAccount[]>(this.apiUrl).pipe(
      tap({
        next: (data) => this._users.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar usuários.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createUser(dto: CreateUserDto): Observable<UserAccount> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<UserAccount>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._users.update((list) => [...list, created]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar usuário.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  deleteUser(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this._users.update((list) => list.filter((u) => u.id !== id)),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao remover usuário.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}

