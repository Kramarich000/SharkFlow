import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function deleteBoard(uuid) {
  return await apiResponsesHandler(() => api.delete(`/api/boards/${uuid}`), {});
}
