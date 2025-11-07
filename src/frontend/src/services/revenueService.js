import apiClient from './apiClient.js';

const revenueService = {
  async list(params = {}) {
    const response = await apiClient.get('/api/revenues', { params });
    return response.data;
  },
  async create(revenue) {
    const response = await apiClient.post('/api/revenues', revenue);
    return response.data;
  },
  async update(id, revenue) {
    const response = await apiClient.put(`/api/revenues/${id}`, revenue);
    return response.data;
  },
  async remove(id) {
    await apiClient.delete(`/api/revenues/${id}`);
  }
};

export default revenueService;
