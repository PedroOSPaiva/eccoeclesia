import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import * as i0 from "@angular/core";
const STORAGE_KEY = 'ecoecclesia_active_community_id';
export class CommunityService {
    http = inject(HttpClient);
    apiUrl = '/api/communities';
    // --- Sinais Privados ---
    _communities = signal([]);
    _activeCommunityId = signal(localStorage.getItem(STORAGE_KEY) || 'ALL');
    _loading = signal(false);
    _error = signal(null);
    _noticeMessage = signal(null);
    // --- Sinais Públicos (Read-only) ---
    communities = this._communities.asReadonly();
    activeCommunityId = this._activeCommunityId.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    noticeMessage = this._noticeMessage.asReadonly();
    // --- Sinais Computados ---
    activeCommunity = computed(() => {
        const id = this._activeCommunityId();
        if (!id || id === 'ALL') {
            return null;
        }
        return this._communities().find((c) => c.id === id) ?? null;
    });
    isAll = computed(() => {
        const id = this._activeCommunityId();
        return !id || id === 'ALL';
    });
    /**
     * Carrega a lista de comunidades cadastradas na paróquia.
     */
    loadCommunities() {
        this._loading.set(true);
        this._error.set(null);
        return this.http.get(this.apiUrl).pipe(tap({
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
        }), finalize(() => this._loading.set(false)));
    }
    /**
     * Define a comunidade ativa para escopo financeiro e de membros.
     * Persiste no localStorage e emite feedback para o usuário.
     */
    setActiveCommunity(id) {
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
    clearNotice() {
        this._noticeMessage.set(null);
    }
    static ɵfac = function CommunityService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommunityService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CommunityService, factory: CommunityService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommunityService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=community.service.js.map