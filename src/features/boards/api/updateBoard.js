import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { showToast } from '@utils/toast';

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
    () => api.patch(`/boards/${uuid}`, updatedFields),
    {
      onSuccess: (data) => {
        return data.updated || null;
      },
    },
  );
}
