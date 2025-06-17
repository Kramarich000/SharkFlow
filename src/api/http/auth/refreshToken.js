import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

const SESSION_EXPIRED_KEY = 'sessionExpired';

export default async function refreshToken(setAccessToken) {
  const result = await apiResponsesHandler(() => api.post('/refresh'), {
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
  });

  return result;
}
