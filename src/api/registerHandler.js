import api from '@api/api';
import { showToast } from '@utils/toast';

export default async function registerHandler(values) {
  const payload = {
    user: {
      login: values.login,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  };

  try {
    // console.log(payload);
    const response = await api.post('/register', payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    if (response.status === 200) {
      showToast('Успех!', 'success');
      return true;
    } else {
      showToast('Что-то пошло не так', 'error');
      return false;
    }
  } catch (error) {
    console.log('adsasd', error);
    if (error.response) {
      if (error.response.status === 409) {
        showToast(error.response.data.error, 'error');
      } else {
        // showToast(`Ошибка: ${error.response.statusText}`, 'error');
      }
    } else {
      showToast('Ошибка сети или сервера. Попробуйте позже.', 'error');
    }
    return false;
  }
}
