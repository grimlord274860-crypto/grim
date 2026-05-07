import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Admin axios — attaches admin token
export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('admin_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Customer axios — attaches customer token (separate so they don't clash)
export const customerApi = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});
customerApi.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('customer_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Public axios (no auth header) — for content & search
export const publicApi = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const apiAuth = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const apiCustomer = {
  register: (name, email, password) => customerApi.post('/customer/register', { name, email, password }),
  login: (email, password) => customerApi.post('/customer/login', { email, password }),
  me: () => customerApi.get('/customer/me'),
};

export const apiContent = {
  getPublished: () => publicApi.get('/content/published'),
  getDraft: () => api.get('/content/draft'),
  saveDraft: (content) => api.put('/content/draft', { content }),
  publish: () => api.post('/content/publish'),
  resetDraft: () => api.post('/content/reset-draft'),
  resetAll: () => api.post('/content/reset-all'),
};

export const apiSearch = (q) => publicApi.get('/search', { params: { q } });
