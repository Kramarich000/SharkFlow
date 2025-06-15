import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export async function createBoard({ title, color }) {
  if (!title.trim()) {
    showToast('Название не может быть пустым', 'error');
    return null;
  }
  if (!color.trim()) {
    showToast('Выберите цвет', 'error');
    return null;
  }

  try {
    const response = await api.post('/todo/createBoard', { title, color });
    if (
      response.data &&
      response.data.board.title &&
      response.data.board.color
    ) {
      showToast(
        `Доска ${response.data.board.title} успешно создана`,
        'success',
      );
      return response.data.board;
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

    if (error.response && error.response.status === 409) {
      showToast(error.response.data.error, 'error');
      return false;
    }

    showToast(error.response.data.error, 'error');
    return null;
  }
}
