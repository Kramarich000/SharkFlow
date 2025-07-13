import api from '@lib/http';
import { useAuthStore } from '@features/auth';
import { apiResponsesHandler } from '@utils/responsesHandler';

export async function login(values, captchaToken) {
  const payload = {
    user: {
      email: values.email,
      password: values.password,
      rememberMe: values.rememberMe,
    },
    captchaToken: captchaToken,
  };

  const result = await apiResponsesHandler(
    () => api.post('/auth/login', payload, {}),
    {
      onSuccess: (data) => {
        if (data.accessToken) {
          useAuthStore.getState().setAccessToken(data.accessToken);
          useAuthStore.getState().setCsrfToken(data.csrfToken);
        }
        if (data.deviceId) {
          localStorage.setItem('device_id', data.deviceId);
        }
        return data || null;
      },
    },
  );
  return result;
}
