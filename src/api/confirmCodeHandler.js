import api from '@api/api';
import { showToast } from '@utils/toast';

export default async function confirmCodeHandler(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  try {
    const response = await api.post('/verify', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 201) {
      showToast('Вы успешно зарегистрировались!', 'success');
      return true;
    }
    showToast('Что-то пошло не так', 'error');
    return false;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 400) {
        const data = error.response.data;

        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((msg) => showToast(msg, 'error'));
        } else if (data.error) {
          if (typeof data.error === 'string') {
            showToast(data.error, 'error');
          } else if (typeof data.error === 'object') {
            Object.values(data.error).forEach((msg) => showToast(msg, 'error'));
          } else {
            showToast('Ошибка валидации', 'error');
          }
        } else {
          showToast('Ошибка валидации', 'error');
        }
      } else {
        showToast('Ошибка сети или сервера. Попробуйте позже.', 'error');
      }
    }
    return false;
  }
}
