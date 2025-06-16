import { create } from 'zustand';

const useModalsStore = create((set) => ({
  isLogoutUserModalOpen: false,
  setIsLogoutUserModalOpen: (value) => set({ isLogoutUserModalOpen: value }),

  isDeleteUserModalOpen: false,
  setIsDeleteUserModalOpen: (value) => set({ isDeleteUserModalOpen: value }),
}));

export default useModalsStore;
