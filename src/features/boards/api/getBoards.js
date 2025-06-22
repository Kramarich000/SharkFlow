import api from 'lib/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function getBoards() {
  return await apiResponsesHandler(() => api.get('/api/boards'), {
    onSuccess: (data) => data.boards,
  });
}
