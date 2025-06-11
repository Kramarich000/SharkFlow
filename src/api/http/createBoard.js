import api from '@api/http/http';
import { showToast } from '@utils/toast';

export default async function createBoard(token, title) {
  try {
    console.log(title);
    const response = await api.post(
      '/todo/createBoard',
      { title: title },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200 || response.status === 201) {
      showToast(response.data.message, 'success');
      console.log(response.data);
      return response.data;
    } else {
      showToast('Что-то пошло не так', 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      console.log(error);

      if (error.response.status === 401) {
        showToast(error.response.data.error, 'error');
        console.log(`${error}`);
      } else if (error.response.status === 500) {
        showToast(`Ошибка: ${error.response.data.error}`, 'error');
      }
    } else {
      console.log(`${error.response.data.error}`);
      showToast('Ошибка сети или сервера. Попробуйте позже.', 'error');
    }
    return false;
  }
}
