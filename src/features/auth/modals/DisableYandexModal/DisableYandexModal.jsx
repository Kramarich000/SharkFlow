import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import { sendDisableYandexEmail } from '@features/auth/api/yandex/disable/sendDisableYandex';
import { disableYandex } from '@features/auth/api/yandex/disable/disableYandex';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

export function DisableYandexModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);

  const { isDisableYandexModalOpen, setIsDisableYandexModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isDisableYandexModalOpen: state.isDisableYandexModalOpen,
        setIsDisableYandexModalOpen: state.setIsDisableYandexModalOpen,
      })),
    );

  const handleClose = () => {
    setIsDisableYandexModalOpen(false);
    setTimeout(() => {
      setConfirmationCode('');
      setStep(1);
    }, 300);
  };

  const handleSendEmail = async () => {
    setLoad(true);
    try {
      const success = await sendDisableYandexEmail();
      if (success) {
        setStep(2);
        setLoad(false);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  const handleDisableYandex = async () => {
    setLoad(true);
    try {
      const res = await disableYandex(confirmationCode);
      if (res) {
        setStep(3);
        updateUser({ yandexOAuthEnabled: false, yandexEmail: null });
        setTimeout(() => {
          setIsDisableYandexModalOpen(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase
      open={isDisableYandexModalOpen}
      onClose={handleClose}
      maxWidth="max-w-xl"
      disableOverlayClose={true}
    >
      <h2 className={`text-3xl text-center mb-8 ${step === 3 && '!hidden'}`}>
        Отключение Yandex
      </h2>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1-motion"
            initial={{ opacity: 1, transform: 'translateX(0px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Step1 loading={load} onNo={handleClose} onYes={handleSendEmail} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2-motion"
            initial={{
              opacity: 0,
              transform: 'translateX(50px)',
            }}
            className="flex flex-col gap-3"
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Step2
              loading={load}
              confirmationCode={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              onSubmit={handleDisableYandex}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3-motion"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <Step3 />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalBase>
  );
}
