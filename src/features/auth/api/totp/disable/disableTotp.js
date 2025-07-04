import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function disableTotp(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/totp/disable', { confirmationCode }),
    {},
  );
}
