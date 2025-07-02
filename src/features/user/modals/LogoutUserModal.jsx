import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { logoutUser } from '@features/auth';
import { Button } from '@common/ui/utilities/Button';

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

  return (
    <Transition appear show={isLogoutUserModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (!load) {
            setIsLogoutUserModalOpen(false);
          }
        }}
        static={load}
      >
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <DialogPanel className="modal-base w-full border-2 max-w-xl transform overflow-hidden relative rounded-2xl p-6 text-left align-middle shadow-xl !transition-all">
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
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
