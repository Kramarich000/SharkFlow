import { Button } from '@common/ui/utilities/Button';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useModalsStore } from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import { MdManageAccounts } from 'react-icons/md';
import { MdPhonelink } from 'react-icons/md';
import { motion } from 'framer-motion';
import { UserProfileData } from '@features/user';

export const AccountSettings = () => {
  const {
    setIsDeleteUserModalOpen,
    setIsUpdateUserModalOpen,
    setIsUserSessionsModalOpen,
    isUserSessionsModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDeleteUserModalOpen: state.setIsDeleteUserModalOpen,
      setIsUpdateUserModalOpen: state.setIsUpdateUserModalOpen,
      setIsUserSessionsModalOpen: state.setIsUserSessionsModalOpen,
      isUserSessionsModalOpen: state.isUserSessionsModalOpen,
    })),
  );

  return (
    <div className="p-8">
      <div className="flex items-center gap-5 mb-4">
        <MdManageAccounts size={36} />
        <h2 className="text-2xl font-bold">Управление аккаунтом</h2>
      </div>
      <p className="text-base mb-6 text-[var(--main-text-muted)]">
        Здесь вы можете изменить данные аккаунта, удалить его или просмотреть
        активные сессии
      </p>
      <UserProfileData />
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-between h-full items-end">
        <Button
          variant="primary"
          onClick={() => setIsUpdateUserModalOpen(true)}
          className="!flex !flex-col"
        >
          <FaPen size={20} /> Изменить данные
        </Button>
        <Button
          variant="primary"
          className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
          onClick={() => setIsDeleteUserModalOpen(true)}
        >
          <FaTrash size={20} /> Удалить аккаунт
        </Button>
        <Button
          variant="primary"
          className="!flex !flex-col !"
          onClick={() => setIsUserSessionsModalOpen(true)}
          disabled={isUserSessionsModalOpen}
        >
          <MdPhonelink size={20} /> Просмотреть активные сессии
        </Button>{' '}
      </div>
    </div>
  );
};
