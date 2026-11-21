import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import * as i0 from "@angular/core";
export class MemberService {
    http = inject(HttpClient);
    apiUrl = '/api/members';
    // --- Sinais Privados ---
    _members = signal([]);
    _loading = signal(false);
    _error = signal(null);
    // --- Sinais Públicos (Read-only) ---
    members = this._members.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    // --- Sinais Computados ---
    totalCount = computed(() => this._members().length);
    activeCount = computed(() => this._members().filter((m) => m.status === 'ACTIVE' || m.status === 'ATIVO').length);
    inactiveCount = computed(() => this._members().filter((m) => m.status === 'INACTIVE' || m.status === 'INATIVO').length);
    stewardsCount = computed(() => this._members().filter((m) => m.isSteward ||
        (m.ministry && m.ministry.toLowerCase().includes('dízim'))).length);
    loadMembers(communityId) {
        this._loading.set(true);
        this._error.set(null);
        let params = new HttpParams();
        if (communityId && communityId !== 'ALL') {
            params = params.set('communityId', communityId);
        }
        return this.http.get(this.apiUrl, { params }).pipe(tap({
            next: (data) => this._members.set(data ?? []),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar membros.'),
        }), finalize(() => this._loading.set(false)));
    }
    createMember(dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.post(this.apiUrl, dto).pipe(tap({
            next: (created) => this._members.update((list) => [created, ...list]),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar membro.'),
        }), finalize(() => this._loading.set(false)));
    }
    updateMember(id, dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.put(`${this.apiUrl}/${id}`, dto).pipe(tap({
            next: (updated) => this._members.update((list) => list.map((m) => (m.id === id ? updated : m))),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao atualizar membro.'),
        }), finalize(() => this._loading.set(false)));
    }
    inactivateMember(id, reason) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.put(`${this.apiUrl}/${id}/inactivate`, { reason }).pipe(tap({
            next: (updated) => this._members.update((list) => list.map((m) => (m.id === id ? updated : m))),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao inativar membro.'),
        }), finalize(() => this._loading.set(false)));
    }
    deleteMember(id) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(tap({
            next: () => this._members.update((list) => list.filter((m) => m.id !== id)),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao remover membro.'),
        }), finalize(() => this._loading.set(false)));
    }
    clearError() {
        this._error.set(null);
    }
    static ɵfac = function MemberService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MemberService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MemberService, factory: MemberService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MemberService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=member.service.js.map