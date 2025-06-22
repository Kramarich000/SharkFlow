import api from 'lib/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function userVerify() {
  return await apiResponsesHandler(() =>
    api.post('/api/users/delete/confirm-deletion', {}, {}),
  );
}
