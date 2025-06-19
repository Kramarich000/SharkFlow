import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';

export async function createBoard({ title, color }) {
  if (!title.trim()) {
    showToast('Название доски не может быть пустым', 'error');
    return null;
  }
  if (!color.trim() || color.trim() === 'transparent') {
    showToast('Выберите цвет доски', 'error');
    return null;
  }

  return await apiResponsesHandler(
    () => api.post('/api/boards', { title, color }),
    {
      successMessage: `Доска "${title}" успешно создана`,
      onSuccess: (data) => data.board,
    },
  );
}
