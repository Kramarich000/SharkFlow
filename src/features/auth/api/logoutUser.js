import api from 'lib/http/http';
import { useAuthStore } from 'features/auth/store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function logoutUser() {
  return await apiResponsesHandler(() => api.post('/api/auth/logout'), {
    onSuccess: () => useAuthStore.getState().clearAccessToken(),
  });
}
