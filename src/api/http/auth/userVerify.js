import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function userVerify(email) {
  const payload = { email };
  console.log(payload);

  return await apiResponsesHandler(() => api.post('/user/verify', payload, {}));
}
