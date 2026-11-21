import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AuthService {
    http = inject(HttpClient);
    api = '/api/auth';
    loggedIn = signal(!!localStorage.getItem('accessToken'));
    currentRole = signal(localStorage.getItem('userRole'));
    currentUserEmail = signal(localStorage.getItem('userEmail'));
    isLoggedIn() {
        return this.loggedIn();
    }
    role() {
        return this.currentRole();
    }
    email() {
        return this.currentUserEmail();
    }
    login(email, password) {
        return this.http.post(`${this.api}/login`, { email, password }).pipe(tap((res) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            if (res.role) {
                localStorage.setItem('userRole', res.role);
                this.currentRole.set(res.role);
            }
            localStorage.setItem('userEmail', email);
            this.currentUserEmail.set(email);
            this.loggedIn.set(true);
        }));
    }
    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        this.currentRole.set(null);
        this.currentUserEmail.set(null);
        this.loggedIn.set(false);
    }
    token() {
        return localStorage.getItem('accessToken');
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map