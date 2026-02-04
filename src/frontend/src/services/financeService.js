import apiClient from './apiClient.js';

function buildQuery(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;
    query.append(key, value);
  });
  return query.toString();
}

const financeService = {
  async importStatement(formData) {
    const response = await apiClient.post('/api/finance/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async listPayables(filters = {}) {
    const query = buildQuery(filters);
    const response = await apiClient.get(`/api/payables${query ? `?${query}` : ''}`);
    return response.data?.items ?? [];
  },

  async createPayable(payload) {
    const response = await apiClient.post('/api/payables', payload);
    return response.data;
  },

  async updatePayableStatus(id, status) {
    const response = await apiClient.put(`/api/payables/${id}/status`, { status });
    return response.data;
  },

  async listReceivables(filters = {}) {
    const query = buildQuery(filters);
    const response = await apiClient.get(`/api/receivables${query ? `?${query}` : ''}`);
    return response.data?.items ?? [];
  },

  async createReceivable(payload) {
    const response = await apiClient.post('/api/receivables', payload);
    return response.data;
  },

  async updateReceivableStatus(id, status) {
    const response = await apiClient.put(`/api/receivables/${id}/status`, { status });
    return response.data;
  },

  async getCashflow(filters = {}) {
    const query = buildQuery(filters);
    const response = await apiClient.get(`/api/cashflow${query ? `?${query}` : ''}`);
    return response.data;
  }
};

export default financeService;
