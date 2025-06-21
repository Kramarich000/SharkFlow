import { create } from 'zustand';

const useModalsStore = create((set) => ({
  isLogoutUserModalOpen: false,
  setIsLogoutUserModalOpen: (value) => set({ isLogoutUserModalOpen: value }),

  isDeleteUserModalOpen: false,
  setIsDeleteUserModalOpen: (value) => set({ isDeleteUserModalOpen: value }),

  isUpdateUserModalOpen: false,
  setIsUpdateUserModalOpen: (value) => set({ isUpdateUserModalOpen: value }),

  isCreateBoardModalOpen: false,
  setIsCreateBoardModalOpen: (value) => set({ isCreateBoardModalOpen: value }),

  isDeleteBoardModalOpen: false,
  setIsDeleteBoardModalOpen: (value) => set({ isDeleteBoardModalOpen: value }),

  isDetailsBoardModalOpen: false,
  setIsDetailsBoardModalOpen: (value) =>
    set({ isDetailsBoardModalOpen: value }),

  isCreateTaskModalOpen: false,
  setIsCreateTaskModalOpen: (value) => set({ isCreateTaskModalOpen: value }),

  isDetailsTaskModalOpen: false,
  setIsDetailsTaskModalOpen: (value) => set({ isDetailsTaskModalOpen: value }),

  contextMenu: {
    visible: false,
    x: 0,
    y: 0,
    board: null,
  },

  openContextMenu: (x, y, board) =>
    set({ contextMenu: { visible: true, x, y, board } }),

  closeContextMenu: () =>
    set((state) => ({
      contextMenu: { ...state.contextMenu, visible: false },
    })),

  resetModals: () =>
    set({
      isLogoutUserModalOpen: false,
      isDeleteUserModalOpen: false,
      isUpdateUserModalOpen: false,
      isCreateBoardModalOpen: false,
      isDeleteBoardModalOpen: false,
      isDetailsBoardModalOpen: false,
      isCreateTaskModalOpen: false,
      isDetailsTaskModalOpen: false,
      contextMenu: { visible: false, x: 0, y: 0, board: null },
    }),
}));

export default useModalsStore;
