import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function getBoards() {
  return await apiResponsesHandler(() => api.get('/boards'), {
    onSuccess: (data) => data.boards,
  });
}
