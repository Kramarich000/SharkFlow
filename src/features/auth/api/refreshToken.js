import { api } from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

const SESSION_EXPIRED_KEY = 'sessionExpired';

export async function refreshToken(setAccessToken) {
  const result = await apiResponsesHandler(
    () => api.post('/api/auth/refresh'),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        sessionStorage.removeItem(SESSION_EXPIRED_KEY);
      },
      onError: (errorData) => {
        if (sessionStorage.getItem(SESSION_EXPIRED_KEY) !== 'true') {
          sessionStorage.setItem(SESSION_EXPIRED_KEY, 'true');
        }
        setAccessToken(null);
      },
    },
  );

  return result;
}
