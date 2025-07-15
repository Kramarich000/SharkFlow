import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function restoreSendEmail(email) {
  const result = await apiResponsesHandler(() =>
    api.post('/auth/restore/send', { email }),
  );
  return result;
}
