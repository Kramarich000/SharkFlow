import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export default async function confirmCodeHandler(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  try {
    const response = await api.post('/verify', payload, {});
    if (response.status === 201) {
      showToast(response.data.message, 'success');
      return true;
    } else {
      showToast(response.data.error, 'error');
    }
    return false;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400 && error.response.data.error) {
        showToast(error.response.data.error, 'error');
      } else {
        showToast(error.response.data.error, 'error');
      }
    }
    return false;
  }
}
