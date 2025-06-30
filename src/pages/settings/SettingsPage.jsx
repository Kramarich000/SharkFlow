import { useState, useEffect } from 'react';
import { useModalsStore } from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { getUser } from '@features/user';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth';
import { ToggleTheme } from '@features/user/components/ToggleTheme';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const setIsDeleteUserModalOpen = useModalsStore(
    (state) => state.setIsDeleteUserModalOpen,
  );

  const setIsUpdateUserModalOpen = useModalsStore(
    (state) => state.setIsUpdateUserModalOpen,
  );

  const user = useUserStore((state) => state.user);

  const token = useAuthStore((state) => state.accessToken);

  const role = useAuthStore((state) => state.userRole);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-0 sm:p-10 lg:p-30 lg:px-50 h-full">
      {/* <p>роль: {role}</p> */}
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
      ) : role === 'guest' ? (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <div>
            <p className="text-4xl mb-4">Гостевой аккаунт</p>
            <p className="text-xl">
              Это гостевой аккаунт, войдите или зарегистрируйтесь в течении 24
              часов чтобы сохранить данные
            </p>
          </div>
          <ToggleTheme />
        </div>
      ) : (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <div className="">
            <p className="text-xl sm:text-2xl">Логин: {user?.login}</p>
            <p className="text-xl sm:text-2xl">Почта: {user?.email}</p>
          </div>
          <div className="">
            <button
              className="btn-primary mb-4"
              onClick={() => setIsUpdateUserModalOpen(true)}
            >
              Изменить данные
            </button>
            <button
              className="btn-primary"
              onClick={() => setIsDeleteUserModalOpen(true)}
            >
              Удалить аккаунт
            </button>
          </div>
          <ToggleTheme />
        </div>
      )}
    </div>
  );
}
