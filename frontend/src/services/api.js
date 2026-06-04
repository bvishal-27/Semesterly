import axios from 'axios';

// 🔥 Hardcoded for testing - we'll change later
const API_BASE_URL = 'https://semesterly-backend.onrender.com/api';

console.log('🚀 API Base URL being used:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Attach token to every request
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('sem_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sem_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;