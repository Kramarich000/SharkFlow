import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useUserStore } from '@features/user';

export async function logoutUser() {
  return await apiResponsesHandler(() => api.post('/api/auth/logout'), {
    onSuccess: () => {
      useAuthStore.getState().clearAccessToken();
      useUserStore.getState().clearUser();
    },
  });
}
