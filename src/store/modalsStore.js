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

  resetModals: () =>
    set({
      isLogoutUserModalOpen: false,
      isDeleteUserModalOpen: false,
      isUpdateUserModalOpen: false,
      isCreateBoardModalOpen: false,
      isDeleteBoardModalOpen: false,
      isDetailsBoardModalOpen: false,
      isCreateTaskModalOpen: false,
    }),
}));

export default useModalsStore;
