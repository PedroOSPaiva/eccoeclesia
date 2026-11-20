import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { Community } from '../models/community.model';

const STORAGE_KEY = 'ecoecclesia_active_community_id';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/communities';

  // --- Sinais Privados ---
  private readonly _communities = signal<Community[]>([]);
  private readonly _activeCommunityId = signal<string | null>(
    localStorage.getItem(STORAGE_KEY) || 'ALL'
  );
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _noticeMessage = signal<string | null>(null);

  // --- Sinais Públicos (Read-only) ---
  readonly communities = this._communities.asReadonly();
  readonly activeCommunityId = this._activeCommunityId.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly noticeMessage = this._noticeMessage.asReadonly();

  // --- Sinais Computados ---
  readonly activeCommunity = computed<Community | null>(() => {
    const id = this._activeCommunityId();
    if (!id || id === 'ALL') {
      return null;
    }
    return this._communities().find((c) => c.id === id) ?? null;
  });

  readonly isAll = computed<boolean>(() => {
    const id = this._activeCommunityId();
    return !id || id === 'ALL';
  });

  /**
   * Carrega a lista de comunidades cadastradas na paróquia.
   */
  loadCommunities(): Observable<Community[]> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Community[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          const list = data ?? [];
          this._communities.set(list);

          // Valida se o ID em cache ainda existe na lista ou se é ALL
          const currentId = this._activeCommunityId();
          if (currentId && currentId !== 'ALL' && !list.some((c) => c.id === currentId)) {
            this.setActiveCommunity('ALL');
          }
        },
        error: (err) => {
          this._error.set(err?.error?.error || 'Erro ao carregar comunidades.');
        },
      }),
      finalize(() => this._loading.set(false))
    );
  }

  /**
   * Define a comunidade ativa para escopo financeiro e de membros.
   * Persiste no localStorage e emite feedback para o usuário.
   */
  setActiveCommunity(id: string | null): void {
    const normalizedId = !id || id === 'ALL' ? 'ALL' : id;
    this._activeCommunityId.set(normalizedId);
    localStorage.setItem(STORAGE_KEY, normalizedId);

    const comm = this._communities().find((c) => c.id === normalizedId);
    const label = comm ? comm.name : 'Todas as Comunidades (Visão Consolidada)';
    this._noticeMessage.set(`Comunidade ativa alterada para: ${label}`);

    setTimeout(() => {
      this._noticeMessage.set(null);
    }, 3500);
  }

  clearNotice(): void {
    this._noticeMessage.set(null);
  }
}
