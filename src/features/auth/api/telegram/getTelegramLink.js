import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
export async function getTelegramLink() {
  return await apiResponsesHandler(() => api.get('/api/telegram/link'), {
    onSuccess: (data) => {
      return data || null;
    },
  });
}
