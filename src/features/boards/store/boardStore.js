import { create } from 'zustand';

export const useBoardStore = create((set) => ({
  selectedBoard: null,

  handleBoardSelect: (board) => {
    set({
      selectedBoard: board,
    });
  },

  reset: () =>
    set({
      selectedBoard: null,
    }),
}));

