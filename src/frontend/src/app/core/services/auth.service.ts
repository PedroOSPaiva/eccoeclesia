import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role?: string;
  tokenType?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = '/api/auth';
  private readonly loggedIn = signal<boolean>(!!localStorage.getItem('accessToken'));
  private readonly currentRole = signal<string | null>(localStorage.getItem('userRole'));
  private readonly currentUserEmail = signal<string | null>(localStorage.getItem('userEmail'));

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  role(): string | null {
    return this.currentRole();
  }

  email(): string | null {
    return this.currentUserEmail();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        if (res.role) {
          localStorage.setItem('userRole', res.role);
          this.currentRole.set(res.role);
        }
        localStorage.setItem('userEmail', email);
        this.currentUserEmail.set(email);
        this.loggedIn.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    this.currentRole.set(null);
    this.currentUserEmail.set(null);
    this.loggedIn.set(false);
  }

  token(): string | null {
    return localStorage.getItem('accessToken');
  }
}
