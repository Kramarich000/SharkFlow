import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useAuthStore } from '@features/auth/store';
import { useUserStore } from '@features/user';

const SESSION_EXPIRED_KEY = 'sessionExpired';

export async function refreshToken() {
  const { setAccessToken, setGuestUuid } = useAuthStore.getState();
  const { updateUser, setUser } = useUserStore.getState();

  const result = await apiResponsesHandler(
    () => api.post('/api/auth/refresh'),
    {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        updateUser({ role: data.role });
        sessionStorage.removeItem(SESSION_EXPIRED_KEY);
      },
      onError: () => {
        if (sessionStorage.getItem(SESSION_EXPIRED_KEY) !== 'true') {
          sessionStorage.setItem(SESSION_EXPIRED_KEY, 'true');
        }
        setAccessToken(null);
        updateUser({ role: null });
      },
    },
  );

  return result;
}
