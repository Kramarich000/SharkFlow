import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { showToast } from '@utils/toast';
import { useUserStore } from '@features/user';

export async function updateUser(confirmationCode, updatedFields = {}) {
  if (!updatedFields || Object.keys(updatedFields).length === 0) {
    showToast('Нет данных для обновления', 'error');
    return null;
  }

  if (
    'login' in updatedFields &&
    (!updatedFields.login || !updatedFields.login.trim())
  ) {
    showToast('Логин не может быть пустым', 'error');
    return null;
  }

  if (
    'email' in updatedFields &&
    (!updatedFields.email || !updatedFields.email.trim())
  ) {
    showToast('Почта не может быть пустой', 'error');
    return null;
  }

  return await apiResponsesHandler(
    () => api.patch('/api/users', { confirmationCode, updatedFields }),
    {
      onSuccess: (data) => {
        const { user } = data;

        if (user) {
          useUserStore.getState().setUser(user);
          showToast('Данные успешно обновлены', 'success');
        }

        return user || null;
      },
    },
  );
}
