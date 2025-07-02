import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function uploadUrl(imgUrl, publicId) {
  return await apiResponsesHandler(() =>
    api.patch('/api/users/avatar', { imgUrl, publicId }, {}),
  );
}
