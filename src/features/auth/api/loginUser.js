import api from 'lib/http/http';
import { useAuthStore } from 'features/auth/store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function login(values) {
  const payload = {
    user: {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    },
  };

  const result = await apiResponsesHandler(
    () => api.post('/api/auth/login', payload, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
        }
      },
    },
  );

  return result;
}
