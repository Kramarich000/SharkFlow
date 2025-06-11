import { useAuthStore } from '@store/authStore';
import axios from 'axios';
import { useActionData } from 'react-router-dom';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-api-gavu.onrender.com'
    : 'http://localhost:8080';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

let isRefresh = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefresh) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefresh = true;

      try {
        const response = await api.post('/refresh');
        const newToken = response.data.accessToken;

        useAuthStore.getState().setAccessToken(newToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (error) {
        useActionData.getState().clearAccessToken();
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        isRefresh = false;
      }
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    const isAuthRoute = ['/login', '/register', '/refresh', '/public'].some(
      (path) => config.url?.includes(path),
    );

    if (token && !isAuthRoute) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
