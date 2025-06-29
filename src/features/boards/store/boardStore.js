import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  selectedBoard: null,
  taskCount: {},

  setTaskCount: (boardUuid, countOrUpdater) => {
    set((state) => {
      const prevCount = state.taskCount[boardUuid] ?? 0;
      const newCount =
        typeof countOrUpdater === 'function'
          ? countOrUpdater(prevCount)
          : countOrUpdater;

      return {
        taskCount: {
          ...state.taskCount,
          [boardUuid]: newCount,
        },
      };
    });
  },

  handleBoardSelect: (board) => {
    set({
      selectedBoard: board,
    });
  },

  reset: () =>
    set({
      selectedBoard: null,
      taskCount: {},
    }),
}));
