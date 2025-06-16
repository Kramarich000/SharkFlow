import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
const GREETED_USER_KEY = 'greetedUser';
export default async function uploadingUserDataHandle() {
  return await apiResponsesHandler(() => api.post('/user/data', {}), {
    onSuccess: (data) => {
      if (sessionStorage.getItem(GREETED_USER_KEY)) {
        showToast(`Добро пожаловать ${data.login}!`);
        sessionStorage.setItem(GREETED_USER_KEY, 'true');
      }
    },
  });
}
