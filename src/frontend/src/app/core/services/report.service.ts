import { Injectable, signal } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface ReportTextResponse {
  report: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService extends BaseApiService<{ id?: string }> {
  protected override get apiUrl(): string {
    return '/api/reports';
  }

  // ASSUNÇÃO: ReportService opera sobre relatórios sob demanda em vez de CRUD de entidades
  private readonly _preview = signal<string | null>(null);
  readonly preview = this._preview.asReadonly();

  fetchLedgerReportPreview(start?: string, end?: string, communityId?: string | null): Observable<ReportTextResponse> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    if (communityId && communityId !== 'ALL') params = params.set('communityId', communityId);

    return this.http.get<ReportTextResponse>(`${this.apiUrl}/ledger`, { params }).pipe(
      tap({
        next: (res) => this._preview.set(res.report),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao gerar relatório contábil.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  downloadLedgerPdf(start?: string, end?: string, communityId?: string | null): void {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    if (communityId && communityId !== 'ALL') params = params.set('communityId', communityId);

    this.http.get(`${this.apiUrl}/ledger.pdf`, {
      params,
      responseType: 'blob',
    }).pipe(
      finalize(() => this._loading.set(false))
    ).subscribe({
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

  downloadLedgerCsv(start?: string, end?: string, communityId?: string | null): void {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    if (communityId && communityId !== 'ALL') params = params.set('communityId', communityId);

    this.http.get(`${this.apiUrl}/ledger.csv`, {
      params,
      responseType: 'blob',
    }).pipe(
      finalize(() => this._loading.set(false))
    ).subscribe({
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
}
