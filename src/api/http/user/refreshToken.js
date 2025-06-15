import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';
const SESSION_EXEPIRED_KEY = 'sessionExpired';
export default async function refreshToken(setAccessToken) {
  try {
    const response = await api.post('/refresh');
    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (error) {
    const message = error.response.data.message ?? 'Ошибка обновления токена';
    const sessionExpired = sessionStorage.getItem(SESSION_EXEPIRED_KEY);

    if (!sessionExpired) {
      showToast(message, 'info');
      sessionStorage.setItem(SESSION_EXEPIRED_KEY, 'true');
    }
    setAccessToken(null);
  }
}
