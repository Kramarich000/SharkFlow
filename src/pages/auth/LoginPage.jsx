import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSync } from 'react-icons/ai';

import { loginSchema } from '@features/auth';
import { login } from '@features/auth';
import { guestLogin } from '@features/auth';
import { getUser } from '@features/user';
import { FormikCheckbox, AnimatedError } from '@common/ui';
import { Button } from '@common/ui/utilities/Button';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import { checkTwoFactor } from '@features/auth/api/totp/verification/verificationTotp';
import TurnstileWidget from '@features/auth/components/TurnstileWidget';

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
    if (!captchaToken) {
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
      console.log(error);
    } finally {
      setGuestLoad(false);
    }
  };

  const handleLoginUser = async (values) => {
    if (!captchaToken) {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }
    setLoad(true);
    try {
      const success = await login(values, captchaToken);
      if (success.accessToken) {
        setCaptchaToken(null);
        setCaptchaKey((prev) => prev + 1);
        setLoading(true);
        navigate('/dashboard');
        await getUser();
      } else {
        setSessionKey(success.sessionKey);
        setStep('twoFactor');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoad(false);
    }
  };

  const handleLoginUserAfter2FA = async (values) => {
    setTotpLoad(true);
    try {
      const success = await checkTwoFactor(totpCode, sessionKey);
      if (success) {
        setLoading(true);
        navigate('/dashboard');
        await getUser();
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setTotpLoad(false);
    }
  };

  const handleCheckCaptcha = (token) => {
    console.log('Токен капчи:', token);
    setCaptchaToken(token);
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
        ) : (
          <motion.div
            key="login"
            className="w-full sm:w-auto"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            {step === 'login' && (
              <Formik
                innerRef={formikRef}
                validationSchema={loginSchema}
                initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
                }}
                onSubmit={handleLoginUser}
              >
                {({ handleChange, handleBlur }) => {
                  return (
                    <>
                      <Form className="flex flex-col sm:grid grid-cols-2 gap-6 p-8 rounded-2xl border-2 border-[var(--main-primary)] shadow-glow">
                        <h2 className="sm:col-span-2 text-3xl">Вход</h2>

                        <div className="relative">
                          <Field
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder=" "
                            required
                            autoFocus
                            className="peer input-styles input-primary"
                          />
                          <label htmlFor="email" className="label-styles">
                            Введите почту
                          </label>

                          <ErrorMessage name="email">
                            {(msg) => (
                              <AnimatedError msg={msg} variant="register" />
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="relative">
                          <Field
                            type={!passwordVisible ? 'password' : 'text'}
                            name="password"
                            autoComplete="password"
                            placeholder=" "
                            autoFocus
                            required
                            onBlur={handleBlur}
                            className="peer input-styles input-primary !pr-8"
                          />
                          <label htmlFor="password" className="label-styles">
                            Введите пароль
                          </label>
                          <div
                            className="absolute right-1 bottom-2.5 !p-2 cursor-pointer"
                            onClick={() => {
                              setPasswordVisible(!passwordVisible);
                            }}
                          >
                            {!passwordVisible ? (
                              <LuEyeClosed size={20} />
                            ) : (
                              <LuEye size={20} />
                            )}
                          </div>
                          <ErrorMessage name="password">
                            {(msg) => (
                              <AnimatedError msg={msg} variant="register" />
                            )}
                          </ErrorMessage>
                        </div>

                        <div className="col-span-2 text-sm">
                          <FormikCheckbox
                            name="rememberMe"
                            id="rememberMe"
                            label="Запомнить меня"
                            className="relative"
                          />
                        </div>

                        <TurnstileWidget
                          action="login"
                          key={captchaKey}
                          onSuccess={handleCheckCaptcha}
                        />

                        <Button
                          variant="primary"
                          className="sm:col-span-2"
                          type="submit"
                          disabled={guestLoad || load || googleLoad}
                        >
                          {load ? (
                            <AiOutlineSync size={23} className="animate-spin" />
                          ) : (
                            <>Войти</>
                          )}
                        </Button>
                        <div className="flex flex-col md:flex-row col-span-2 item-center justify-center gap-3">
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                              createGuest();
                            }}
                            disabled={
                              guestLoad || load || googleLoad || totpLoad
                            }
                          >
                            {guestLoad ? (
                              <AiOutlineSync
                                size={23}
                                className="animate-spin"
                              />
                            ) : (
                              <>Войти как гость</>
                            )}
                          </Button>
                          <GoogleAuthButton
                            btnText="Войти через Google"
                            googleLoad={googleLoad}
                            setGoogleLoad={setGoogleLoad}
                            disabled={
                              guestLoad || load || googleLoad || totpLoad
                            }
                          />
                        </div>
                        <Link className="text-blue-600" to="/register">
                          Нет аккаунта?
                        </Link>
                        <Link className="text-blue-600" to="/reset-password">
                          Забыли пароль?
                        </Link>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            )}
          </motion.div>
        )}
        {step === 'twoFactor' && (
          <motion.div
            key="twoFactor"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <div className="flex flex-col gap-4 mt-6">
              <div className="relative">
                <input
                  type="text"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  className="peer input-styles input-primary"
                  autoFocus
                  placeholder=" "
                />

                <label className="label-styles">
                  Введите код из приложения
                </label>
              </div>

              <Button
                variant="primary"
                onClick={handleLoginUserAfter2FA}
                disabled={guestLoad || load || googleLoad || totpLoad}
              >
                {totpLoad ? (
                  <AiOutlineSync size={23} className="animate-spin" />
                ) : (
                  <>Отправить</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
