import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function sendDisableGithubEmail() {
  return await apiResponsesHandler(
    () => api.post('/auth/github/confirm-disable', {}, {}),
    {},
  );
}
