import api from '@api/http/http';
import { apiResponsesHandler } from '@utils/responsesHandler/apiResponsesHandler';
import { showToast } from '@utils/toast/showToast';

export async function createTask({
  boardUuid,
  title,
  description,
  dueDate,
  priority,
  status,
}) {
  if (!title.trim()) {
    showToast('Название задачи не может быть пустым', 'error');
    return null;
  }

  // if (!dueDate) {
  //   showToast('Выберите дату окончания задачи', 'error');
  //   return null;
  // }

  // if (priority === null || priority === undefined) {
  //   showToast('Выберите приоритет задачи', 'error');
  //   return null;
  // }

  // if (!status?.trim()) {
  //   showToast('Выберите статус задачи', 'error');
  //   return null;
  // }

  const payload = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    status: status,
  };

  return await apiResponsesHandler(
    () => api.post(`/api/boards/${boardUuid}/tasks`, payload),
    {
      successMessage: `Задача "${title}" успешно создана`,
      onSuccess: (data) => data.task,
    },
  );
}
