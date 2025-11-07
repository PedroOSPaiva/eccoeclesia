import apiClient from './apiClient.js';

const inventoryService = {
  async listItems() {
    const response = await apiClient.get('/inventory');
    return response.data;
  },
  async listAlerts() {
    const response = await apiClient.get('/inventory/alerts');
    return response.data;
  },
  async createConsumable(item) {
    const response = await apiClient.post('/inventory/consumables', item);
    return response.data;
  },
  async createDurable(item) {
    const response = await apiClient.post('/inventory/durables', item);
    return response.data;
  },
  async recordEntry(id, type, quantity) {
    const response = await apiClient.post(`/inventory/${type}/${id}/entries`, { quantity });
    return response.data;
  },
  async recordExit(id, type, quantity) {
    const response = await apiClient.post(`/inventory/${type}/${id}/exits`, { quantity });
    return response.data;
  }
};

export default inventoryService;
