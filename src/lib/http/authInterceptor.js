import { api, refreshClient } from './apiClient';
import { useAuthStore } from '@features/auth';

let isRefreshing = false;
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

export function setupAuthInterceptor() {
  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    const isPublic = ['/login', '/register', '/refresh', '/public'].some(
      (path) => config.url?.includes(path),
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) =>
            failedQueue.push({ resolve, reject }),
          ).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        isRefreshing = true;
        try {
          const refreshResp = await refreshClient.post('/api/auth/refresh');

          const newToken = refreshResp?.data?.accessToken;

          if (refreshResp.status === 200 && newToken) {
            useAuthStore.getState().setAccessToken(newToken);
            api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            processQueue(null, newToken);
            return api(originalRequest);
          } else {
            useAuthStore.getState().clearAccessToken();
            processQueue(error, null);
            return Promise.reject(error);
          }
        } catch (e) {
          useAuthStore.getState().clearAccessToken();
          processQueue(e, null);
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
} 