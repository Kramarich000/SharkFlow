import api from '@api/http/http';
import { showToast } from '@utils/toast/toast';

export async function deleteBoard(uuid) {
  try {
    const response = await api.delete(`/todo/deleteBoard/${uuid}`, {});
    // console.log(response);
    if (response.status === 200) {
      // console.log(response);
      showToast(`${response.data.message}`, 'success');
      return response.data;
    } else {
      showToast('Ошибка при удалении доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при удалении доски:', error);
    if (error.response && error.response.status === 429) {
      showToast(
        error.response.data.error || 'Слишком много запросов, попробуйте позже',
        'error',
      );
      return false;
    }
    showToast('Серверная ошибка', 'error');
    return null;
  }
}
