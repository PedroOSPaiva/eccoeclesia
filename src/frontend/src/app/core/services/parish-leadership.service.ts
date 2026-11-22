import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface ParishLeader {
  id?: string;
  name: string;
  role: string;
  active: boolean;
  displayOrder: number;
}

@Injectable({ providedIn: 'root' })
export class ParishLeadershipService {
  private readonly http = inject(HttpClient);
  private readonly api = '/api/parish-leadership';

  readonly leaders = signal<ParishLeader[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  loadLeaders(onlyActive: boolean = false): Observable<ParishLeader[]> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<ParishLeader[]>(`${this.api}?onlyActive=${onlyActive}`).pipe(
      tap({
        next: (res) => {
          this.leaders.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Não foi possível carregar os responsáveis paroquiais.');
          this.loading.set(false);
        },
      })
    );
  }

  saveLeader(leader: ParishLeader): Observable<ParishLeader> {
    this.loading.set(true);
    const req = leader.id
      ? this.http.put<ParishLeader>(`${this.api}/${leader.id}`, leader)
      : this.http.post<ParishLeader>(this.api, leader);

    return req.pipe(
      tap({
        next: () => {
          this.loading.set(false);
          this.loadLeaders().subscribe();
        },
        error: () => {
          this.error.set('Erro ao salvar responsável.');
          this.loading.set(false);
        },
      })
    );
  }

  deleteLeader(id: string): Observable<void> {
    this.loading.set(true);
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap({
        next: () => {
          this.loading.set(false);
          this.loadLeaders().subscribe();
        },
        error: () => {
          this.error.set('Erro ao remover responsável.');
          this.loading.set(false);
        },
      })
    );
  }
}
