import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function getCloudinarySignature() {
  return await apiResponsesHandler(() =>
    api.get('/cloudinary-signature', {}, {}),
  );
}
