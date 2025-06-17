import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function logoutUser() {
  return await apiResponsesHandler(() => api.post('/api/auth/logout'), {
    onSuccess: () => useAuthStore.getState().clearAccessToken(),
  });
}
