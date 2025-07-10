import api from '@lib/http';
import { useUserStore } from '@features/user';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubAuth(code, state) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/github', { code, state }),
    {},
  );
}
