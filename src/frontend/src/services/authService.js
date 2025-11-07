import apiClient from './apiClient.js';

const STORAGE_KEY = 'ecoeclesia.auth.tokens';
const subscribers = new Set();

function notify(tokens) {
  subscribers.forEach((callback) => callback(tokens));
}

function saveTokens(tokens) {
  if (tokens) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  notify(tokens);
}

const authService = {
  subscribe(callback) {
    subscribers.add(callback);
  },
  unsubscribe(callback) {
    subscribers.delete(callback);
  },
  loadTokens() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse stored tokens', error);
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  },
  async login(email, password) {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken, tokenType } = response.data;
    const tokens = { accessToken, refreshToken, tokenType };
    saveTokens(tokens);
    return tokens;
  },
  logout() {
    saveTokens(null);
  },
  async refreshToken() {
    const tokens = authService.loadTokens();
    if (!tokens?.refreshToken) {
      throw new Error('Refresh token ausente');
    }
    const response = await apiClient.post('/api/auth/refresh', {
      refreshToken: tokens.refreshToken
    });
    const refreshed = {
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      tokenType: response.data.tokenType
    };
    saveTokens(refreshed);
    return refreshed;
  }
};

export default authService;
