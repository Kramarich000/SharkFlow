import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function guestLogin() {
  const result = await apiResponsesHandler(
    () => api.post('/api/auth/guest-login', {}, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          useAuthStore.getState().setUserRole(data.role);
        }
      },
    },
  );

  return result;
}
