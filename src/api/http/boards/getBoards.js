import api from '@api/http/http';
import { showToast } from '@utils/toast';

export async function getBoards() {
  try {
    const response = await api.get('/todo/getBoards', {});
    if (response.status === 200) {
      // console.log(response.data.boards);
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
