import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function confirmCodeHandler(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  return await apiResponsesHandler(() => api.post('/verify', payload, {}));
}
