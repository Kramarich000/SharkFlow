import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function restoreUserConfirm(restoreKey) {
  const result = await apiResponsesHandler(() =>
    api.post('/auth/restore/confirm', { restoreKey }),
  );
  return result;
}
