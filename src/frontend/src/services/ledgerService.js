import apiClient from './apiClient.js';

const ledgerService = {
  async list() {
    const response = await apiClient.get('/api/ledger');
    return response.data.items ?? [];
  },

  async create(payload) {
    const response = await apiClient.post('/api/ledger', payload);
    return response.data.item;
  },

  async fetchReportText() {
    const response = await apiClient.get('/api/reports/ledger');
    return response.data.report;
  },

  async downloadPdf() {
    const response = await apiClient.get('/api/reports/ledger.pdf', { responseType: 'blob' });
    return response.data;
  },

  async downloadCsv() {
    const response = await apiClient.get('/api/reports/ledger.csv', { responseType: 'blob' });
    return response.data;
  }
};

export default ledgerService;
