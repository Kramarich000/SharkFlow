import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function disableYandex(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/auth/oauth/yandex/disable', { confirmationCode }),
    {},
  );
}