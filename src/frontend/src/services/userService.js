import apiClient from './apiClient.js';

const userService = {
  async list() {
    const response = await apiClient.get('/api/users');
    return response.data;
  },
  async create(user) {
    const response = await apiClient.post('/api/users', user);
    return response.data;
  },
  async updateRoles(id, roles) {
    const response = await apiClient.put(`/api/users/${id}/roles`, { roles });
    return response.data;
  },
  async updatePassword(id, password) {
    const response = await apiClient.put(`/api/users/${id}/password`, { password });
    return response.data;
  }
};

export default userService;
