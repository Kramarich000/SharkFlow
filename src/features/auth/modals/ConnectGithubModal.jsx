import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { IoCopy, IoCheckmarkCircle, IoClose } from 'react-icons/io5';

import { useModalsStore } from '@store/modalsStore';
import {
  updateUser,
  confirmUpdate,
  updateSchema,
  UpdateForm,
  UpdateConfirmation,
  useUserStore,
} from '@features/user';

import { Button } from '@common/ui/utilities/Button';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { githubVerify } from '@features/auth/api/github/connect/githubVerify';
import { ModalBase } from '@common/ui/layout/ModalBase';

export function ConnectGithubModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');

  const { isConnectGithubModalOpen, setIsConnectGithubModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isConnectGithubModalOpen: state.isConnectGithubModalOpen,
        setIsConnectGithubModalOpen: state.setIsConnectGithubModalOpen,
      })),
    );

  const updateUser = useUserStore((state) => state.updateUser);

  const handleClose = () => {
    setIsConnectGithubModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setConfirmationCode('');
    }, 300);
  };

  const handleSendConfirmationCode = async () => {
    setLoad(true);
    try {
      const success = await githubVerify(confirmationCode);
      if (success) {
        setStep(2);
        updateUser({ githubOAuthEnabled: true });
        setTimeout(() => {
          setIsConnectGithubModalOpen(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase
      open={isConnectGithubModalOpen}
      onClose={handleClose}
      maxWidth="max-w-xl"
    >
      <h2 className={`text-3xl text-center mb-8 ${step === 4 && '!hidden'}`}>
        Подтверждение привязки Github
      </h2>
      <button
        title="Закрыть"
        className="!transition !text-[var(--main-text)] absolute top-0 right-0 justify-center px-4 py-2 text-sm hover:!text-[var(--main-primary-hover)]"
        onClick={handleClose}
        disabled={load}
      >
        <IoClose size={40} />
      </button>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1-motion"
            initial={{
              opacity: 0,
              transform: 'translateX(50px)',
            }}
            className="flex flex-col gap-3"
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="relative w-full">
              <input
                className="peer input-styles input-primary"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                placeholder=" "
                required
                maxLength={6}
              />
              <label className="label-styles !bg-[var(--main-modal-bg)]">
                Введите код подтверждения из почты
              </label>
            </div>
            <Button
              variant="primary"
              onClick={handleSendConfirmationCode}
              disabled={load}
            >
              {load ? (
                <AiOutlineSync size={23} className="animate-spin" />
              ) : (
                <>Отправить</>
              )}
            </Button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2-motion"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <div
              className={`p-12 border-2 border-[var(--main-primary)] text-center rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow ${
                step === 3 ? 'mt-0' : 'mt-8'
              }`}
            >
              <IoCheckmarkCircle
                size={100}
                className="text-[var(--main-primary)]"
              />
              <p className="text-[20px]">Вы успешно подключили Github</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalBase>
  );
}
