import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = 'http://localhost:8080/api/auth';
  private readonly loggedIn = signal(!!localStorage.getItem('accessToken'));

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean { return this.loggedIn(); }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.api}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.loggedIn.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.loggedIn.set(false);
  }

  token(): string | null { return localStorage.getItem('accessToken'); }
}
