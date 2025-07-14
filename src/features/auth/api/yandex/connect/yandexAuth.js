import api from '@lib/http';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function yandexAuth(code, state, captchaToken) {
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();
  const { updateUser, setUser } = useUserStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/auth/oauth/yandex', { code, state, captchaToken }, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          setAccessToken(data.accessToken);
          setCsrfToken(data.csrfToken);
          updateUser({ yandexOAuthEnabled: data.yandexOAuthEnabled });
        }
      },
    },
  );
  return result;
}
