// import { useAuthStore } from 'features/auth/store/authStore';
// import { showToast } from '@utils/toast/showToast';
// import axios from 'axios';

// export const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://taskflow-api-gavu.onrender.com'
//     : 'http://localhost:8080';
// export const api = axios.create({ baseURL, withCredentials: true });

// const refreshClient = axios.create({
//   baseURL,
//   withCredentials: true,
//   validateStatus: () => true,
// });

// let isRefresh = false;
// let failedQueue = [];
// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// api.interceptors.request.use(
//   (config) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.log('REQUEST:', config.method?.toUpperCase(), config.url, config);
//     }
//     const token = useAuthStore.getState().accessToken;

//     const isAuthRoute = ['/login', '/register', '/refresh', '/public'].some(
//       (path) => config.url?.includes(path),
//     );

//     if (token && !isAuthRoute) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// api.interceptors.response.use(
//   (res) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.log(
//         '%cRESPONSE:',
//         'color: green; font-weight: bold;',
//         res.status,
//         res.config.url,
//         res,
//       );
//     }
//     return res;
//   },
//   async (error) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.error(
//         '%cRESPONSE ERROR:',
//         'color: red; font-weight: bold;',
//         error?.response?.status,
//         error?.config?.url,
//         error,
//       );
//     }
//     const originalRequest = error.config;
//     if (
//       (error.response?.status === 401 || error.response?.status === 403) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       if (isRefresh) {
//         return new Promise((resolve, reject) =>
//           failedQueue.push({ resolve, reject }),
//         ).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         });
//       }
//       isRefresh = true;
//       try {
//         const refreshResp = await refreshClient.post('/api/auth/refresh');
//         if (
//           refreshResp &&
//           refreshResp.status === 200 &&
//           refreshResp.data &&
//           refreshResp.data.accessToken
//         ) {
//           const newToken = refreshResp.data.accessToken;
//           useAuthStore.getState().setAccessToken(newToken);
//           api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           processQueue(null, newToken);
//           return api(originalRequest);
//         } else {
//           useAuthStore.getState().clearAccessToken();
//           processQueue(error, null);
//           return Promise.reject(error);
//         }
//       } catch (e) {
//         useAuthStore.getState().clearAccessToken();
//         processQueue(e, null);
//         return Promise.reject(e);
//       } finally {
//         isRefresh = false;
//       }
//     }
//     return Promise.reject(error);
//   },
// );

import { api } from './apiClient';
import { setupLoggerInterceptor } from './loggerInterceptor';
import { setupAuthInterceptor } from './authInterceptor';

setupLoggerInterceptor(api);
setupAuthInterceptor();

export default api;
