import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import { disableTotp } from '@features/auth/api/totp/disable/disableTotp';
import { sendDisableTotpEmail } from '@features/auth/api/totp/disable/sendDisableTotpEmail';
import { ModalBase } from '@common/ui/feedback/ModalBase';
import { Step1 } from './DisableTotpModal/Step1';
import { Step2 } from './DisableTotpModal/Step2';
import { Step3 } from './DisableTotpModal/Step3';

export function DisableTotpModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);

  const { isDisableTotpModalOpen, setIsDisableTotpModalOpen } = useModalsStore(
    useShallow((state) => ({
      isDisableTotpModalOpen: state.isDisableTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
    })),
  );

  const handleClose = () => {
    setIsDisableTotpModalOpen(false);
    setTimeout(() => {
      setConfirmationCode('');
      setStep(1);
    }, 300);
  };

  const handleSendEmail = async () => {
    setLoad(true);
    try {
      const success = await sendDisableTotpEmail();
      if (success) {
        setStep(2);
        setLoad(false);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  const handleDisableTotp = async () => {
    setLoad(true);
    try {
      const res = await disableTotp(confirmationCode);
      if (res) {
        setStep(3);
        updateUser({ twoFactorEnabled: false });
        setTimeout(() => {
          setIsDisableTotpModalOpen(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase open={isDisableTotpModalOpen} onClose={handleClose} maxWidth="max-w-xl" disableOverlayClose={true}>
      <h2 className={`text-3xl text-center mb-8 ${step === 3 && '!hidden'}`}>Отключение 2FA</h2>
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
              onChange={e => setConfirmationCode(e.target.value)}
              onSubmit={handleDisableTotp}
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
