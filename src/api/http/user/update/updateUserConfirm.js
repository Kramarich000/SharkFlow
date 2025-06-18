import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function confirmUpdate() {
  return await apiResponsesHandler(() =>
    api.post('/api/users/confirm-update', {}, {}),
  );
}
