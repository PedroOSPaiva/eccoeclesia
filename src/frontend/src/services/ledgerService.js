import apiClient from './apiClient.js';

const ledgerService = {
  async list(period) {
    const params = period?.start && period?.end ? { params: { start: period.start, end: period.end } } : undefined;
    const response = await apiClient.get('/api/ledger', params);
    return response.data.items ?? [];
  },

  async create(payload) {
    const response = await apiClient.post('/api/ledger', payload);
    return response.data.item;
  },

  async fetchReportText(period) {
    const params = period?.start && period?.end ? { params: { start: period.start, end: period.end } } : undefined;
    const response = await apiClient.get('/api/reports/ledger', params);
    return response.data.report;
  },

  async downloadPdf(period) {
    const params = period?.start && period?.end ? { params: { start: period.start, end: period.end }, responseType: 'blob' } : { responseType: 'blob' };
    const response = await apiClient.get('/api/reports/ledger.pdf', params);
    return response.data;
  },

  async downloadCsv(period) {
    const params = period?.start && period?.end ? { params: { start: period.start, end: period.end }, responseType: 'blob' } : { responseType: 'blob' };
    const response = await apiClient.get('/api/reports/ledger.csv', params);
    return response.data;
  }
};

export default ledgerService;
