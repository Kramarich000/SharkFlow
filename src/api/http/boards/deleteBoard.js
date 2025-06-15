import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export async function deleteBoard(uuid) {
  try {
    const response = await api.delete(`/todo/deleteBoard/${uuid}`);
    if (response.status === 200) {
      showToast(response.data.message, 'success');
      return response.data;
    } else {
      showToast(response.data.error, 'error');
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 429) {
      showToast(
        error.response.data.error || 'Слишком много запросов, попробуйте позже',
        'error',
      );
      return false;
    }
    showToast(error.response.data.error, 'error');
    return null;
  }
}
