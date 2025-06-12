import api from '@api/http/http';
import { showToast } from '@utils/toast';

export async function updateBoard(token, uuid, { title, color }) {
  if (!uuid) {
    showToast('Ошибка: доска не выбрана', 'error');
    return null;
  }
  if (!title.trim()) {
    showToast('Название доски не может быть пустым!', 'error');
    return null;
  }

  try {
    const response = await api.put(
      `/todo/updateBoard/${uuid}`,
      { title: title.trim(), color: color.trim() },
      // { headers: { Authorization: `Bearer ${token}` } },
    );

    if (response.status === 200 && response.data?.data) {
      showToast('Доска успешно обновлена', 'success');
      return response.data.data;
    } else {
      showToast('Ошибка при обновлении доски', 'error');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при обновлении доски:', error);
    showToast('Ошибка при обновлении доски', 'error');
    return null;
  }
}
