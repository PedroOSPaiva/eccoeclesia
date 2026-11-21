import { Injectable, computed } from '@angular/core';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class RevenueService extends BaseApiService {
    get apiUrl() {
        return '/api/revenues';
    }
    // Alias para manter compatibilidade com componentes existentes
    revenues = this.items;
    totalAmount = computed(() => this._items().reduce((sum, item) => sum + Number(item.amount || 0), 0));
    count = computed(() => this._items().length);
    loadRevenues(start, end) {
        const params = {};
        if (start)
            params['start'] = start;
        if (end)
            params['end'] = end;
        return this.load(params);
    }
    createRevenue(dto) {
        return this.create(dto);
    }
    deleteRevenue(id) {
        return this.delete(id);
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵRevenueService_BaseFactory; return function RevenueService_Factory(__ngFactoryType__) { return (ɵRevenueService_BaseFactory || (ɵRevenueService_BaseFactory = i0.ɵɵgetInheritedFactory(RevenueService)))(__ngFactoryType__ || RevenueService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RevenueService, factory: RevenueService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RevenueService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=revenue.service.js.map