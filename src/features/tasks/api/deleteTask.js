import { api } from "@lib/http";
import { apiResponsesHandler } from "@utils/responsesHandler";

export async function deleteTask(boardUuid, taskUuid) {
  return await apiResponsesHandler(() =>
    api.delete(`/api/boards/${boardUuid}/tasks/${taskUuid}`),
  );
}
