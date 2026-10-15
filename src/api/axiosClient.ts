import axios from 'axios';

// BaseURL uses Vite local proxy to eliminate CORS issues
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/hovixi/api/v1';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'vi',
  },
  timeout: 15000,
});

// Request Interceptor: Attach UUID trace id & Bearer token
axiosClient.interceptors.request.use(
  (config) => {
    // Generate UUID for X-Request-Id as required by Vinhomes BE Guideline
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      config.headers['X-Request-Id'] = crypto.randomUUID();
    } else {
      config.headers['X-Request-Id'] = 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle standard response & 401 unauth
axiosClient.interceptors.response.use(
  (response) => {
    // Return standard response directly
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      const token = localStorage.getItem('access_token');
      // Only clear storage and trigger logout if this is a real expired token, not demo mode
      if (token && token !== 'demo_mock_jwt_token_12345') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('auth_user');
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
