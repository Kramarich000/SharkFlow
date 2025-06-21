import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function deleteTask(boardUuid, taskUuid) {
  return await apiResponsesHandler(() =>
    api.delete(`/api/boards/${boardUuid}/tasks/${taskUuid}`),
  );
}
