import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';

export async function createBoard({ title, color }) {
  if (!title.trim()) {
    showToast('Название не может быть пустым', 'error');
    return null;
  }
  if (!color.trim()) {
    showToast('Выберите цвет', 'error');
    return null;
  }

  return await apiResponsesHandler(
    () => api.post('/api/todo/boards', { title, color }),
    {
      successMessage: `Доска ${title} успешно создана`,
      onSuccess: (data) => data.board,
    },
  );
}
