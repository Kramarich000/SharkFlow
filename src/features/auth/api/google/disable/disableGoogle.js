import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function disableGoogle(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/google/disable', { confirmationCode }),
    {},
  );
}
