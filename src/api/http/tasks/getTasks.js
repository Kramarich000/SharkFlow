import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function getTasks(boardUuid) {
  return await apiResponsesHandler(
    () => api.get(`/api/boards/${boardUuid}/tasks`),
    {
      onSuccess: (data) => data.tasks,
    },
  );
}
