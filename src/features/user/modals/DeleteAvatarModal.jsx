import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import {
  UpdateForm,
  UpdateConfirmation,
  useUserStore,
  deleteAvatar,
} from '@features/user';

import { IoCheckmarkCircle } from 'react-icons/io5';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/feedback/ModalBase';

export function DeleteAvatarModal() {
  const [load, setLoad] = useState(false);

  const { isDeleteAvatarModalOpen, setIsDeleteAvatarModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isDeleteAvatarModalOpen: state.isDeleteAvatarModalOpen,
        setIsDeleteAvatarModalOpen: state.setIsDeleteAvatarModalOpen,
      })),
    );

  const updateUser = useUserStore((state) => state.updateUser);
  const handleClose = () => {
    setIsDeleteAvatarModalOpen(false);
  };

  const DeleteAvatarHandler = async () => {
    try {
      setLoad(true);
      await deleteAvatar();
      updateUser({ avatarUrl: null });
      handleClose();
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase open={isDeleteAvatarModalOpen} onClose={handleClose}>
      <h2 className="text-3xl text-center mb-8">Обновление данных</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key="step-motion"
          initial={{ opacity: 1, transform: 'translateX(0px)' }}
          animate={{ opacity: 1, transform: 'translateX(0px)' }}
          exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <h2 className="text-center text-2xl sm:text-3xl mb-4">
            Вы уверены что хотите удалить фото профиля?
          </h2>
          <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
            <Button
              variant="primary"
              disabled={load}
              onClick={() => handleClose()}
            >
              Нет
            </Button>
            <Button
              variant="primary"
              className="order-[-1] md:order-1"
              onClick={() => {
                DeleteAvatarHandler();
              }}
              disabled={load}
            >
              {load ? (
                <AiOutlineSync className="animate-spin" size={23} />
              ) : (
                <>Да</>
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </ModalBase>
  );
}
