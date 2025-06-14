import { create } from 'zustand';

export const useRegisterStore = create((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  passwordVisible: false,
  togglePasswordVisible: () =>
    set((state) => ({ passwordVisible: !state.passwordVisible })),
}));
