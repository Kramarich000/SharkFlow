import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function sendDisableTotpEmail() {
  return await apiResponsesHandler(
    () => api.post('/auth/totp/confirm-disable', {}, {}),
    {},
  );
}
