import LogoutUserModal from './user/LogoutUserModal';
import DeleteUserModal from './user/DeleteUserModal';
import UpdateUserModal from './user/UpdateUserModal';
import CreateBoardModal from '../dashboard-components/modals/CreateBoardModal';
import DeleteBoardModal from '../dashboard-components/modals/DeleteBoardModal';
import BoardDetailsModal from '../dashboard-components/modals/BoardDetailsModal';
import CreateTaskModal from '../dashboard-components/modals/CreateTaskModal';
import TaskDetailsModal from '../dashboard-components/modals/TaskDetailsModal';
import DeleteTaskModal from '../dashboard-components/modals/DeleteTaskModal';
import useModalsStore from '@store/modalsStore';

export default function ModalManager() {
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