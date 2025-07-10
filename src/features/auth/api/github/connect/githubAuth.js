import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function githubAuth(code, state) {
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();
  const { updateUser, setUser } = useUserStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/api/auth/github', { code, state }, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          setCsrfToken(data.csrfToken);
          updateUser({ githubOAuthEnabled: data.githubOAuthEnabled });
        }
      },
    },
  );
  return result;
}
