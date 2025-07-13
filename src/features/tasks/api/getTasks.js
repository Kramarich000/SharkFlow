import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
export async function getTasks(boardUuid) {
  return await apiResponsesHandler(
    () => api.get(`/boards/${boardUuid}/tasks`),
    {
      onSuccess: (data) => data.tasks,
    },
  );
}
