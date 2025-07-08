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
import { LoginStep2 } from '../../features/auth/components/LoginPageSteps/LoginStep2';

export default function LoginPage() {
  const formikRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [guestLoad, setGuestLoad] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [totpLoad, setTotpLoad] = useState(false);
  const [step, setStep] = useState('login');
  const [totpCode, setTotpCode] = useState('');
  const [sessionKey, setSessionKey] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const createGuest = async () => {
    if (!captchaToken && process.env.NODE_ENV === 'production') {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }
    try {
      setGuestLoad(true);
      const success = await guestLogin(captchaToken);
      if (success) {
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
        setGuestLoad(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGuestLoad(false);
    }
  };

  const handleLoginUser = async (values) => {
    if (!captchaToken && process.env.NODE_ENV === 'production') {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }
    setLoad(true);
    try {
      const success = await login(values, captchaToken);
      if (success && success?.accessToken) {
        setCaptchaToken(null);
        const sck = setCaptchaKey((prev) => prev + 1);
        console.info('sck', sck);
        setLoading(true);
        navigate('/dashboard');
        await getUser();
      } else if (success && success?.sessionKey) {
        setSessionKey(success.sessionKey);
        setStep('twoFactor');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoad(false);
    }
  };

  const handleLoginUserAfter2FA = async () => {
    setTotpLoad(true);
    try {
      const success = await checkTwoFactor(totpCode, sessionKey);
      if (success) {
        setLoading(true);
        navigate('/dashboard');
        await getUser();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTotpLoad(false);
    }
  };

  const handleCheckCaptcha = (token) => {
   const sct = setCaptchaToken(token);
   console.info('sct', sct)
  };

  return (
    <div className="h-full flex-col flex items-center justify-center py-15">
      <AnimatePresence mode="wait">
        {loading ? (
          <>
            <motion.div
              key="loader"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'linear',
              }}
              className="text-7xl flex gap-8 text-center"
            >
              <AiOutlineSync />
            </motion.div>
            <p className="text-4xl mt-4 animate-pulse">Вход в аккаунт</p>
          </>
        ) : step === 'login' ? (
          <motion.div
            key="login"
            className="w-full sm:w-auto"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <LoginStep1
              formikRef={formikRef}
              loginSchema={loginSchema}
              handleLoginUser={handleLoginUser}
              passwordVisible={passwordVisible}
              setPasswordVisible={setPasswordVisible}
              guestLoad={guestLoad}
              load={load}
              googleLoad={googleLoad}
              totpLoad={totpLoad}
              createGuest={createGuest}
              setGoogleLoad={setGoogleLoad}
              captchaKey={captchaKey}
              handleCheckCaptcha={handleCheckCaptcha}
            />
          </motion.div>
        ) : step === 'twoFactor' ? (
          <motion.div
            key="twoFactor"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <LoginStep2
              totpCode={totpCode}
              setTotpCode={setTotpCode}
              handleLoginUserAfter2FA={handleLoginUserAfter2FA}
              guestLoad={guestLoad}
              load={load}
              googleLoad={googleLoad}
              totpLoad={totpLoad}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
