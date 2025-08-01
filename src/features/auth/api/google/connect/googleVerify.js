import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleVerify(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/auth/oauth/google/confirm-connect', { confirmationCode }),
    {},
  );
}
