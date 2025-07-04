import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useAuthStore } from '@features/auth';
import { useUserStore } from '@features/user';

export async function guestLogin() {
  const result = await apiResponsesHandler(
    () => api.post('/api/auth/guest-login', {}, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          useUserStore.getState().updateUser({ role: data.role });
        }
      },
    },
  );

  return result;
}
