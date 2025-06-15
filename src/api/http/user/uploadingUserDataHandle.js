import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';
const GREETED_USER_KEY = 'greetedUser';
export default async function uploadingUserDataHandle() {
  try {
    const response = await api.post('/user', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const greetedUser = sessionStorage.getItem(GREETED_USER_KEY);

      if (!greetedUser) {
        showToast(`С возвращением ${response.data.login}!`);
        sessionStorage.setItem(GREETED_USER_KEY, 'true');
      }
      return true;
    } else {
      showToast(response.data.error, 'error');
      return false;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
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
