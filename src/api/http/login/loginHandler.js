import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function loginHandler(values) {
  const payload = {
    user: {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    },
  };

  const result = await apiResponsesHandler(
    () => api.post('/login', payload, {}),
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
