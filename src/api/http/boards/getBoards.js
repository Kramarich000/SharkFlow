import api from '@api/http/http';
import { showToast } from '@utils/toast';

export async function getBoards(token) {
  try {
    const response = await api.get('/todo/getBoards', {
    //   headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      return response.data.boards;
    } else {
      showToast('Ошибка при загрузке досок', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке досок', error);
    showToast('Ошибка при загрузке досок', 'error');
    return null;
  }
}
