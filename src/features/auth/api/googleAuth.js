import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleAuth(idToken) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/google', { idToken }),
    {},
  );
}
