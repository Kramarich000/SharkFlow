import useModalsStore from '@store/modalsStore';
import DeleteUserModal from '@components/main-components/user/DeleteUserModal';
import UpdateUserModal from '@components/main-components/user/UpdateUserModal';
import { useState, useEffect } from 'react';
import { getUser } from '@api/http/user/get/getUser';
import useUserStore from '@store/userStore';
import { AiOutlineSync } from 'react-icons/ai';
import { motion } from 'framer-motion';

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
    <div className="p-4 sm:p-10 lg:p-30 lg:px-50 h-full">
      {loading ? (
        <div className="h-full flex-col flex items-center justify-center">
          <motion.div
            key="loader"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'linear',
            }}
            className="text-7xl flex gap-8 text-center"
          >
            <AiOutlineSync />
          </motion.div>
          <p className="text-4xl mt-4 animate-pulse">Загрузка ваших данных</p>
        </div>
      ) : (
        <div className="flex gap-8 items-center justify-center flex-col p-4 bg-white rounded-3xl h-full">
          <div className="">
            <p className="text-xl sm:text-2xl">Логин: {user?.login}</p>
            <p className="text-xl sm:text-2xl">Почта: {user?.email}</p>
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
