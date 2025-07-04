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
import { IoCopy } from 'react-icons/io5';

import { useModalsStore } from '@store/modalsStore';
import {
  updateUser,
  confirmUpdate,
  updateSchema,
  UpdateForm,
  UpdateConfirmation,
  useUserStore,
} from '@features/user';

import { IoCheckmarkCircle, IoClose } from 'react-icons/io5';
import { generateSecret } from '@features/auth/api/totp/setup/createSecret';
import { Button } from '@common/ui/utilities/Button';
import { verifySecret } from '@features/auth/api/totp/setup/verifySecret';
import { sendEmail } from '@features/auth/api/totp/setup/sendEmail';
import { useAuthStore } from '@features/auth/store';
import { confirmCodeSchema } from '@validators/confirmCodeSchema';
import { QrCode } from '@utils/totp/QrCode';

export function SetupTotpModal() {
  const [load, setLoad] = useState(false);
  const [step, setStep] = useState(1);
  const [totpCode, setTotpCode] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');

  const { isSetupTotpModalOpen, setIsSetupTotpModalOpen } = useModalsStore(
    useShallow((state) => ({
      isSetupTotpModalOpen: state.isSetupTotpModalOpen,
      setIsSetupTotpModalOpen: state.setIsSetupTotpModalOpen,
    })),
  );

  const updateUser = useUserStore((state) => state.updateUser);

  const handleClose = () => {
    setIsSetupTotpModalOpen(false);
  };

  const handleSendEmail = async () => {
    setLoad(true);
    try {
      const success = await sendEmail();
      if (success) {
        setStep(2);
        setLoad(false);
      }
    } catch (error) {
    } finally {
      setLoad(false);
    }
  };

  const handleGenerateSecret = async () => {
    setLoad(true);
    try {
      const res = await generateSecret(confirmationCode);
      if (res) {
        setStep(3);
        setQrCode(res.otpauthUrl);
        setSecret(res.secret);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const copySecretToClipboard = () => {
    if (!secret) return;
    navigator.clipboard.writeText(secret).then(() => {
      showToast('Секретный код скопирован в буфер обмена');
    });
  };

  const handleVerifySecret = async () => {
    setLoad(true);
    try {
      const success = await verifySecret(totpCode);
      if (success) {
        setStep(4);
        updateUser({ twoFactorEnabled: true });
        setTimeout(() => {
          setIsSetupTotpModalOpen(false);
        }, 4000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition
      afterLeave={() => {
        setTotpCode('');
        setStep(1);
        setQrCode('');
        setSecret('');
        setConfirmationCode('');
      }}
      appear
      show={isSetupTotpModalOpen}
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
              <h2
                className={`text-3xl text-center mb-8 ${step === 4 && '!hidden'}`}
              >
                Подключение 2FA
              </h2>

              <button
                title="Закрыть"
                className="!transition !text-[var(--main-text)] absolute top-0 right-0 justify-center px-4 py-2 text-sm hover:!text-[var(--main-primary-hover)]"
                onClick={() => handleClose()}
                disabled={load}
              >
                <IoClose size={40} />
              </button>
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
                        Вы уверены что хотите подключить 2FA?
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
                            <>Да</>
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
                      onClick={handleGenerateSecret}
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
                    key="step2-motion"
                    initial={{
                      opacity: 0,
                      transform: 'translateX(50px)',
                    }}
                    className="flex flex-col gap-5"
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    exit={{ opacity: 0, transform: 'translateX(-50px)' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <QrCode value={qrCode} />
                    <div className="flex items-center w-full justify-center gap-2 mt-2 select-all cursor-pointer">
                      <code
                        onClick={copySecretToClipboard}
                        className="text-lg text-center font-mono p-2 break-all rounded cursor-pointer select-all border-2 border-[var(--main-primary)] hover:bg-[var(--main-primary)] !text-[var(--main-text)] hover:!text-[var(--main-button-text)] !transition-colors"
                        title="Кликните, чтобы скопировать"
                        aria-label="Скопировать секрет в буфер обмена"
                      >
                        {secret}
                      </code>
                      <Button
                        onClick={copySecretToClipboard}
                        variant="tertiary"
                        className="p-2 rounded !bg-transparent hover:!bg-transparent group"
                        aria-label="Скопировать секретный код"
                      >
                        <IoCopy
                          size={24}
                          className="text-[var(--main-text)] group-hover:text-[var(--main-primary)] !transition-colors"
                        />
                      </Button>
                    </div>
                    <div className="relative w-full">
                      <input
                        className="peer input-styles input-primary"
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        placeholder=" "
                        required
                      />
                      <label className="label-styles !bg-[var(--main-modal-bg)]">
                        Введите код из приложения
                      </label>
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleVerifySecret}
                      disabled={load}
                    >
                      {load ? (
                        <AiOutlineSync size={23} className="animate-spin" />
                      ) : (
                        <>Подтвердить</>
                      )}
                    </Button>
                  </motion.div>
                )}
                {step === 4 && (
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
                      <p className="text-[20px]">Вы успешно подключили 2FA</p>
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
