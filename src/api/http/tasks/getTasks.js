import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function getBoards() {
  return await apiResponsesHandler(() => api.get('/api/boards/tasks'), {
    onSuccess: (data) => data.boards,
  });
}
