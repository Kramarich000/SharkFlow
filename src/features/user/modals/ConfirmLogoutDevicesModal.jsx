import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { logoutUserDevice } from '@features/auth/api/logout/logoutUserDevice';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';

export function ConfirmLogoutDevicesModal() {
  const [load, setLoad] = useState(false);
  const isConfirmLogoutDevicesModalOpen = useModalsStore(
    (state) => state.isConfirmLogoutDevicesModalOpen,
  );
  const setIsConfirmLogoutDevicesModalOpen = useModalsStore(
    (state) => state.setIsConfirmLogoutDevicesModalOpen,
  );

  const logoutDevicesHandler = async () => {
    setLoad(true);
    try {
      await logoutUserDevice();
      setIsConfirmLogoutDevicesModalOpen(false);
    } catch (error) {
      console.error('Ошибка при логауте:', error);
    } finally {
      setLoad(false);
    }
  };

  const handleClose = () => {
    if (!load) {
      setIsConfirmLogoutDevicesModalOpen(false);
    }
  };

  return (
    <ModalBase open={isConfirmLogoutDevicesModalOpen} onClose={handleClose}>
      <h2 className="text-center text-3xl mb-4">
        Вы уверены что хотите выйти со всех устройств?
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          className="order-0 sm:order-1 !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
          onClick={() => logoutDevicesHandler()}
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
          onClick={() => setIsConfirmLogoutDevicesModalOpen(false)}
        >
          Нет
        </Button>
      </div>
    </ModalBase>
  );
}
