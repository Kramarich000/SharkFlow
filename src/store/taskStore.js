import { create } from 'zustand';
import { produce } from 'immer';
import { getTasks } from '@api/http/tasks/getTasks';
import { createTask } from '@api/http/tasks/createTask';
import { updateTask } from '@api/http/tasks/updateTask';
import { deleteTask } from '@api/http/tasks/deleteTask';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loadedBoards: {},
  selectedTask: null,
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

  // getTasks: async (boardUuid) => {
  //   const tasks = await getTasks(boardUuid);
  //   if (tasks) {
  //     set({ tasks, isLoaded: true });
  //   }
  // },

  setSelectedBoard: (uuid) => {
    set({ selectedBoardUuid: uuid });
  },

  getTasks: async (boardUuid) => {
    const { loadedBoards } = get();

    if (loadedBoards[boardUuid]) return;

    const tasks = await getTasks(boardUuid);
    if (tasks) {
      set((state) => ({
        tasks,
        loadedBoards: {
          ...state.loadedBoards,
          [boardUuid]: true,
        },
      }));
    }
  },

  createTask: async (boardUuid) => {
    const { title, dueDate, description, priority, status } = get();
    const newTask = await createTask({
      boardUuid,
      title,
      dueDate,
      description,
      priority,
      status,
    });

    if (newTask) {
      set((state) => {
        const tasks = [...state.tasks];
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
          tasks,
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
    if (!uuid || Object.keys(updatedFields).length === 0) return null;
    try {
      return await updateTask(uuid, updatedFields);
    } catch (err) {
      return null;
    }
  },

  applyTaskUpdate: (updatedData) => {
    set((state) =>
      produce(state, (draft) => {
        const task = draft.tasks.find((b) => b.uuid === updatedData.uuid);
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

  updateTask: async ({ uuid, title, isPinned, isFavorite }) => {
    if (!uuid) return false;

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (isPinned !== undefined) updatedFields.isPinned = isPinned;
    if (isFavorite !== undefined) updatedFields.isFavorite = isFavorite;
    if (Object.keys(updatedFields).length === 0) {
      return false;
    }

    const prev = get().tasks.find((b) => b.uuid === uuid);
    const prevSnapshot = prev ? { ...prev } : null;

    get().applyTaskUpdate({ uuid, ...updatedFields });

    const updatedData = await get().updateTaskInApi(uuid, updatedFields);
    set({ isEditing: false });

    if (updatedData) {
      get().applyTaskUpdate(updatedData);
      return true;
    }

    if (prevSnapshot) {
      get().applyTaskUpdate(prevSnapshot);
    }
    return false;
  },

  deleteTask: async () => {
    const { selectedTask } = get();
    if (!selectedTask?.uuid) {
      return false;
    }

    const deleted = await deleteTask(selectedTask.uuid);
    if (deleted) {
      set((state) => {
        const updatedTasks = state.tasks.filter(
          (task) => task.uuid !== selectedTask.uuid,
        );
        return {
          tasks: updatedTasks,
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
    }),
}));

export default useTaskStore;
