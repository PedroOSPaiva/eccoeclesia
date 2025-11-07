import apiClient from './apiClient.js';

const TOKEN_STORAGE_KEY = 'ecoeclesia.auth.tokens';
const PROFILE_STORAGE_KEY = 'ecoeclesia.auth.profile';

const tokenSubscribers = new Set();
const profileSubscribers = new Set();

function notifyTokens(tokens) {
  tokenSubscribers.forEach((callback) => callback(tokens));
}

function notifyProfile(profile) {
  profileSubscribers.forEach((callback) => callback(profile));
}

function saveTokens(tokens) {
  if (tokens) {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
  notifyTokens(tokens);
}

function saveProfile(profile) {
  if (profile) {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }
  notifyProfile(profile);
}

const authService = {
  subscribe(callback) {
    tokenSubscribers.add(callback);
  },
  unsubscribe(callback) {
    tokenSubscribers.delete(callback);
  },
  subscribeToProfile(callback) {
    profileSubscribers.add(callback);
  },
  unsubscribeFromProfile(callback) {
    profileSubscribers.delete(callback);
  },
  loadTokens() {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse stored tokens', error);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }
  },
  loadProfile() {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn('Failed to parse stored profile', error);
      localStorage.removeItem(PROFILE_STORAGE_KEY);
      return null;
    }
  },
  async login(email, password) {
    const response = await apiClient.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken, tokenType, user } = response.data;
    const tokens = { accessToken, refreshToken, tokenType };
    saveTokens(tokens);
    saveProfile(user ?? null);
    return { tokens, profile: user ?? null };
  },
  logout() {
    saveTokens(null);
    saveProfile(null);
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
    if (response.data.user) {
      saveProfile(response.data.user);
    }
    return refreshed;
  },
  async fetchProfile() {
    const response = await apiClient.get('/api/users/me');
    const profile = response.data ?? null;
    saveProfile(profile);
    return profile;
  }
};

export default authService;
