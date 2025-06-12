import { useState } from 'react';
import { useAuthStore } from '/src/store/authStore.js';
import api from '@api/http/http';
import { showToast } from '@utils/toast';

export const useTasks = () => {
  const token = useAuthStore((state) => state.accessToken);
  const [taskState, setTaskState] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const createTask = async (boardId) => {
    if (!taskState.title.trim()) {
      showToast('Название задачи не может быть пустым', 'error');
      return null;
    }
    if (!taskState.description.trim()) {
      showToast('Описание не может быть пустым', 'error');
      return null;
    }
    if (!taskState.deadline.trim()) {
      showToast('Пожалуйста укажите дедлайн', 'error');
      return null;
    }
    if (!token) {
      showToast('Ошибка: отсутствует токен', 'error');
      return null;
    }

    try {
      const response = await api.post(
        `/todo/createTask/${boardId}`,
        {
          title: taskState.title,
          description: taskState.description,
          deadline: taskState.deadline,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        setTaskState({
          title: '',
          description: '',
          deadline: '',
        });
        showToast('Задача успешно создана', 'success');
        return response.data;
      }
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      showToast('Серверная ошибка', 'error');
    }
    return null;
  };

  return {
    taskState,
    setTaskState,
    createTask,
  };
};
