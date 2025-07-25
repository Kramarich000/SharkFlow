import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function logoutUserDevice(deviceId) {
  await apiResponsesHandler(() => api.post(`/auth/logout/${deviceId}`), {});
}
