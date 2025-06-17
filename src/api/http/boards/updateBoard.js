import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';

export async function updateBoard(uuid, updatedFields = {}) {
  if (!uuid) {
    showToast('Ошибка: доска не выбрана', 'error');
    return null;
  }

  if (
    'title' in updatedFields &&
    (!updatedFields.title || !updatedFields.title.trim())
  ) {
    showToast('Название доски не может быть пустым', 'error');
    return null;
  }

  return await apiResponsesHandler(
    () => api.patch(`/api/todo/boards/${uuid}`, updatedFields),
    {
      onSuccess: (data) => {
        return data.updated || null;
      },
    },
  );
}
