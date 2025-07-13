import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function checkTwoFactor(totpCode, sessionKey) {
  return await apiResponsesHandler(() =>
    api.post('/auth/totp/verify', { totpCode, sessionKey }),
  );
}
