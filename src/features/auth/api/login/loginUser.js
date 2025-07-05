import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';

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
        console.log('data:', data);
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
        }
        return data || null;
      },
    },
  );
  return result;
}
