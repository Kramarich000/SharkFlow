import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import { generateSecret } from '@features/auth/api/totp/setup/createSecret';
import { Button } from '@common/ui/utilities/Button';
import { verifySecret } from '@features/auth/api/totp/setup/verifySecret';
import { sendEmail } from '@features/auth/api/totp/setup/sendEmail';
import { ModalBase } from '@common/ui/feedback/ModalBase';
import { Step1 } from './SetupTotpModal/Step1';
import { Step2 } from './SetupTotpModal/Step2';
import { Step3 } from './SetupTotpModal/Step3';
import { Step4 } from './SetupTotpModal/Step4';

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
    setTimeout(() => {
      setTotpCode('');
      setStep(1);
      setQrCode('');
      setSecret('');
      setConfirmationCode('');
    }, 300);
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
    <ModalBase open={isSetupTotpModalOpen} onClose={handleClose} maxWidth="max-w-xl">
      <h2 className={`text-3xl text-center mb-8 ${step === 4 && '!hidden'}`}>Подключение 2FA</h2>
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
              onSubmit={handleGenerateSecret}
            />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3-motion"
            initial={{
              opacity: 0,
              transform: 'translateX(50px)',
            }}
            className="flex flex-col gap-5"
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Step3
              loading={load}
              qrCode={qrCode}
              secret={secret}
              totpCode={totpCode}
              onTotpChange={e => setTotpCode(e.target.value)}
              onCopySecret={copySecretToClipboard}
              onSubmit={handleVerifySecret}
            />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4-motion"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <Step4 step={step} />
          </motion.div>
        )}
      </AnimatePresence>
    </ModalBase>
  );
}
