import api from '@api/http/http';
import { useAuthStore } from '@store/authStore';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';

export default async function deleteUser() {
  return await apiResponsesHandler(() => api.delete('/user/delete'), {
    onSuccess: () => useAuthStore.getState().clearAccessToken(),
  });
}
