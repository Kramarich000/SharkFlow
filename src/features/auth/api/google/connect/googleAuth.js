import api from '@lib/http';
import { useUserStore } from '@features/user';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleAuth(code) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/google', { code }),
    {},
  );
}
