import api from 'lib/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function confirmCode(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  return await apiResponsesHandler(() => api.post('/api/users', payload, {}));
}
