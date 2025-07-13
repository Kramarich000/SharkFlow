import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
export async function disableTelegram() {
  return await apiResponsesHandler(() => api.delete('/telegram/unlink'), {});
}
