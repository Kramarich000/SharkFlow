import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useUserStore } from '@features/user';

export async function logoutAllUserDevices() {
  return await apiResponsesHandler(() => api.post('/auth/logout/all'), {
    onSuccess: () => {
      useAuthStore.getState().clearAccessToken();
      useUserStore.getState().clearUser();
      useAuthStore.getState().clearCsrfToken();
    },
  });
}
