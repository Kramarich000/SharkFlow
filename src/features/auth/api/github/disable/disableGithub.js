import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function disableGithub(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/auth/oauth/github/disable', { confirmationCode }),
    {},
  );
}
