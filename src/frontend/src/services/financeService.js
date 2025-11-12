import apiClient from './apiClient.js';

const financeService = {
  async importStatement(formData) {
    const response = await apiClient.post('/api/finance/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default financeService;
