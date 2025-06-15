import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export async function getBoards() {
  try {
    const response = await api.get('/todo/getBoards', {});
    if (response.status === 200) {
      return response.data.boards;
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
    showToast(response.data.error, 'error');
    return null;
  }
}
