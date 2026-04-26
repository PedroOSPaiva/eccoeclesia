import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly api = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: Record<string, string>) {
    let p = new HttpParams();
    Object.entries(params ?? {}).forEach(([k,v]) => p = p.set(k, v));
    return this.http.get<T>(`${this.api}${path}`, { params: p });
  }

  post<T>(path: string, body: unknown) { return this.http.post<T>(`${this.api}${path}`, body); }
}
