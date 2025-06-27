import {
  LogoutUserModal,
  DeleteUserModal,
  UpdateUserModal,
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

const modalConfig = {
  isLogoutUserModalOpen: LogoutUserModal,
  isDeleteUserModalOpen: DeleteUserModal,
  isUpdateUserModalOpen: UpdateUserModal,
  isCreateBoardModalOpen: CreateBoardModal,
  isDeleteBoardModalOpen: DeleteBoardModal,
  isDetailsBoardModalOpen: BoardDetailsModal,
  isCreateTaskModalOpen: CreateTaskModal,
  isDetailsTaskModalOpen: TaskDetailsModal,
  isDeleteTaskModalOpen: DeleteTaskModal,
};

export function ModalManager() {
  return (
    <>
      {Object.values(modalConfig).map((ModalComponent, index) => (
        <ModalComponent key={index} />
      ))}
    </>
  );
}
