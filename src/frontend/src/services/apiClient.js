import axios from 'axios';
import authService from './authService.js';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const tokens = authService.loadTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `${tokens.tokenType ?? 'Bearer'} ${tokens.accessToken}`;
  }
  return config;
});

let refreshing = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        refreshing = refreshing ?? authService.refreshToken();
        await refreshing;
        refreshing = null;
        return apiClient(originalRequest);
      } catch (refreshError) {
        refreshing = null;
        authService.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
