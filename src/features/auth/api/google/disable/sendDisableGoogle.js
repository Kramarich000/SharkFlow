import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function sendDisableGoogleEmail() {
  return await apiResponsesHandler(
    () => api.post('/api/auth/google/confirm-disable', {}, {}),
    {},
  );
}
