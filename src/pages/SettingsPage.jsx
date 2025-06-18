import useModalsStore from '@store/modalsStore';
import DeleteUserModal from '@components/main-components/user/DeleteUserModal';
import UpdateUserModal from '@components/main-components/user/UpdateUserModal';
import { useState, useEffect } from 'react';
import { getUser } from '@api/http/user/get/getUser';
import useUserStore from '@store/userStore';
import { AiOutlineSync } from 'react-icons/ai';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );

  const setIsUpdateUserModalOpen = useModalsStore(
    (state) => state.setIsUpdateUserModalOpen,
  );

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-30 px-70  h-full">
      {loading ? (
        <div className="flex items-center h-full w-full justify-center gap-4">
          <AiOutlineSync className="text-5xl animate-spin" />
          <p className="text-4xl animate-pulse">Загрузка вашего аккаунта</p>
        </div>
      ) : (
        <div className="flex gap-8 items-center justify-center flex-col p-4 bg-white rounded-3xl h-full">
          <div className="">
            <p className="text-2xl">Логин: {user?.login}</p>
            <p className="text-2xl">Почта: {user?.email}</p>
          </div>
          <div className="">
            <button
              className="primary-btn mb-4"
              onClick={() => setIsUpdateUserModalOpen(true)}
            >
              Изменить данные
            </button>
            <button
              className="primary-btn !bg-red-700 hover:!bg-red-800"
              onClick={() => setIsDeleteUserModalOpen(true)}
            >
              Удалить аккаунт
            </button>
          </div>
          <DeleteUserModal />
          <UpdateUserModal />
        </div>
      )}
    </div>
  );
}
