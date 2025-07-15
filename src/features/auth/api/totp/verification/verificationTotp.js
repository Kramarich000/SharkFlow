import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useAuthStore } from '@features/auth';
import { useUserStore } from '@features/user';

export async function checkTwoFactor(totpCode, sessionKey) {
  const result = await apiResponsesHandler(() =>
    api.post(
      '/auth/totp/verify',
      { totpCode, sessionKey },
      {
        onSuccess: (data) => {
          if (data.accessToken) {
            useAuthStore.getState().setAccessToken(data.accessToken);
            useAuthStore.getState().setCsrfToken(data.csrfToken);
          }
        },
      },
    ),
  );
  return result;
}
