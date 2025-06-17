import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function register(values) {
  const payload = {
    user: {
      login: values.login,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      acceptedPolicies: values.acceptedPolicies,
    },
  };

  return await apiResponsesHandler(() =>
    api.post('/api/auth/reset-password/confirm', payload, {}),
  );
}
