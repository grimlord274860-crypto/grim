import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token if present
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('admin_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const apiAuth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const apiContent = {
  getPublished: () => api.get('/content/published'),
  getDraft: () => api.get('/content/draft'),
  saveDraft: (content) => api.put('/content/draft', { content }),
  publish: () => api.post('/content/publish'),
  resetDraft: () => api.post('/content/reset-draft'),
  resetAll: () => api.post('/content/reset-all'),
};

export const apiSearch = (q) => api.get('/search', { params: { q } });
