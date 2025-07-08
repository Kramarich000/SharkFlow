import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { logoutUser } from '@features/auth';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/feedback/ModalBase';

export function LogoutUserModal() {
  const [load, setLoad] = useState(false);
  const isLogoutUserModalOpen = useModalsStore(
    (state) => state.isLogoutUserModalOpen,
  );
  const setIsLogoutUserModalOpen = useModalsStore(
    (state) => state.setIsLogoutUserModalOpen,
  );

  const logoutUserHandler = async () => {
    setLoad(true);
    try {
      await logoutUser();
      setIsLogoutUserModalOpen(false);
    } catch (error) {
      console.error('Ошибка при логауте:', error);
    } finally {
      setLoad(false);
    }
  };

  const handleClose = () => {
    if (!load) {
      setIsLogoutUserModalOpen(false);
    }
  };

  return (
    <ModalBase open={isLogoutUserModalOpen} onClose={handleClose}>
      <h2 className="text-center text-3xl mb-4">
        Вы уверены что хотите выйти?
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          className="order-0 sm:order-1"
          onClick={() => logoutUserHandler()}
          disabled={load}
        >
          {load ? (
            <AiOutlineSync className="animate-spin" size={23} />
          ) : (
            <>Да</>
          )}
        </Button>
        <Button
          variant="primary"
          disabled={load}
          onClick={() => setIsLogoutUserModalOpen(false)}
        >
          Нет
        </Button>
      </div>
    </ModalBase>
  );
}
