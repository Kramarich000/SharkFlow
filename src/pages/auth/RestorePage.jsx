import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSync } from 'react-icons/ai';
import { loginSchema } from '@features/auth';
import { login, guestLogin } from '@features/auth';
import { getUser } from '@features/user';
import { checkTwoFactor } from '@features/auth/api/totp/verification/verificationTotp';
import { showToast } from '@utils/toast';
import { useNavigate } from 'react-router-dom';
import { LoginStep1 } from '../../features/auth/components/LoginPageSteps/LoginStep1';
import { Button, VerifyTotpStep } from '@common/ui';
import { UserHasBeenDeleted } from '@common/ui/utilities/UserHasBeenDeleted';
import { RestoredUserVerify } from '@common/ui/utilities/RestoredUserVerify';
import { restoreUserTotpVerify } from '@features/auth/api/restore/restoreUserTotpVerify';
import RestoredSuccess from '@features/auth/components/RestoredSuccess';
import { restoreSendEmail } from '@features/auth/api/restore/restoreSendEmail';

export default function RestorePage() {
  const [step, setStep] = useState('restoredUserInput');
  const [email, setEmail] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [deletedUserLogin, setDeletedUserLogin] = useState('');
  const [deletedUserEmail, setDeletedUserEmail] = useState('');
  const [deletedUserAvatar, setDeletedUserAvatar] = useState('');
  const [restoreKey, setRestoreKey] = useState('');
  const [load, setLoad] = useState(false);
  const [guestLoad, setGuestLoad] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [totpLoad, setTotpLoad] = useState(false);
  const [totpCode, setTotpCode] = useState('');

  const navigate = useNavigate();

  const handleSendEmail = async () => {
    const success = await restoreSendEmail(email);
    if (success) {
      setStep('restoredUserEmail');
      console.log(success);
      setDeletedUserEmail(success.maskedEmail);
      setRestoreKey(success.restoreKey);
    }
  };

  const handleRestoreUserAfter2FA = async () => {
    setTotpLoad(true);
    if (totpCode < 6) {
      showToast('Код должен состоять из 6 цифр');
      return;
    }

    try {
      const success = await restoreUserTotpVerify(totpCode, restoreKey);
      if (success) {
        setStep('restoredSuccess');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTotpLoad(false);
    }
  };

  return (
    <div className="h-full flex-col flex items-center justify-center">
      <div className="bg-surface p-15 rounded-4xl">
        {step === 'restoredUserInput' ? (
          <motion.div
            key="restoredUserInput"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              placeholder=" "
              required
              autoFocus
              className="peer input-styles input-primary"
            />

            <label
              htmlFor="email"
              className={`label-styles !bg-[var(--main-surface)] !transition-all`}
            >
              Введите почту
            </label>
            <Button variant="primary" onClick={() => handleSendEmail()}>
              Отправить
            </Button>
          </motion.div>
        ) : step === 'restoredUserEmail' ? (
          <motion.div
            key="restoredUserEmail"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <RestoredUserVerify
              deletedUserEmail={deletedUserEmail}
              setStep={setStep}
              restoreKey={restoreKey}
            />
          </motion.div>
        ) : step === 'restoredTotpVerify' ? (
          <motion.div
            key="restoredTotpVerify"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <VerifyTotpStep
              totpCode={totpCode}
              setTotpCode={setTotpCode}
              handleLoginUserAfter2FA={handleRestoreUserAfter2FA}
              guestLoad={guestLoad}
              load={load}
              googleLoad={googleLoad}
              totpLoad={totpLoad}
            />
          </motion.div>
        ) : step === 'restoredSuccess' ? (
          <motion.div
            key="restoredSuccess"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <RestoredSuccess />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
