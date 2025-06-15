import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { showToast } from '@utils/toast/showToast';

export default async function loginHandler(values) {
  const payload = {
    user: {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    },
  };
  try {
    const response = await api.post('/login', payload, {});

    if (response.status === 200) {
      showToast(response.data.message, 'success');
      useAuthStore.getState().setAccessToken(response.data.accessToken);
      return true;
    } else {
      showToast(response.data.error, 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 400) {
        showToast(error.response.data.error, 'error');
      } else if (error.response.status === 500) {
        showToast(error.response.data.error, 'error');
      }
    } else {
      showToast(error.response.data.error, 'error');
    }
    return false;
  }
}
