import apiClient from './apiClient.js';

const expenseService = {
  async list() {
    const response = await apiClient.get('/api/expenses');
    return response.data;
  },
  async create(expense) {
    const response = await apiClient.post('/api/expenses', expense);
    return response.data;
  },
  async update(id, expense) {
    const response = await apiClient.put(`/api/expenses/${id}`, expense);
    return response.data;
  },
  async remove(id) {
    await apiClient.delete(`/api/expenses/${id}`);
  }
};

export default expenseService;
