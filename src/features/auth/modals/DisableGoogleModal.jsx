import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import { UpdateForm, UpdateConfirmation, useUserStore } from '@features/user';

import { IoCheckmarkCircle } from 'react-icons/io5';
import { Button } from '@common/ui/utilities/Button';
import { sendDisableGoogleEmail, disableGoogle } from '@features/auth/api';
import { ModalBase } from '@common/ui/feedback/ModalBase';

export function DisableGoogleModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');
  const updateUser = useUserStore((state) => state.updateUser);

  const { isDisableGoogleModalOpen, setIsDisableGoogleModalOpen } =
    useModalsStore(
      useShallow((state) => ({
        isDisableGoogleModalOpen: state.isDisableGoogleModalOpen,
        setIsDisableGoogleModalOpen: state.setIsDisableGoogleModalOpen,
      })),
    );

  const handleClose = () => {
    setIsDisableGoogleModalOpen(false);
    setTimeout(() => {
      setConfirmationCode('');
      setStep(1);
    }, 300);
  };

  const handleSendEmail = async () => {
    setLoad(true);
    try {
      const success = await sendDisableGoogleEmail();
      if (success) {
        setStep(2);
        setLoad(false);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  const handleDisableGoogle = async () => {
    setLoad(true);
    try {
      const res = await disableGoogle(confirmationCode);
      if (res) {
        setStep(3);
        updateUser({ googleOAuthEnabled: false, googleEmail: null });
        setTimeout(() => {
          setIsDisableGoogleModalOpen(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalBase open={isDisableGoogleModalOpen} onClose={handleClose} maxWidth="max-w-xl">
      <h2 className={`text-3xl text-center mb-8 ${step === 3 && '!hidden'}`}>Отключение Google</h2>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1-motion"
            initial={{ opacity: 1, transform: 'translateX(0px)' }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              key="step1"
              className="flex flex-col items-center gap-6 h-full justify-center"
            >
              <h2 className="text-center text-2xl sm:text-3xl mb-4">
                Вы уверены что хотите отключить Google авторизацию?
              </h2>
              <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                <Button
                  variant="primary"
                  disabled={load}
                  onClick={handleClose}
                >
                  Нет
                </Button>
                <Button
                  variant="primary"
                  className="order-[-1] md:order-1"
                  onClick={handleSendEmail}
                  disabled={load}
                >
                  {load ? (
                    <AiOutlineSync className="animate-spin" size={23} />
                  ) : (
                    <>Да, отправить код на почту</>
                  )}
                </Button>
              </div>
            </div>
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
              onClick={handleDisableGoogle}
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
        {step === 3 && (
          <motion.div
            key="step3-motion"
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
              <p className="text-[20px]">Вы успешно отключили Google</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalBase>
  );
}
