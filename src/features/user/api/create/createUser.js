import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function confirmCode(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  return await apiResponsesHandler(() => api.post('/users', payload, {}));
}
