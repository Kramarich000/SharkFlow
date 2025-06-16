import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function confirmCode(values) {
  const payload = {
    confirmationCode: values.confirmationCode,
  };

  return await apiResponsesHandler(() =>
    api.post('/register/verify', payload, {}),
  );
}
