import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function restoreUserVerify(confirmationCode, restoreKey) {
  const result = await apiResponsesHandler(() =>
    api.post('/auth/restore/verify', { confirmationCode, restoreKey }),
  );
  return result;
}
