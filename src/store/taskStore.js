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
  newTitle: '',
  dueDate: '',
  newDueDate: '',
  description: '',
  newDescription: '',
  priority: '',
  newPriority: '',
  status: '',
  newStatus: '',

  setTitle: (title) => set({ title }),
  setNewTitle: (newTitle) => set({ newTitle }),
  setDueDate: (dueDate) => set({ dueDate }),
  setNewDueDate: (newDueDate) => set({ newDueDate }),
  setDescription: (description) => set({ description }),
  setNewDescription: (newDescription) => set({ newDescription }),
  setPriority: (priority) => set({ priority }),
  setNewPriority: (newPriority) => set({ newPriority }),
  setStatus: (status) => set({ status }),
  setNewStatus: (newStatus) => set({ newStatus }),

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
    const { title, dueDate, description, priority, status, tasksByBoard } =
      get();
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

  updateTaskInApi: async (uuid, updatedFields, boardUuid) => {
    if (!uuid || Object.keys(updatedFields).length === 0) return null;
    try {
      return await apiUpdateTask(uuid, updatedFields);
    } catch (err) {
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
          draft.newTitle = b.title;
          draft.newDueDate = b.dueDate;
          draft.newDescription = b.description;
          draft.newPriority = b.priority;
          draft.newStatus = b.status;
        }
      }),
    );
  },

  updateTask: async ({ uuid, title, isPinned, isFavorite, boardUuid }) => {
    if (!uuid) return false;
    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (isPinned !== undefined) updatedFields.isPinned = isPinned;
    if (isFavorite !== undefined) updatedFields.isFavorite = isFavorite;
    if (Object.keys(updatedFields).length === 0) {
      return false;
    }
    const boardId = boardUuid || get().selectedBoardUuid;
    const prev = (get().tasksByBoard[boardId] || []).find(
      (b) => b.uuid === uuid,
    );
    const prevSnapshot = prev ? { ...prev } : null;
    get().applyTaskUpdate({ uuid, ...updatedFields }, boardId);
    const updatedData = await get().updateTaskInApi(
      uuid,
      updatedFields,
      boardId,
    );
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
    const { selectedTask, selectedBoardUuid, tasksByBoard } = get();
    if (!selectedTask?.uuid || !selectedBoardUuid) {
      return false;
    }
    const deleted = await apiDeleteTask(selectedTask.uuid);
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
      newTitle: task.title,
      newIsPinned: task.isPinned ?? false,
      newIsFavorite: task.isFavorite ?? false,
      isEditing: false,
    });
  },

  reset: () =>
    set({
      selectedTask: null,
      isLoaded: false,
      isEditing: false,
      title: '',
      newTitle: '',
      setTitle: '',
      setDescription: '',
      setPriority: 'MEDIUM',
      setStatus: 'PENDING',
      setDueDate: null,
      selectedBoardUuid: null,
      tasksByBoard: {},
      loadedBoards: {},
    }),
}));

export default useTaskStore;
