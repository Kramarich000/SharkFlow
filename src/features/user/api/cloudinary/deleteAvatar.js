import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function deleteAvatar() {
  return await apiResponsesHandler(() => api.delete('/api/users/avatar', {}));
}
