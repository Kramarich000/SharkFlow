import api from '@api/http/http';
import { showToast } from '@utils/toast';

export async function deleteBoard(token, uuid) {
  try {
    const response = await api.post(`/todo/deleteBoard/${uuid}`, {
    //   headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (response.status === 200) {
      showToast('Доска успешно удалена', 'info');
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
