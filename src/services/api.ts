// src/services/api.ts
import axios from 'axios';
import { getAuthData } from './mutations/auth/storage';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const { access } = getAuthData();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      console.log('Attached token:', access); // Debug log
    } else {
      console.log('No token found in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
