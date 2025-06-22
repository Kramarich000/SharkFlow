import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import { logoutUser } from 'features/auth/api/logoutUser';

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
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full border-2 max-w-xl h-full transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <h2 className="text-center text-3xl mb-4">
                  Вы уверены что хотите выйти?
                </h2>
                <div className="flex items-center flex-col sm:flex-row justify-between gap-6">
                  <button
                    className={`primary-btn items-center justify-center flex ${load ? '!bg-gray-600 pointer-events-none' : null}`}
                    onClick={() => logoutUserHandler()}
                    disabled={load}
                  >
                    {load ? (
                      <AiOutlineSync className="animate-spin" size={24} />
                    ) : (
                      <>Да</>
                    )}
                  </button>
                  <button
                    className={`primary-btn ${load ? 'pointer-events-none' : null}`}
                    disabled={load}
                    onClick={() => setIsLogoutUserModalOpen(false)}
                  >
                    Нет
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
