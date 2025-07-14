import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function yandexVerify(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/auth/oauth/yandex/confirm-connect', { confirmationCode }),
    {},
  );
}
