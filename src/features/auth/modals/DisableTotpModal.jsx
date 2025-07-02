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
import { AiOutlineSync } from 'react-icons/ai';

import { useModalsStore } from '@store/modalsStore';
import {
  updateUser,
  confirmUpdate,
  updateSchema,
  UpdateForm,
  UpdateConfirmation,
  useUserStore,
} from '@features/user';

import { IoCheckmarkCircle } from 'react-icons/io5';
import { Button } from '@common/ui/utilities/Button';
import { verifySecret } from '@features/auth/api/verifySecret';
import { sendConfirmationCode } from '@features/auth/api/confirmCode';
import { disableTotp } from '@features/auth/api/disableTotp';
import { sendDisableTotpEmail } from '@features/auth/api/sendDisableTotpEmail';
import { useAuthStore } from '@features/auth/store';

export function DisableTotpModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [confirmationCode, setConfirmationCode] = useState('');

  const { isDisableTotpModalOpen, setIsDisableTotpModalOpen } = useModalsStore(
    useShallow((state) => ({
      isDisableTotpModalOpen: state.isDisableTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
    })),
  );

  const setTwoFactorEnabled = useAuthStore(
    (state) => state.setTwoFactorEnabled,
  );

  const handleClose = () => {
    setIsDisableTotpModalOpen(false);
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
        setTimeout(() => {
          setIsDisableTotpModalOpen(false);
          setTwoFactorEnabled(false);
        }, 4000);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition
      afterLeave={() => {
        setConfirmationCode('');
        setStep(1);
      }}
      appear
      show={isDisableTotpModalOpen}
      as={Fragment}
    >
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-none sm:backdrop-blur-sm" />
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
              <h2
                className={`text-3xl text-center mb-8 ${step === 3 && '!hidden'}`}
              >
                Отключение 2FA
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
                    <div
                      key="step1"
                      className="flex flex-col items-center gap-6 h-full justify-center"
                    >
                      <h2 className="text-center text-2xl sm:text-3xl mb-4">
                        Вы уверены что хотите отключить 2FA?
                      </h2>
                      <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
                        <Button
                          variant="primary"
                          disabled={load}
                          onClick={() => handleClose()}
                        >
                          Нет
                        </Button>
                        <Button
                          variant="primary"
                          className="order-[-1] md:order-1"
                          onClick={() => {
                            handleSendEmail();
                          }}
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
                      onClick={handleDisableTotp}
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
                      <p className="text-[20px]">Вы успешно отключили 2FA</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
