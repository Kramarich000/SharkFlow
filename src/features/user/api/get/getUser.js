import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { showToast } from '@utils/toast';

const GREETED_USER_KEY = 'greetedUser';
export async function getUser() {
  let result = undefined;

  await apiResponsesHandler(() => api.get('/api/users'), {
    onSuccess: (data) => {
      if (!sessionStorage.getItem(GREETED_USER_KEY)) {
        console.log(data);
        console.log(data?.role?.trim().toLowerCase());
        if (data?.role?.trim().toLowerCase() !== 'guest') {
          showToast(`Добро пожаловать ${data.login}!`);
        } else {
          showToast('Добро пожаловать Гость!');
        }
        sessionStorage.setItem(GREETED_USER_KEY, 'true');
      }
      result = data;
    },
  });
  return result;
}
