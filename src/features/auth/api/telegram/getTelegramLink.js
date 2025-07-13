import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
export async function getTelegramLink() {
  return await apiResponsesHandler(() => api.get('/telegram/link'), {
    onSuccess: (data) => {
      return data || null;
    },
  });
}
