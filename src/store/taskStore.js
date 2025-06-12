import { create } from 'zustand';
import api from '@api/http/http';
import { showToast } from '@utils/toast';

const useTaskStore = create((set, get) => ({
  taskState: {
    title: '',
    description: '',
    deadline: '',
  },
  isCreateTaskModalOpen: false,

  // Setters
  setTaskState: (newState) =>
    set((state) => ({
      taskState: { ...state.taskState, ...newState },
    })),
  setIsCreateTaskModalOpen: (isOpen) => set({ isCreateTaskModalOpen: isOpen }),

  // Actions
  createTask: async (token, boardId) => {
    const { taskState } = get();

    if (!taskState.title.trim()) {
      showToast('Название задачи не может быть пустым', 'error');
      return null;
    }

    try {
      const response = await api.post(
        `/todo/createTask/${boardId}`,
        taskState,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        showToast('Задача успешно создана', 'success');
        set({
          taskState: {
            title: '',
            description: '',
            deadline: '',
          },
          isCreateTaskModalOpen: false,
        });
        return response.data;
      }
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      showToast('Ошибка при создании задачи', 'error');
    }
    return null;
  },

  reset: () =>
    set({
      taskState: {
        title: '',
        description: '',
        deadline: '',
      },
      isCreateTaskModalOpen: false,
    }),
}));

export default useTaskStore;
