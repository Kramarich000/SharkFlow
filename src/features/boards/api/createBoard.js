import api from '@lib/http';
import { apiResponsesHandler } from '@utils/responsesHandler';
import { showToast } from '@utils/toast';

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
