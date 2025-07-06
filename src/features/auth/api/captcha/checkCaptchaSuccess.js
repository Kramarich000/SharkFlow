import api from '@lib/http';
import { useUserStore } from '@features/user';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function verifyCaptcha(token) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/verify-captcha', { token }),
    {},
  );
}
