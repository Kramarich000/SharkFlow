import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  userRole: null,

  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),

  setUserRole: (role) => set({ userRole: role }),
  clearUserRole: () => set({ userRole: null }),
}));
