import { api } from './apiClient';
import { setupLoggerInterceptor } from './loggerInterceptor';
import { setupAuthInterceptor } from './authInterceptor';

setupLoggerInterceptor(api);
setupAuthInterceptor();

export default api;
