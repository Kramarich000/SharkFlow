import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';
import { useAuthStore } from '@store/authStore';

export default async function logoutUser() {
  try {
    const response = await api.post('/logout');
    if (response.status === 200) {
      useAuthStore.getState().clearAccessToken();
      showToast(response.data.message, 'success');
    }
  } catch (error) {
    showToast(error.response.data.error, 'error');
  }
}
