export function setupLoggerInterceptor(api) {
  api.interceptors.request.use(
    (config) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          'REQUEST:',
          config.method?.toUpperCase(),
          config.url,
          config,
        );
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
    (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          '%cRESPONSE ERROR:',
          'color: red; font-weight: bold;',
          error?.response?.status,
          error?.config?.url,
          error,
        );
      }
      return Promise.reject(error);
    },
  );
}
