import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function sendConfirmationCode(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/totp/check-code', { confirmationCode }),
    {},
  );
}
