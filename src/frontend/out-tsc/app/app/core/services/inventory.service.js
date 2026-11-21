import { Injectable, computed, signal } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class InventoryService extends BaseApiService {
    get apiUrl() {
        return '/inventory';
    }
    // Alias para manter compatibilidade com componentes existentes
    _alerts = signal([]);
    alerts = this._alerts.asReadonly();
    totalItems = computed(() => this._items().reduce((sum, item) => sum + item.quantity, 0));
    lowStockCount = computed(() => this._items().filter((i) => i.quantity <= i.minimumQuantity).length);
    loadItems() {
        return this.load();
    }
    loadAlerts() {
        return this.http.get(`${this.apiUrl}/alerts`).pipe(tap({
            next: (data) => this._alerts.set(data ?? []),
        }));
    }
    createConsumable(dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.post(`${this.apiUrl}/consumables`, dto).pipe(tap({
            next: () => this.loadItems().subscribe(),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar item consumível.'),
        }), finalize(() => this._loading.set(false)));
    }
    createDurable(dto) {
        this._loading.set(true);
        this._error.set(null);
        return this.http.post(`${this.apiUrl}/durables`, dto).pipe(tap({
            next: () => this.loadItems().subscribe(),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao cadastrar bem durável.'),
        }), finalize(() => this._loading.set(false)));
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵInventoryService_BaseFactory; return function InventoryService_Factory(__ngFactoryType__) { return (ɵInventoryService_BaseFactory || (ɵInventoryService_BaseFactory = i0.ɵɵgetInheritedFactory(InventoryService)))(__ngFactoryType__ || InventoryService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: InventoryService, factory: InventoryService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InventoryService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=inventory.service.js.map