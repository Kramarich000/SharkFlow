import { create } from 'zustand';
import api from '@api/http/http';
import { showToast } from '@utils/toast/showToast';

const useTaskStore = create((set, get) => ({
  taskState: {
    title: '',
    description: '',
    deadline: '',
  },
  isCreateTaskModalOpen: false,

  setTaskState: (newState) =>
    set((state) => ({
      taskState: { ...state.taskState, ...newState },
    })),
  setIsCreateTaskModalOpen: (isOpen) => set({ isCreateTaskModalOpen: isOpen }),

  createTask: async (boardId) => {
    const { taskState } = get();

    if (!taskState.title.trim()) {
      return null;
    }

    try {
      const response = await api.post(`/todo/tasks/${boardId}`, taskState);

      if (response.status === 200) {
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
    } catch (error) {}
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
