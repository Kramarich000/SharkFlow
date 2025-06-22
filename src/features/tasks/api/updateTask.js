import api from 'lib/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';

export async function updateTask(boardUuid, taskUuid, updatedFields = {}) {
  if (!taskUuid) {
    showToast('Ошибка: задача не выбрана', 'error');
    return null;
  }

  if (!boardUuid) {
    showToast('Ошибка: доска не выбрана', 'error');
    return null;
  }

  if (
    'title' in updatedFields &&
    (!updatedFields.title || !updatedFields.title.trim())
  ) {
    showToast('Название задачи не может быть пустым', 'error');
    return null;
  }

  return await apiResponsesHandler(
    () =>
      api.patch(`/api/boards/${boardUuid}/tasks/${taskUuid}`, updatedFields),
    {
      onSuccess: (data) => {
        return data.updated || null;
      },
    },
  );
}
