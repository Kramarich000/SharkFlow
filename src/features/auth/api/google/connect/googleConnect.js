import api from '@lib/http';
import { useUserStore } from '@features/user';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleConnect(code) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/google/connect', { code }),
    {},
  );
}
