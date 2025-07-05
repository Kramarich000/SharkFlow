import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  csrfToken: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setCsrfToken: (token) => set({ csrfToken: token }),

  clearAccessToken: () => set({ accessToken: null }),
  clearCsrfToken: () => set({ csrfToken: null }),
}));
