import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import * as i0 from "@angular/core";
export class BirthdayService {
    http = inject(HttpClient);
    apiUrl = '/api/birthdays';
    _birthdays = signal([]);
    _loading = signal(false);
    _error = signal(null);
    birthdays = this._birthdays.asReadonly();
    loading = this._loading.asReadonly();
    error = this._error.asReadonly();
    totalCount = computed(() => this._birthdays().length);
    thisMonthBirthdays = computed(() => this._birthdays().filter((b) => b.daysUntilBirthday <= 30));
    todayBirthdays = computed(() => this._birthdays().filter((b) => b.daysUntilBirthday === 0));
    loadBirthdays(communityId) {
        this._loading.set(true);
        this._error.set(null);
        let params = new HttpParams();
        if (communityId && communityId !== 'ALL') {
            params = params.set('communityId', communityId);
        }
        return this.http.get(this.apiUrl, { params }).pipe(tap({
            next: (data) => this._birthdays.set(data ?? []),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao carregar aniversariantes.'),
        }), finalize(() => this._loading.set(false)));
    }
    createBirthday(dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.post(this.apiUrl, dto).pipe(tap({
            next: (created) => this._birthdays.update((list) => [created, ...list]),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar aniversariante.'),
        }), finalize(() => this._loading.set(false)));
    }
    clearError() {
        this._error.set(null);
    }
    static ɵfac = function BirthdayService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BirthdayService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BirthdayService, factory: BirthdayService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BirthdayService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=birthday.service.js.map