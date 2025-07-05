import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { useAuthStore } from '@features/auth';

export async function deleteUser(confirmationCode) {
  return await apiResponsesHandler(
    () => api.post('/api/users/delete', { confirmationCode }),
    {
      onSuccess: () => {
        useAuthStore.getState().clearAccessToken();
        useAuthStore.getState().clearCsrfToken();
      },
    },
  );
}
