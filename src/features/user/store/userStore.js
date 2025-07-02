import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  updateUser: (updatedFields) =>
    set((state) => ({
      user: {
        ...state.user,
        ...updatedFields,
      },
    })),

  clearUser: () => set({ user: null }),
}));
