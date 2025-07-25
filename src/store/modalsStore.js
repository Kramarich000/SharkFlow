import { create } from 'zustand';

export const useModalsStore = create((set) => ({
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

  isDeleteTaskModalOpen: false,
  setIsDeleteTaskModalOpen: (value) => set({ isDeleteTaskModalOpen: value }),

  isSetupTotpModalOpen: false,
  setIsSetupTotpModalOpen: (value) => set({ isSetupTotpModalOpen: value }),

  isDisableTotpModalOpen: false,
  setIsDisableTotpModalOpen: (value) => set({ isDisableTotpModalOpen: value }),

  isAvatarCropModalOpen: false,
  setIsAvatarCropModalOpen: (value) => set({ isAvatarCropModalOpen: value }),

  isDeleteAvatarModalOpen: false,
  setIsDeleteAvatarModalOpen: (value) =>
    set({ isDeleteAvatarModalOpen: value }),

  isConnectGoogleModalOpen: false,
  setIsConnectGoogleModalOpen: (value) =>
    set({ isConnectGoogleModalOpen: value }),

  isDisableGoogleModalOpen: false,
  setIsDisableGoogleModalOpen: (value) =>
    set({ isDisableGoogleModalOpen: value }),

  isConnectTelegramModalOpen: false,
  setIsConnectTelegramModalOpen: (value) =>
    set({ isConnectTelegramModalOpen: value }),

  isDisableTelegramModalOpen: false,
  setIsDisableTelegramModalOpen: (value) =>
    set({ isDisableTelegramModalOpen: value }),

  isConnectGithubModalOpen: false,
  setIsConnectGithubModalOpen: (value) =>
    set({ isConnectGithubModalOpen: value }),

  isDisableGithubModalOpen: false,
  setIsDisableGithubModalOpen: (value) =>
    set({ isDisableGithubModalOpen: value }),

  isUserSessionsModalOpen: false,
  setIsUserSessionsModalOpen: (value) =>
    set({ isUserSessionsModalOpen: value }),

  isConfirmLogoutDevicesModalOpen: false,
  setIsConfirmLogoutDevicesModalOpen: (value) =>
    set({ isConfirmLogoutDevicesModalOpen: value }),

  isConnectYandexModalOpen: false,
  setIsConnectYandexModalOpen: (value) =>
    set({ isConnectYandexModalOpen: value }),

  isDisableYandexModalOpen: false,
  setIsDisableYandexModalOpen: (value) =>
    set({ isDisableYandexModalOpen: value }),

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
      isDeleteTaskModalOpen: false,
      isSetupTotpModalOpen: false,
      isDisableTotpModalOpen: false,
      isAvatarCropModalOpen: false,
      isDeleteAvatarModalOpen: false,
      isConnectGoogleModalOpen: false,
      isDisableGoogleModalOpen: false,
      isConnectTelegramModalOpen: false,
      isDisableTelegramModalOpen: false,
      isConnectGithubModalOpen: false,
      isDisableGithubModalOpen: false,
      isUserSessionsModalOpen: false,
      isConfirmLogoutDevicesModalOpen: false,
      isConnectYandexModalOpen: false,
      isDisableYandexModalOpen: false,
      contextMenu: { visible: false, x: 0, y: 0, board: null },
    }),
}));
