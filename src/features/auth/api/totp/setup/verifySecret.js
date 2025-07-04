import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function verifySecret(totpCode) {
  return await apiResponsesHandler(
    () => api.post('/api/auth/totp/setup', { totpCode }),
    {},
  );
}
