import { Injectable, computed } from '@angular/core';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class ExpenseService extends BaseApiService {
    get apiUrl() {
        return '/api/expenses';
    }
    // Alias para manter compatibilidade com componentes existentes
    expenses = this.items;
    totalAmount = computed(() => this._items().reduce((sum, item) => sum + Number(item.amount || 0), 0));
    count = computed(() => this._items().length);
    loadExpenses() {
        return this.load();
    }
    createExpense(dto) {
        return this.create(dto);
    }
    deleteExpense(id) {
        return this.delete(id);
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵExpenseService_BaseFactory; return function ExpenseService_Factory(__ngFactoryType__) { return (ɵExpenseService_BaseFactory || (ɵExpenseService_BaseFactory = i0.ɵɵgetInheritedFactory(ExpenseService)))(__ngFactoryType__ || ExpenseService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ExpenseService, factory: ExpenseService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExpenseService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=expense.service.js.map