import { api } from "@lib/http";
import { apiResponsesHandler } from "@utils/responsesHandler";
import { showToast } from "@utils/toast";

const GREETED_USER_KEY = 'greetedUser';
export async function getUser() {
  let result = undefined;

  await apiResponsesHandler(() => api.get('/api/users'), {
    onSuccess: (data) => {
      if (!sessionStorage.getItem(GREETED_USER_KEY)) {
        showToast(`Добро пожаловать ${data.login}!`);
        sessionStorage.setItem(GREETED_USER_KEY, 'true');
      }
      result = data;
    },
  });
  return result;
}
