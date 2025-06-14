import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { showToast } from '@utils/toast';

export default async function loginHandler(values) {
  const payload = {
    user: {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    },
  };
  // console.log(values);
  try {
    const response = await api.post('/login', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    // console.log(response);

    if (response.status === 200) {
      showToast(response.data.message, 'success');
      useAuthStore.getState().setAccessToken(response.data.accessToken);
      return true;
    } else {
      showToast('Что-то пошло не так', 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      // console.log(error);

      if (error.response.status === 401 || error.response.status === 400) {
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
