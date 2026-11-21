import { Injectable, computed, signal } from '@angular/core';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class LedgerService extends BaseApiService {
    get apiUrl() {
        return '/api/ledger';
    }
    // Alias para manter compatibilidade com componentes existentes
    entries = this.items;
    _filterType = signal('ALL');
    _dateRange = signal({});
    filterType = this._filterType.asReadonly();
    dateRange = this._dateRange.asReadonly();
    totalIncome = computed(() => this._items()
        .filter((entry) => entry.type === 'INCOME')
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0));
    totalExpense = computed(() => this._items()
        .filter((entry) => entry.type === 'EXPENSE')
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0));
    netBalance = computed(() => this.totalIncome() - this.totalExpense());
    totalCount = computed(() => this._items().length);
    filteredEntries = computed(() => {
        const selected = this._filterType();
        const list = this._items();
        if (selected === 'ALL') {
            return list;
        }
        return list.filter((item) => item.type === selected);
    });
    recentEntries = computed(() => {
        return [...this.filteredEntries()]
            .sort((a, b) => new Date(b.occurredOn).getTime() - new Date(a.occurredOn).getTime())
            .slice(0, 8);
    });
    summary = computed(() => ({
        totalIncome: this.totalIncome(),
        totalExpense: this.totalExpense(),
        netBalance: this.netBalance(),
        entryCount: this.totalCount(),
    }));
    loadEntries(start, end) {
        this._dateRange.set({ start, end });
        const params = {};
        if (start)
            params['start'] = start;
        if (end)
            params['end'] = end;
        return this.load(params);
    }
    createEntry(dto) {
        return this.create(dto);
    }
    setFilterType(type) {
        this._filterType.set(type);
    }
    refresh() {
        const range = this._dateRange();
        this.loadEntries(range.start, range.end).subscribe();
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵLedgerService_BaseFactory; return function LedgerService_Factory(__ngFactoryType__) { return (ɵLedgerService_BaseFactory || (ɵLedgerService_BaseFactory = i0.ɵɵgetInheritedFactory(LedgerService)))(__ngFactoryType__ || LedgerService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LedgerService, factory: LedgerService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LedgerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=ledger.service.js.map