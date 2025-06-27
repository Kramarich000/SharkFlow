import { api } from "@lib/http";
import { apiResponsesHandler } from "@utils/responsesHandler";
import { showToast } from "@utils/toast";

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

  // if (title.length > 64) {
  //   showToast('Название задачи не может быть более 64 символов', 'error');
  //   return null;
  // }
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
