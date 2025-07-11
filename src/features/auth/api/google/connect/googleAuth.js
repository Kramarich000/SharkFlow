import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function googleAuth(code, captchaToken, state) {
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();
  const { updateUser, setUser } = useUserStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/api/auth/google', { code, captchaToken, state }, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          setCsrfToken(data.csrfToken);
          updateUser({ googleOAuthEnabled: data.googleOAuthEnabled });
        }
      },
    },
  );
  return result;
}
