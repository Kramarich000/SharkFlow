import api from '@api/http/http';
import { showToast } from '@utils/toast/toast';

export async function deleteBoard(uuid) {
  try {
    const response = await api.post(`/todo/deleteBoard/${uuid}`, {});
    // console.log(response);
    if (response.status === 200) {
      showToast('Доска удалена', 'success');
      return response.data;
    } else {
      showToast('Ошибка при удалении доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при удалении доски:', error);
    showToast('Серверная ошибка', 'error');
    return null;
  }
}
