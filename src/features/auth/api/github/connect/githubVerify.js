import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubVerify(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/auth/github/confirm-connect', { confirmationCode }),
    {},
  );
}
