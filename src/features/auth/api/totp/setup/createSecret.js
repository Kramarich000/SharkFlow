import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function generateSecret(confirmationCode) {
  return await apiResponsesHandler(() =>
    api.post('/auth/totp', { confirmationCode }),
  );
}
