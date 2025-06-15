import { create } from 'zustand';

const useModalsStore = create((set) => ({
  isLogoutUserModalOpen: false,
  setIsLogoutUserModalOpen: (value) => set({ isLogoutUserModalOpen: value }),
}));

export default useModalsStore;
