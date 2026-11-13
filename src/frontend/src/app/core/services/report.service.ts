import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';

export interface ReportTextResponse {
  report: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly http = inject(HttpClient);
  private readonly baseApi = '/api/reports';

  // Signals para estado de emissão de relatórios
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _preview = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly preview = this._preview.asReadonly();

  /**
   * Obtém a prévia textual do relatório contábil do razão
   */
  fetchLedgerReportPreview(start?: string, end?: string): Observable<ReportTextResponse> {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    return this.http.get<ReportTextResponse>(`${this.baseApi}/ledger`, { params }).pipe(
      tap({
        next: (res) => this._preview.set(res.report),
        error: (err) => this._error.set(err?.error?.error || 'Erro ao gerar relatório contábil.'),
      }),
      finalize(() => this._loading.set(false))
    );
  }

  /**
   * Faz o download do Relatório Financeiro em formato PDF
   */
  downloadLedgerPdf(start?: string, end?: string): void {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    this.http.get(`${this.baseApi}/ledger.pdf`, {
      params,
      responseType: 'blob',
    }).pipe(
      finalize(() => this._loading.set(false))
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `razao-financeiro-${start || 'inicio'}-a-${end || 'hoje'}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        this._error.set(err?.error?.error || 'Falha no download do relatório em PDF.');
      },
    });
  }

  /**
   * Faz o download do Relatório Financeiro em formato CSV (planilhas)
   */
  downloadLedgerCsv(start?: string, end?: string): void {
    this._loading.set(true);
    this._error.set(null);

    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    this.http.get(`${this.baseApi}/ledger.csv`, {
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

  clearError(): void {
    this._error.set(null);
  }
}

