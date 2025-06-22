import api from 'lib/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function deleteBoard(uuid) {
  return await apiResponsesHandler(() => api.delete(`/api/boards/${uuid}`), {});
}
