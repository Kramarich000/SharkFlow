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
    const { accessToken, csrfToken } = useAuthStore.getState();

    const isPublic = ['/login', '/register', '/refresh', '/public'].some(
      (path) => config.url?.includes(path),
    );

    if (accessToken && !isPublic) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      }
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
            const { csrfToken } = useAuthStore.getState();
            if (csrfToken) {
              originalRequest.headers['X-CSRF-Token'] = csrfToken;
            }
            return api(originalRequest);
          });
        }

        isRefreshing = true;
        try {
          const refreshResp = await refreshClient.post('/api/auth/refresh');

          const newAccessToken = refreshResp?.data?.accessToken;
          const newCsrfToken = refreshResp?.data?.csrfToken;

          if (refreshResp.status === 200 && newAccessToken) {
            const authStore = useAuthStore.getState();
            authStore.setAccessToken(newAccessToken);
            if (newCsrfToken) {
              authStore.setCsrfToken(newCsrfToken);
            }
            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            if (newCsrfToken) {
              originalRequest.headers['X-CSRF-Token'] = newCsrfToken;
            }
            processQueue(null, newAccessToken);
            return api(originalRequest);
          } else {
            useAuthStore.getState().clearAccessToken();
            useAuthStore.getState().clearCsrfToken();
            processQueue(error, null);
            return Promise.reject(error);
          }
        } catch (e) {
          useAuthStore.getState().clearAccessToken();
          useAuthStore.getState().clearCsrfToken();
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
