import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleConnect(code) {
  return await apiResponsesHandler(
    () => api.post('/auth/google/connect', { code }),
    {},
  );
}
