import { Fragment, useState, useEffect } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { showToast } from '@utils/toast';

import { useModalsStore } from '@store/modalsStore';

import { IoClose } from 'react-icons/io5';
import { Button } from '@common/ui/utilities/Button';
import { getTelegramLink } from '@features/auth/api/telegram/getTelegramLink';
import { QrCode } from '@utils/totp/QrCode';
import { AiOutlineSync } from 'react-icons/ai';

export function ConnectTelegramModal() {
  const [load, setLoad] = useState(false);
  const [link, setLink] = useState(null);

  const { isConnectTelegramModalOpen, setIsConnectTelegramModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isConnectTelegramModalOpen: state.isConnectTelegramModalOpen,
        setIsConnectTelegramModalOpen: state.setIsConnectTelegramModalOpen,
      })),
    );

  const handleClose = () => {
    setIsConnectTelegramModalOpen(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await getTelegramLink();
        if (mounted) {
          setLink(response.link);
          console.log(response);
        }
      } catch (error) {
        if (mounted) {
          console.error('Ошибка при получении ссылки:', error);
        }
      }
    };

    if (isConnectTelegramModalOpen) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [isConnectTelegramModalOpen]);

  return (
    <Transition appear show={isConnectTelegramModalOpen} as={Fragment}>
      <Dialog
        onClose={() => {}}
        as="div"
        className="relative z-50"
        static={true}
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
              {link && (
                <h2 className="text-3xl text-center mb-8">
                  Перейдите по ссылке или сканируйте QR-код штатной камерой
                  телефона
                </h2>
              )}
              <button
                title="Закрыть"
                className="!transition !text-[var(--main-text)] absolute top-0 right-0 justify-center px-4 py-2 text-sm hover:!text-[var(--main-primary-hover)]"
                onClick={() => handleClose()}
                disabled={load}
              >
                <IoClose size={40} />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key="step-motion"
                  initial={{
                    opacity: 0,
                    transform: 'translateX(50px)',
                  }}
                  className="flex flex-col gap-3"
                  animate={{ opacity: 1, transform: 'translateX(0px)' }}
                  exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="relative w-full flex flex-col gap-3">
                    {!link ? (
                      <div className="h-full mt-4 mb-4 flex-col flex items-center justify-center">
                        <div
                          key="loader"
                          className="text-7xl flex gap-8 text-center animate-spin"
                        >
                          <AiOutlineSync />
                        </div>
                        <p className="text-4xl mt-4 animate-pulse text-center">
                          Обработка запроса
                        </p>
                      </div>
                    ) : (
                      <>
                        <QrCode value={link} />
                        <Button variant="primary" className="!border-0 !text-[16px]" asChild>
                          <a
                            href={link}
                            variant="primary"
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Открыть в Telegram
                          </a>
                        </Button>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
