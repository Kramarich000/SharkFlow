import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export async function updateBoard(uuid, updatedFields) {
  if (!updatedFields) updatedFields = {};
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

  try {
    const response = await api.patch(
      `/todo/updateBoard/${uuid}`,
      updatedFields,
    );
    if (response.status === 200 && response.data.updated) {
      const board = response.data.updated;
      if (response.data.updated.title || response.data.updated.color) {
        showToast(response.data.message, 'success');
      }
      return board;
    } else {
      showToast(response.data.error, 'error');
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      showToast(
        error.response.data.error || 'Слишком много запросов, попробуйте позже',
        'error',
      );
      return false;
    }
    showToast(error.response.data.error, 'error');
    return null;
  }
}
