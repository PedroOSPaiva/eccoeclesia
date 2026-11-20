import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { CreateMemberDto, Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/members';

  // --- Sinais Privados ---
  private readonly _members = signal<Member[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  // --- Sinais Públicos (Read-only) ---
  readonly members = this._members.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // --- Sinais Computados ---
  readonly totalCount = computed<number>(() => this._members().length);

  readonly activeCount = computed<number>(() =>
    this._members().filter((m) => m.status === 'ACTIVE').length
  );

  readonly stewardsCount = computed<number>(() =>
    this._members().filter(
      (m) =>
        m.isSteward ||
        (m.ministry && m.ministry.toLowerCase().includes('dízim'))
    ).length
  );

  loadMembers(communityId?: string | null): Observable<Member[]> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (communityId && communityId !== 'ALL') {
      params = params.set('communityId', communityId);
    }

    return this.http.get<Member[]>(this.apiUrl, { params }).pipe(
      tap({
        next: (data) => this._members.set(data ?? []),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar membros.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  createMember(dto: CreateMemberDto): Observable<Member> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.post<Member>(this.apiUrl, dto).pipe(
      tap({
        next: (created) => this._members.update((list) => [created, ...list]),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar membro.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  updateMember(id: string, dto: Partial<CreateMemberDto>): Observable<Member> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.put<Member>(`${this.apiUrl}/${id}`, dto).pipe(
      tap({
        next: (updated) =>
          this._members.update((list) =>
            list.map((m) => (m.id === id ? updated : m))
          ),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao atualizar membro.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  deleteMember(id: string): Observable<void> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap({
        next: () => this._members.update((list) => list.filter((m) => m.id !== id)),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao remover membro.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  clearError(): void {
    this._error.set(null);
  }
}
