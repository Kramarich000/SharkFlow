import {
  LogoutUserModal,
  DeleteUserModal,
  UpdateUserModal,
  AvatarCropModal,
  DeleteAvatarModal,
} from '@features/user';
import {
  CreateBoardModal,
  DeleteBoardModal,
  BoardDetailsModal,
} from '@features/boards';
import {
  CreateTaskModal,
  TaskDetailsModal,
  DeleteTaskModal,
} from '@features/tasks';

import {
  ConnectGoogleModal,
  SetupTotpModal,
  DisableTotpModal,
  DisableGoogleModal,
} from '@features/auth';

import { useModalsStore } from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import { useDelayedUnmount } from './useDelayedUnmount';

const modalList = [
  { flag: 'isLogoutUserModalOpen', Component: LogoutUserModal },
  { flag: 'isDeleteUserModalOpen', Component: DeleteUserModal },
  { flag: 'isUpdateUserModalOpen', Component: UpdateUserModal },
  { flag: 'isCreateBoardModalOpen', Component: CreateBoardModal },
  { flag: 'isDeleteBoardModalOpen', Component: DeleteBoardModal },
  { flag: 'isDetailsBoardModalOpen', Component: BoardDetailsModal },
  { flag: 'isCreateTaskModalOpen', Component: CreateTaskModal },
  { flag: 'isDetailsTaskModalOpen', Component: TaskDetailsModal },
  { flag: 'isDeleteTaskModalOpen', Component: DeleteTaskModal },
  { flag: 'isSetupTotpModalOpen', Component: SetupTotpModal },
  { flag: 'isDisableTotpModalOpen', Component: DisableTotpModal },
  { flag: 'isAvatarCropModalOpen', Component: AvatarCropModal },
  { flag: 'isDeleteAvatarModalOpen', Component: DeleteAvatarModal },
  { flag: 'isConnectGoogleModalOpen', Component: ConnectGoogleModal },
  { flag: 'isDisableGoogleModalOpen', Component: DisableGoogleModal },
];

export function ModalManager() {
  const modalFlags = useModalsStore(
    useShallow((state) =>
      modalList.reduce((acc, { flag }) => {
        acc[flag] = state[flag];
        return acc;
      }, {}),
    ),
  );

  const shouldRenderLogout = useDelayedUnmount(
    modalFlags.isLogoutUserModalOpen,
    300,
  );
  const shouldRenderDeleteUser = useDelayedUnmount(
    modalFlags.isDeleteUserModalOpen,
    300,
  );
  const shouldRenderUpdateUser = useDelayedUnmount(
    modalFlags.isUpdateUserModalOpen,
    300,
  );
  const shouldRenderCreateBoard = useDelayedUnmount(
    modalFlags.isCreateBoardModalOpen,
    300,
  );
  const shouldRenderDeleteBoard = useDelayedUnmount(
    modalFlags.isDeleteBoardModalOpen,
    300,
  );
  const shouldRenderDetailsBoard = useDelayedUnmount(
    modalFlags.isDetailsBoardModalOpen,
    300,
  );
  const shouldRenderCreateTask = useDelayedUnmount(
    modalFlags.isCreateTaskModalOpen,
    300,
  );
  const shouldRenderDetailsTask = useDelayedUnmount(
    modalFlags.isDetailsTaskModalOpen,
    300,
  );
  const shouldRenderDeleteTask = useDelayedUnmount(
    modalFlags.isDeleteTaskModalOpen,
    300,
  );
  const shouldRenderSetupTotp = useDelayedUnmount(
    modalFlags.isSetupTotpModalOpen,
    300,
  );
  const shouldRenderDisableTotp = useDelayedUnmount(
    modalFlags.isDisableTotpModalOpen,
    300,
  );
  const shouldRenderAvatarCrop = useDelayedUnmount(
    modalFlags.isAvatarCropModalOpen,
    300,
  );
  const shouldRenderDeleteAvatar = useDelayedUnmount(
    modalFlags.isDeleteAvatarModalOpen,
    300,
  );

  const shouldRenderConnectGoogle = useDelayedUnmount(
    modalFlags.isConnectGoogleModalOpen,
    300,
  );

  const shouldRenderDisableGoogle = useDelayedUnmount(
    modalFlags.isDisableGoogleModalOpen,
    300,
  );

  return (
    <>
      {shouldRenderLogout && (
        <LogoutUserModal open={modalFlags.isLogoutUserModalOpen} />
      )}
      {shouldRenderDeleteUser && (
        <DeleteUserModal open={modalFlags.isDeleteUserModalOpen} />
      )}
      {shouldRenderUpdateUser && (
        <UpdateUserModal open={modalFlags.isUpdateUserModalOpen} />
      )}
      {shouldRenderCreateBoard && (
        <CreateBoardModal open={modalFlags.isCreateBoardModalOpen} />
      )}
      {shouldRenderDeleteBoard && (
        <DeleteBoardModal open={modalFlags.isDeleteBoardModalOpen} />
      )}
      {shouldRenderDetailsBoard && (
        <BoardDetailsModal open={modalFlags.isDetailsBoardModalOpen} />
      )}
      {shouldRenderCreateTask && (
        <CreateTaskModal open={modalFlags.isCreateTaskModalOpen} />
      )}
      {shouldRenderDetailsTask && (
        <TaskDetailsModal open={modalFlags.isDetailsTaskModalOpen} />
      )}
      {shouldRenderDeleteTask && (
        <DeleteTaskModal open={modalFlags.isDeleteTaskModalOpen} />
      )}
      {shouldRenderSetupTotp && (
        <SetupTotpModal open={modalFlags.isSetupTotpModalOpen} />
      )}
      {shouldRenderDisableTotp && (
        <DisableTotpModal open={modalFlags.isDisableTotpModalOpen} />
      )}
      {shouldRenderAvatarCrop && (
        <AvatarCropModal open={modalFlags.isAvatarCropModalOpen} />
      )}
      {shouldRenderDeleteAvatar && (
        <DeleteAvatarModal open={modalFlags.isDeleteAvatarModalOpen} />
      )}
      {shouldRenderConnectGoogle && (
        <ConnectGoogleModal open={modalFlags.isConnectGoogleModalOpen} />
      )}

      {shouldRenderDisableGoogle && (
        <DisableGoogleModal open={modalFlags.isDisableGoogleModalOpen} />
      )}
    </>
  );
}
