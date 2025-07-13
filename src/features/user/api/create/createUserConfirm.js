import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function register(values, captchaToken) {
  const payload = {
    user: {
      login: values.login,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      acceptedPolicies: values.acceptedPolicies,
    },
    captchaToken: captchaToken,
  };

  return await apiResponsesHandler(() =>
    api.post('/users/confirm-registration', payload, {}),
  );
}
