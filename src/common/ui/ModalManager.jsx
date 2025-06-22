import LogoutUserModal from '../../features/user/modals/LogoutUserModal';
import DeleteUserModal from '../../features/user/modals/DeleteUserModal';
import UpdateUserModal from '../../features/user/modals/UpdateUserModal';
import CreateBoardModal from '../../features/boards/modals/CreateBoardModal';
import DeleteBoardModal from '../../features/boards/modals/DeleteBoardModal';
import BoardDetailsModal from '../../features/boards/modals/BoardDetailsModal';
import CreateTaskModal from '../../features/tasks/modals/CreateTaskModal';
import TaskDetailsModal from '../../features/tasks/modals/TaskDetailsModal';
import DeleteTaskModal from '../../features/tasks/modals/DeleteTaskModal';
import useModalsStore from '@store/modalsStore';

export function ModalManager() {
  const modals = useModalsStore();

  if (modals.isLogoutUserModalOpen) return <LogoutUserModal />;
  if (modals.isDeleteUserModalOpen) return <DeleteUserModal />;
  if (modals.isUpdateUserModalOpen) return <UpdateUserModal />;
  if (modals.isCreateBoardModalOpen) return <CreateBoardModal />;
  if (modals.isDeleteBoardModalOpen) return <DeleteBoardModal />;
  if (modals.isDetailsBoardModalOpen) return <BoardDetailsModal />;
  if (modals.isCreateTaskModalOpen) return <CreateTaskModal />;
  if (modals.isDetailsTaskModalOpen) return <TaskDetailsModal />;
  if (modals.isDeleteTaskModalOpen) return <DeleteTaskModal />;

  return null;
}
