import useModalsStore from '@store/modalsStore';
import DeleteUserModal from '@components/main-components/user/DeleteUserModal';

export default function SettingsPage() {
  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );
  return (
    <>
      <button onClick={() => setIsDeleteUserModalOpen(true)}>
        Удалить аккаунт
      </button>
      <DeleteUserModal />
    </>
  );
}
