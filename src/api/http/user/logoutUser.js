import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function logoutUser() {
  return await apiResponsesHandler(() => api.post('/user/logout'), {
    onSuccess: () => useAuthStore.getState().clearAccessToken(),
  });
}
