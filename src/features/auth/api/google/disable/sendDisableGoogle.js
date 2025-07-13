import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function sendDisableGoogleEmail() {
  return await apiResponsesHandler(
    () => api.post('/auth/google/confirm-disable', {}, {}),
    {},
  );
}
