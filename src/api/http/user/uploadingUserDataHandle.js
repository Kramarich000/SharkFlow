import api from '@api/http/http';
import { showToast } from '@utils/toast/toast';

export default async function uploadingUserDataHandle() {
  try {
    const response = await api.post('/user', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      showToast(`С возвращением ${response.data.login}!`);
      return true;
    } else {
      showToast('Что-то пошло не так', 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        showToast(error.response.data.error, 'error');
      } else if (error.response.status === 500) {
        showToast(`Ошибка: ${error.response.data.error}`, 'error');
      }
    } else {
      showToast('Ошибка сети или сервера. Попробуйте позже.', 'error');
    }
    return false;
  }
}
