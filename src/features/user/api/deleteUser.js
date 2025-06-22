import api from 'lib/http/http';
import { useAuthStore } from 'features/auth/store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export async function deleteUser(confirmationCode) {
  console.log(confirmationCode);
  return await apiResponsesHandler(
    () => api.post('/api/users/delete', { confirmationCode }),
    {
      onSuccess: () => useAuthStore.getState().clearAccessToken(),
    },
  );
}
