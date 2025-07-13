import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function confirmUpdate() {
  return await apiResponsesHandler(() =>
    api.post('/users/confirm-update', {}, {}),
  );
}
