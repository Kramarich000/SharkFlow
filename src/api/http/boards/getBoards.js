import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function getBoards() {
  return await apiResponsesHandler(() => api.get('/api/todo/boards'), {
    onSuccess: (data) => data.boards,
  });
}
