import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';
import useUserStore from '@store/userStore';

export async function updateUser(confirmationCode, updatedFields = {}) {
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

  console.log(updatedFields);

  return await apiResponsesHandler(
    () => api.patch('/api/users/update', { confirmationCode, updatedFields }),
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
