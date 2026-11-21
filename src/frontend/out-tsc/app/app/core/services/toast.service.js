import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ToastService {
    _toasts = signal([]);
    toasts = this._toasts.asReadonly();
    show(message, type = 'info', durationMs = 4500) {
        const id = 'toast-' + Math.random().toString(36).substring(2, 9);
        const newToast = {
            id,
            message,
            type,
            createdAt: Date.now(),
        };
        // Evita duplicatas consecutivas idênticas num curto intervalo
        const current = this._toasts();
        if (current.length > 0 && current[current.length - 1].message === message) {
            return current[current.length - 1].id;
        }
        this._toasts.update((toasts) => [...toasts, newToast]);
        if (durationMs > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, durationMs);
        }
        return id;
    }
    error(message, durationMs = 5000) {
        return this.show(message, 'error', durationMs);
    }
    success(message, durationMs = 3500) {
        return this.show(message, 'success', durationMs);
    }
    info(message, durationMs = 4000) {
        return this.show(message, 'info', durationMs);
    }
    warning(message, durationMs = 4500) {
        return this.show(message, 'warning', durationMs);
    }
    dismiss(id) {
        this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
    }
    clear() {
        this._toasts.set([]);
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=toast.service.js.map