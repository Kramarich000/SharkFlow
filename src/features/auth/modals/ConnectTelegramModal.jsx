import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { showToast } from '@utils/toast';

import { useModalsStore } from '@store/modalsStore';

import { IoClose } from 'react-icons/io5';
import { Button } from '@common/ui/utilities/Button';
import { getTelegramLink } from '@features/auth/api/telegram/getTelegramLink';
import { QrCode } from '@utils/totp/QrCode';
import { AiOutlineSync } from 'react-icons/ai';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { useResponsive } from '@common/hooks';

export function ConnectTelegramModal() {
  const [load, setLoad] = useState(false);
  const [link, setLink] = useState(null);

  const { isMobile } = useResponsive();

  const { isConnectTelegramModalOpen, setIsConnectTelegramModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isConnectTelegramModalOpen: state.isConnectTelegramModalOpen,
        setIsConnectTelegramModalOpen: state.setIsConnectTelegramModalOpen,
      })),
    );

  const handleClose = () => {
    setIsConnectTelegramModalOpen(false);
    setTimeout(() => {
      setLink(null);
    }, 300);
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await getTelegramLink();
        if (mounted) {
          setLink(response.link);
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
    <ModalBase open={isConnectTelegramModalOpen} onClose={handleClose}>
      {link && (
        <h2 className="text-xl sm:text-3xl text-center mb-8">
          Перейдите по ссылке или сканируйте QR-код штатной камерой телефона
        </h2>
      )}
      {!isMobile && (
        <button
          title="Закрыть"
          className="!transition !text-[var(--main-text)] absolute top-0 right-0 justify-center px-4 py-2 text-sm hover:!text-[var(--main-primary-hover)]"
          onClick={handleClose}
          disabled={load}
        >
          <IoClose size={40} />
        </button>
      )}

      <AnimatePresence mode="wait">
        <div className="flex flex-col gap-3">
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
              <motion.div
                initial={{
                  opacity: 0,
                  transform: 'translateX(50px)',
                }}
                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                exit={{ opacity: 0, transform: 'translateX(-50px)' }}
              >
                <QrCode value={link} />
                <Button
                  variant="primary"
                  className="!border-0 !text-[16px]"
                  asChild
                >
                  <a
                    href={link}
                    variant="primary"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Открыть в Telegram
                  </a>
                </Button>
                {isMobile && (
                  <Button
                    className="!rounded-full"
                    variant="primary"
                    title="Закрыть"
                    onClick={handleClose}
                    disabled={load}
                  >
                    Закрыть
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </AnimatePresence>
    </ModalBase>
  );
}
