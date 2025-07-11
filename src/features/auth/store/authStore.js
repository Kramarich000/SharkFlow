import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  csrfToken: null,
  deviceId: null,

  setAccessToken: (token) => set({ accessToken: token }),
  setCsrfToken: (token) => set({ csrfToken: token }),
  setDeviceId: (id) => set({ deviceId: id }),

  clearAccessToken: () => set({ accessToken: null }),
  clearCsrfToken: () => set({ csrfToken: null }),
  clearDeviceId: () => set({ deviceId: null }),
}));
