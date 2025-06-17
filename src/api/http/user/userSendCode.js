import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function userVerify(email) {
  const payload = { email };
  console.log(payload);

  return await apiResponsesHandler(() =>
    api.post('/api/users/send-code', payload, {}),
  );
}
