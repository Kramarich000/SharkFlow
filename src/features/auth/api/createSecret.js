import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function generateSecret() {
  return await apiResponsesHandler(() => api.get('/api/auth/totp'));
}
