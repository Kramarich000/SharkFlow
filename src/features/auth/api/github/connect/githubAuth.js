import api from '@lib/http';
import { useUserStore } from '@features/user';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubAuth(code, state) {
  const result = await apiResponsesHandler(
    () => api.post('/api/auth/github', { code, state }, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          useAuthStore.getState().setCsrfToken(data.csrfToken);
          useUserStore
            .getState()
            .updateUser({ githubOAuthEnabled: data.githubOAuthEnabled });
        }
      },
    },
  );
  return result;
}
