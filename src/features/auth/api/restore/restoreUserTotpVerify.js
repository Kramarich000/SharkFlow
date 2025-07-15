import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function restoreUserTotpVerify(totpCode, restoreKey) {
  const result = await apiResponsesHandler(() =>
    api.post('/auth/restore/verify/totp', { totpCode, restoreKey }),
  );
  return result;
}
