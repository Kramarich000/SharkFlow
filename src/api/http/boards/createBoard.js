import api from '@api/http/http';
import { showToast } from '@utils/toast';

export async function createBoard(token, { title, color }) {
  if (!title.trim()) {
    showToast('Название не может быть пустым', 'error');
    return null;
  }
  if (!color.trim()) {
    showToast('Выберите цвет!', 'error');
    return null;
  }

  try {
    const response = await api.post(
      '/todo/createBoard',
      { title, color },
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   },
    );

    if (response.data && response.data.title && response.data.color) {
      showToast('Доска успешно создана', 'success');
      return response.data;
    } else {
      showToast('Ошибка при создании доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при создании доски:', error);
    showToast('Серверная ошибка', 'error');
    return null;
  }
}
