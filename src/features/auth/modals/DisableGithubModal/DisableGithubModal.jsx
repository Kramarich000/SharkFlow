import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import { sendDisableGithubEmail, disableGithub } from '@features/auth/api';
import { ModalBase } from '@common/ui/layout/ModalBase';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

export function DisableGithubModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);

  const { isDisableGithubModalOpen, setIsDisableGithubModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isDisableGithubModalOpen: state.isDisableGithubModalOpen,
        setIsDisableGithubModalOpen: state.setIsDisableGithubModalOpen,
      })),
    );

  const handleClose = () => {
    setIsDisableGithubModalOpen(false);
    setTimeout(() => {
      setConfirmationCode('');
      setStep(1);
    }, 300);
  };

  const handleSendEmail = async () => {
    setLoad(true);
    try {
      const success = await sendDisableGithubEmail();
      if (success) {
        setStep(2);
        setLoad(false);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  const handleDisableGithub = async () => {
    setLoad(true);
    try {
      const res = await disableGithub(confirmationCode);
      if (res) {
        setStep(3);
        updateUser({ githubOAuthEnabled: false, githubEmail: null });
        setTimeout(() => {
          setIsDisableGithubModalOpen(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase
      open={isDisableGithubModalOpen}
      onClose={handleClose}
      maxWidth="max-w-xl"
      disableOverlayClose={true}
    >
      <h2 className={`text-3xl text-center mb-8 ${step === 3 && '!hidden'}`}>
        Отключение Github
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
              onSubmit={handleDisableGithub}
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
