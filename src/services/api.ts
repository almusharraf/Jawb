// src/services/api.ts
import axios from 'axios';
import { getAuthData, saveAuthData, clearAuthData } from './mutations/auth/storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const { access } = getAuthData();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      console.log('Attached token:', access);
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Check if the error status is 401 and that we haven't retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refresh } = getAuthData();
      if (refresh) {
        try {
          // Attempt to refresh the access token
          const response = await api.post('accounts/token/refresh/', { refresh });
          const newAccess = response.data.access;
          // Save new access token
          const currentAuth = getAuthData();
          saveAuthData({
            access: newAccess,
            refresh: currentAuth.refresh || '',
            first_name: currentAuth.first_name || '',
            email: currentAuth.email || '',
          });
          // Update original request's Authorization header and retry it
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // If refresh fails, clear auth data and redirect to login
          clearAuthData();
          window.location.href = '/auth';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
