import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

export default async function refreshToken(setAccessToken) {
  try {
    const response = await api.post('/refresh');
    const newAccessToken = response.data.accessToken;
    setAccessToken(newAccessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
  } catch (error) {
    const message = error.response.data.message ?? 'Ошибка обновления токена';
    showToast(message, 'info');
    setAccessToken(null);
  }
}
