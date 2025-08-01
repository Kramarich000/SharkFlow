import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubConnect(code, state, captchaToken) {
  const { updateUser } = useUserStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/auth/oauth/github/connect', { code, state }, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          updateUser({ githubOAuthEnabled: data.githubOAuthEnabled });
        }
      },
    },
  );
  return result;
}
