import { Injectable, signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';
import * as i0 from "@angular/core";
export class ReportService extends BaseApiService {
    get apiUrl() {
        return '/api/reports';
    }
    // ASSUNÇÃO: ReportService opera sobre relatórios sob demanda em vez de CRUD de entidades
    _preview = signal(null);
    preview = this._preview.asReadonly();
    fetchLedgerReportPreview(start, end, communityId) {
        this._loading.set(true);
        this._error.set(null);
        let params = new HttpParams();
        if (start)
            params = params.set('start', start);
        if (end)
            params = params.set('end', end);
        if (communityId && communityId !== 'ALL')
            params = params.set('communityId', communityId);
        return this.http.get(`${this.apiUrl}/ledger`, { params }).pipe(tap({
            next: (res) => this._preview.set(res.report),
            error: (err) => this._error.set(err?.error?.error || 'Erro ao gerar relatório contábil.'),
        }), finalize(() => this._loading.set(false)));
    }
    downloadLedgerPdf(start, end, communityId) {
        this._loading.set(true);
        this._error.set(null);
        let params = new HttpParams();
        if (start)
            params = params.set('start', start);
        if (end)
            params = params.set('end', end);
        if (communityId && communityId !== 'ALL')
            params = params.set('communityId', communityId);
        this.http.get(`${this.apiUrl}/ledger.pdf`, {
            params,
            responseType: 'blob',
        }).pipe(finalize(() => this._loading.set(false))).subscribe({
            next: (blob) => {
                const fileBlob = new Blob([blob], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(fileBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `relatorio-${start || 'inicio'}-a-${end || 'hoje'}.pdf`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                this._error.set(err?.error?.error || 'Falha no download do relatório em PDF.');
            },
        });
    }
    downloadLedgerCsv(start, end, communityId) {
        this._loading.set(true);
        this._error.set(null);
        let params = new HttpParams();
        if (start)
            params = params.set('start', start);
        if (end)
            params = params.set('end', end);
        if (communityId && communityId !== 'ALL')
            params = params.set('communityId', communityId);
        this.http.get(`${this.apiUrl}/ledger.csv`, {
            params,
            responseType: 'blob',
        }).pipe(finalize(() => this._loading.set(false))).subscribe({
            next: (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `razao-financeiro-${start || 'inicio'}-a-${end || 'hoje'}.csv`;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                this._error.set(err?.error?.error || 'Falha no download do arquivo CSV.');
            },
        });
    }
    static ɵfac = /*@__PURE__*/ (() => { let ɵReportService_BaseFactory; return function ReportService_Factory(__ngFactoryType__) { return (ɵReportService_BaseFactory || (ɵReportService_BaseFactory = i0.ɵɵgetInheritedFactory(ReportService)))(__ngFactoryType__ || ReportService); }; })();
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReportService, factory: ReportService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=report.service.js.map