// import { useAuthStore } from '@store/authStore';
// import { showToast } from '@utils/toast/toast';
// import axios from 'axios';
// import { useActionData } from 'react-router-dom';

// export const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://taskflow-api-gavu.onrender.com'
//     : 'http://localhost:8080';

// const api = axios.create({
//   baseURL,
//   withCredentials: true,
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

// api.interceptors.response.use(
//   (response) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.log('RESPONSE:', response.config.url, response);
//     }
//     return response;
//   },
//   async (error) => {
//     if (process.env.NODE_ENV === 'development') {
//       console.error('API ERROR:', error);
//     }
//     const originalRequest = error.config;
//     if (!error.response) {
//       showToast(
//         'Сервер не отвечает. Проверьте подключение к интернету',
//         'info',
//       );
//       return Promise.reject({
//         message: 'Сервер недоступен. Проверьте интернет.',
//       });
//     }

//     if (
//       (error.response?.status === 401 || error.response?.status === 403) &&
//       !originalRequest._retry
//     ) {
//       if (isRefresh) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return api(originalRequest);
//         });
//       }

//       originalRequest._retry = true;
//       isRefresh = true;

//       try {
//         const response = await api.post('/refresh');
//         const newToken = response.data.accessToken;

//         useAuthStore.getState().setAccessToken(newToken);

//         api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

//         processQueue(null, newToken);

//         return api(originalRequest);
//       } catch (error) {
//         useActionData.getState().clearAccessToken();
//         showToast('Сессия истекла. Пожалуйста, войдите снова', 'info');
//         processQueue(error, null);
//         return Promise.reject(error);
//       } finally {
//         isRefresh = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

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

// export default api;

import { useAuthStore } from '@store/authStore';
import { showToast } from '@utils/toast/toast';
import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://taskflow-api-gavu.onrender.com'
    : 'http://localhost:8080';
const api = axios.create({ baseURL, withCredentials: true });

const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
  validateStatus: () => true,
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

api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('REQUEST:', config.method?.toUpperCase(), config.url, config);
    }
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

api.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '%cRESPONSE:',
        'color: green; font-weight: bold;',
        res.status,
        res.config.url,
        res,
      );
    }
    return res;
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        '%cRESPONSE ERROR:',
        'color: red; font-weight: bold;',
        error?.response?.status,
        error?.config?.url,
        error,
      );
    }
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (isRefresh) {
        return new Promise((resolve, reject) =>
          failedQueue.push({ resolve, reject }),
        ).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }
      isRefresh = true;
      try {
        const refreshResp = await refreshClient.post('/refresh');
        if (
          refreshResp &&
          refreshResp.status === 200 &&
          refreshResp.data &&
          refreshResp.data.accessToken
        ) {
          const newToken = refreshResp.data.accessToken;
          useAuthStore.getState().setAccessToken(newToken);
          api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return api(originalRequest);
        } else {
          useAuthStore.getState().clearAccessToken();
          showToast('Сессия истекла. Пожалуйста, войдите снова', 'info');
          processQueue(error, null);
          return Promise.reject(error);
        }
      } catch (e) {
        useAuthStore.getState().clearAccessToken();
        showToast('Сессия истекла. Пожалуйста, войдите снова', 'info');
        processQueue(e, null);
        return Promise.reject(e);
      } finally {
        isRefresh = false;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
