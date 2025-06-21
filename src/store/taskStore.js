import { create } from 'zustand';
import { produce } from 'immer';
import { getTasks as apiGetTasks } from '@api/http/tasks/getTasks';
import { createTask as apiCreateTask } from '@api/http/tasks/createTask';
import { updateTask as apiUpdateTask } from '@api/http/tasks/updateTask';
import { deleteTask as apiDeleteTask } from '@api/http/tasks/deleteTask';

const useTaskStore = create((set, get) => ({
  tasksByBoard: {},
  loadedBoards: {},
  loadingBoards: {},
  selectedTask: null,
  selectedBoardUuid: null,
  isLoaded: false,
  isEditing: false,
  title: '',
  dueDate: '',
  description: '',
  priority: '',
  status: '',

  setTitle: (title) => set({ title }),
  setDueDate: (dueDate) => set({ dueDate }),
  setDescription: (description) => set({ description }),
  setPriority: (priority) => set({ priority }),
  setStatus: (status) => set({ status }),
  setIsEditing: (isEditing) => set({ isEditing }),

  setSelectedBoard: (uuid) => set({ selectedBoardUuid: uuid }),

  getTasks: async (boardUuid) => {
    const { loadedBoards, loadingBoards } = get();

    if (loadedBoards[boardUuid] || loadingBoards[boardUuid]) return;

    set((state) => ({
      loadingBoards: {
        ...state.loadingBoards,
        [boardUuid]: true,
      },
    }));

    try {
      const tasks = await apiGetTasks(boardUuid);
      if (tasks) {
        set((state) => ({
          tasksByBoard: {
            ...state.tasksByBoard,
            [boardUuid]: tasks,
          },
          loadedBoards: {
            ...state.loadedBoards,
            [boardUuid]: true,
          },
        }));
      }
    } finally {
      set((state) => ({
        loadingBoards: {
          ...state.loadingBoards,
          [boardUuid]: false,
        },
      }));
    }
  },
  getCurrentBoardTasks: () => {
    const { selectedBoardUuid, tasksByBoard } = get();
    return tasksByBoard[selectedBoardUuid] || [];
  },

  isBoardLoading: (boardUuid) => {
    const { loadingBoards } = get();
    return !!loadingBoards[boardUuid];
  },

  createTask: async (boardUuid) => {
    const { title, dueDate, description, priority, status } = get();
    const newTask = await apiCreateTask({
      boardUuid,
      title,
      dueDate,
      description,
      priority,
      status,
    });

    if (newTask) {
      set((state) => {
        const tasks = state.tasksByBoard[boardUuid]
          ? [...state.tasksByBoard[boardUuid]]
          : [];
        const tNew = new Date(newTask.updatedAt);
        let left = 0,
          right = tasks.length;
        while (left < right) {
          const mid = (left + right) >>> 1;
          const tMid = new Date(tasks[mid].updatedAt);
          if (tMid < tNew) right = mid;
          else left = mid + 1;
        }
        tasks.splice(left, 0, newTask);
        return {
          tasksByBoard: {
            ...state.tasksByBoard,
            [boardUuid]: tasks,
          },
          title: '',
          dueDate: '',
          description: '',
          priority: '',
          status: '',
        };
      });
      get().handleTaskSelect(newTask);
      return true;
    }
    return false;
  },

  updateTaskInApi: async (uuid, updatedFields) => {
    const { selectedBoardUuid } = get();
    if (!uuid || !selectedBoardUuid || Object.keys(updatedFields).length === 0)
      return null;
    try {
      return await apiUpdateTask(selectedBoardUuid, uuid, updatedFields);
    } catch {
      return null;
    }
  },

  applyTaskUpdate: (updatedData, boardUuid) => {
    set((state) =>
      produce(state, (draft) => {
        const boardId = boardUuid || state.selectedBoardUuid;
        const tasks = draft.tasksByBoard[boardId] || [];
        const task = tasks.find((b) => b.uuid === updatedData.uuid);
        if (!task) return;
        if (!updatedData.updatedAt) {
          updatedData.updatedAt = new Date().toISOString();
        }
        Object.assign(task, updatedData);
        if (draft.selectedTask?.uuid === updatedData.uuid) {
          const b = task;
          draft.selectedTask = { ...b };
          draft.title = b.title;
          draft.dueDate = b.dueDate;
          draft.description = b.description;
          draft.priority = b.priority;
          draft.status = b.status;
        }
      }),
    );
  },

  updateTask: async ({
    uuid,
    title,
    dueDate,
    description,
    priority,
    status,
    boardUuid,
  }) => {
    if (!uuid) return false;
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (dueDate !== undefined) updatedFields.dueDate = dueDate;
    if (description !== undefined) updatedFields.description = description;
    if (priority !== undefined) updatedFields.priority = priority;
    if (status !== undefined) updatedFields.status = status;

    if (Object.keys(updatedFields).length === 0) {
      return false;
    }
    const boardId = boardUuid || get().selectedBoardUuid;
    const prev = (get().tasksByBoard[boardId] || []).find(
      (b) => b.uuid === uuid,
    );
    const prevSnapshot = prev ? { ...prev } : null;
    get().applyTaskUpdate({ uuid, ...updatedFields }, boardId);
    const updatedData = await get().updateTaskInApi(uuid, updatedFields);
    set({ isEditing: false });
    if (updatedData) {
      get().applyTaskUpdate(updatedData, boardId);
      return true;
    }
    if (prevSnapshot) {
      get().applyTaskUpdate(prevSnapshot, boardId);
    }
    return false;
  },

  deleteTask: async () => {
    const { selectedTask, selectedBoardUuid } = get();
    console.log(selectedTask);
    if (!selectedTask?.uuid || !selectedBoardUuid) {
      return false;
    }

    const deleted = await apiDeleteTask(selectedBoardUuid, selectedTask?.uuid);
    if (deleted) {
      set((state) => {
        const updatedTasks = (
          state.tasksByBoard[selectedBoardUuid] || []
        ).filter((task) => task.uuid !== selectedTask.uuid);
        return {
          tasksByBoard: {
            ...state.tasksByBoard,
            [selectedBoardUuid]: updatedTasks,
          },
          selectedTask: null,
        };
      });
      return true;
    }
    return false;
  },

  handleTaskSelect: (task) => {
    set({
      selectedTask: task,
      isEditing: false,
    });
  },

  reset: () =>
    set({
      selectedTask: null,
      isLoaded: false,
      isEditing: false,
      title: '',
      dueDate: '',
      description: '',
      priority: '',
      status: '',
      selectedBoardUuid: null,
      tasksByBoard: {},
      loadedBoards: {},
    }),
}));

export default useTaskStore;
