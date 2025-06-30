import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useAuthStore } from '@features/auth/store';

const SESSION_EXPIRED_KEY = 'sessionExpired';

export async function refreshToken() {
  const { setAccessToken, setGuestUuid, setUserRole } = useAuthStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/api/auth/refresh'),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        setUserRole(data.role);
        sessionStorage.removeItem(SESSION_EXPIRED_KEY);
      },
      onError: () => {
        if (sessionStorage.getItem(SESSION_EXPIRED_KEY) !== 'true') {
          sessionStorage.setItem(SESSION_EXPIRED_KEY, 'true');
        }
        setAccessToken(null);
        setUserRole(null);
      },
    },
  );

  return result;
}
