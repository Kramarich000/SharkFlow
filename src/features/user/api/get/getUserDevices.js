import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function getUserDevices() {
  return await apiResponsesHandler(() => api.get('/api/users/devices'), {
    onSuccess: (data) => {
      return data || null;
    },
  });
}
