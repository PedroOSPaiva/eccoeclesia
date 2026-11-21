import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import * as i0 from "@angular/core";
export class ParishLeadershipService {
    http = inject(HttpClient);
    api = '/api/parish-leadership';
    leaders = signal([]);
    loading = signal(false);
    error = signal(null);
    loadLeaders(onlyActive = false) {
        this.loading.set(true);
        this.error.set(null);
        return this.http.get(`${this.api}?onlyActive=${onlyActive}`).pipe(tap({
            next: (res) => {
                this.leaders.set(res);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Não foi possível carregar os responsáveis paroquiais.');
                this.loading.set(false);
            },
        }));
    }
    saveLeader(leader) {
        this.loading.set(true);
        const req = leader.id
            ? this.http.put(`${this.api}/${leader.id}`, leader)
            : this.http.post(this.api, leader);
        return req.pipe(tap({
            next: () => {
                this.loading.set(false);
                this.loadLeaders().subscribe();
            },
            error: () => {
                this.error.set('Erro ao salvar responsável.');
                this.loading.set(false);
            },
        }));
    }
    deleteLeader(id) {
        this.loading.set(true);
        return this.http.delete(`${this.api}/${id}`).pipe(tap({
            next: () => {
                this.loading.set(false);
                this.loadLeaders().subscribe();
            },
            error: () => {
                this.error.set('Erro ao remover responsável.');
                this.loading.set(false);
            },
        }));
    }
    static ɵfac = function ParishLeadershipService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ParishLeadershipService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ParishLeadershipService, factory: ParishLeadershipService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ParishLeadershipService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=parish-leadership.service.js.map