import api from '@api/http/http';
import { showToast } from '@utils/toast/toast';

export async function createBoard({ title, color }) {
  if (!title.trim()) {
    showToast('Название не может быть пустым', 'error');
    return null;
  }
  if (!color.trim()) {
    showToast('Выберите цвет!', 'error');
    return null;
  }

  try {
    const response = await api.post('/todo/createBoard', { title, color });
    if (response.data && response.data.title && response.data.color) {
      showToast('Доска создана', 'success');
      return response.data;
    } else {
      showToast('Ошибка при создании доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при создании доски:', error);

    if (error.response && error.response.status === 429) {
      showToast(
        error.response.data.error || 'Слишком много запросов, попробуйте позже',
        'error',
      );
      return false;
    }

    console.error('Ошибка при создании доски:', error);
    showToast('Серверная ошибка', 'error');
    return null;
  }
}
