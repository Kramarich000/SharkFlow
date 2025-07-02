import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function uploadUrl(imgUrl) {
  return await apiResponsesHandler(() => api.patch('/api/users/avatar', { imgUrl }, {}));
}
