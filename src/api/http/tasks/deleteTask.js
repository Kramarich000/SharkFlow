import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function deleteTask(uuid) {
  return await apiResponsesHandler(() => api.delete(`/api/tasks/${uuid}`));
}
