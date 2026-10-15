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

// Queue for requests awaiting token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Handle standard response & Silent Auto-Refresh Token on 401
axiosClient.interceptors.response.use(
  (response) => {
    // Return standard response data directly
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Do not attempt refresh on auth endpoints to avoid infinite loop
    const isAuthRequest =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/refresh-token');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_user');
        window.dispatchEvent(new Event('auth:unauthorized'));
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newAccessToken) => {
            if (originalRequest.headers) {
              if (typeof (originalRequest.headers as any).set === 'function') {
                (originalRequest.headers as any).set('Authorization', `Bearer ${newAccessToken}`);
              } else {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              }
            }
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call POST /auth/refresh-token using raw axios to bypass interceptor
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': 'vi',
              'X-Request-Id': 'rf-' + Date.now(),
            },
          }
        );

        const tokenData = refreshResponse.data?.data || refreshResponse.data;
        const newAccessToken = tokenData?.accessToken;
        const newRefreshToken = tokenData?.refreshToken;

        if (newAccessToken) {
          localStorage.setItem('access_token', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refresh_token', newRefreshToken);
          }

          axiosClient.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          if (originalRequest.headers) {
            if (typeof (originalRequest.headers as any).set === 'function') {
              (originalRequest.headers as any).set('Authorization', `Bearer ${newAccessToken}`);
            } else {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
          }

          processQueue(null, newAccessToken);
          return axiosClient(originalRequest);
        } else {
          throw new Error('Refresh token response missing accessToken');
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('auth_user');
        window.dispatchEvent(new Event('auth:unauthorized'));
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
