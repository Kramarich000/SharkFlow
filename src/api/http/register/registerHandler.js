import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export default async function registerHandler(values) {
  const payload = {
    user: {
      login: values.login,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      acceptedPolicies: values.acceptedPolicies,
    },
  };

  try {
    const response = await api.post('/register', payload, {});

    if (response.status === 200) {
      showToast(response.data.message, 'success');
      return true;
    } else {
      showToast(response.data.error, 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
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
