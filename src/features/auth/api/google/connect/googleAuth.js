import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleAuth(code) {
  const result = await apiResponsesHandler(
    () => api.post('/api/auth/google', { code }),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          useAuthStore.getState().setCsrfToken(data.csrfToken);
          useUserStore.getState().updateUser({ googleOAuthEnabled: data.googleOAuthEnabled });
        }
      },
    },
  );

  return result;
}
