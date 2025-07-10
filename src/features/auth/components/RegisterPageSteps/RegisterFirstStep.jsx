import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineSync } from 'react-icons/ai';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { register } from '@features/user';
import { AnimatedError } from '@common/ui';
import { registerSchema } from '@features/user';
import { FormikCheckbox } from '@common/ui';
import { useRegisterStore } from '@features/auth';
import { Button } from '@common/ui/utilities/Button';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import TurnstileWidget from '@features/auth/components/TurnstileWidget';
import { showToast } from '@utils/toast';
import { GitHubAuthButton } from '@features/auth/components/GitHubAuthButton';

export function RegisterFirstStep() {
  const setStep = useRegisterStore((state) => state.setStep);
  const passwordVisible = useRegisterStore((state) => state.passwordVisible);
  const togglePasswordVisible = useRegisterStore(
    (state) => state.togglePasswordVisible,
  );
  const [load, setLoad] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleCheckCaptcha = (token) => {
    setCaptchaToken(token);
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, transform: 'translateX(50px)' }}
      animate={{ opacity: 1, transform: 'translateX(0)' }}
      exit={{ opacity: 0, transform: 'translateX(-50px)' }}
    >
      <motion.h2
        initial={{ opacity: 0, transform: 'translateX(50px)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
        className="text-3xl sm:text-7xl"
      >
        Шаг 1/3
      </motion.h2>
      <Formik
        validationSchema={registerSchema}
        initialValues={{
          login: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptedPolicies: false,
        }}
        onSubmit={async (values) => {
          if (!captchaToken && process.env.NODE_ENV === 'production') {
            showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
            return;
          }
          try {
            setLoad(true);

            const success = await register(values, captchaToken);

            if (success) {
              setCaptchaToken(null);
              setCaptchaKey((prev) => prev + 1);
              setStep(2);
            }
          } catch (error) {
            console.error('Ошибка регистрации:', error);
          } finally {
            setLoad(false);
          }
        }}
      >
        {({ handleChange, handleBlur }) => {
          return (
            <>
              <Form className="sm:grid mt-2 sm:mt-6 flex flex-col gap-4 p-8 px-4 sm:px-8 rounded-2xl border-2 bg-surface border-[var(--main-primary)] shadow-glow transition-colors">
                <h2 className="col-span-2 text-3xl">Регистрация</h2>

                <div className="flex flex-col md:flex-row col-span-2 gap-3">
                  <GoogleAuthButton
                    btnText="Войти через Google"
                    googleLoad={googleLoad}
                    setGoogleLoad={setGoogleLoad}
                    disabled={load || googleLoad}
                    captchaToken={captchaToken}
                  />
                  <GitHubAuthButton
                    nextPath="/dashboard"
                    captchaToken={captchaToken}
                  />
                </div>

                <div className="col-span-2 relative bg-[var(--main-text)] w-full h-[1px] my-2">
                  <p className="absolute top-[-14px] left-1/2 -translate-x-1/2 px-2 bg-surface">
                    Или
                  </p>
                </div>

                <div className="relative">
                  <Field
                    type="text"
                    name="login"
                    id="login"
                    autoComplete="username"
                    placeholder=" "
                    required
                    className="peer input-styles input-primary !pr-8"
                    disabled={load || googleLoad}
                  />
                  <label
                    htmlFor="login"
                    className="label-styles !bg-[var(--main-surface)]"
                  >
                    Введите логин
                  </label>
                  <ErrorMessage name="login">
                    {(msg) => <AnimatedError msg={msg} variant="register" />}
                  </ErrorMessage>
                </div>

                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    placeholder=" "
                    required
                    className="peer input-styles input-primary !pr-8"
                    disabled={load || googleLoad}
                  />
                  <label
                    htmlFor="email"
                    className="label-styles !bg-[var(--main-surface)]"
                  >
                    Введите почту
                  </label>

                  <ErrorMessage name="email">
                    {(msg) => <AnimatedError msg={msg} variant="register" />}
                  </ErrorMessage>
                </div>

                <div className="relative">
                  <Field
                    type={!passwordVisible ? 'password' : 'text'}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    onBlur={handleBlur}
                    className="peer input-styles input-primary !pr-8"
                    disabled={load || googleLoad}
                  />
                  <label
                    htmlFor="password"
                    className="label-styles !bg-[var(--main-surface)]"
                  >
                    Введите пароль
                  </label>
                  <div
                    className="absolute right-1 bottom-2.5 !p-2 cursor-pointer"
                    onClick={togglePasswordVisible}
                  >
                    {!passwordVisible ? (
                      <LuEyeClosed size={20} />
                    ) : (
                      <LuEye size={20} />
                    )}
                  </div>
                  <ErrorMessage name="password">
                    {(msg) => <AnimatedError msg={msg} variant="register" />}
                  </ErrorMessage>
                </div>

                <div className="relative">
                  <Field
                    type={!passwordVisible ? 'password' : 'text'}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    disabled={load || googleLoad}
                    className="peer input-styles input-primary !pr-8"
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="label-styles !bg-[var(--main-surface)]"
                  >
                    Подтвердите пароль
                  </label>
                  <ErrorMessage name="confirmPassword">
                    {(msg) => <AnimatedError msg={msg} variant="register" />}
                  </ErrorMessage>
                </div>

                <div className="text-[12px] sm:text-sm col-span-2">
                  <FormikCheckbox
                    name="acceptedPolicies"
                    id="acceptedPolicies"
                    className={`${load ? 'pointer-events-none' : ''}`}
                    label={
                      <>
                        Я принимаю{' '}
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                          to="/privacy"
                        >
                          политику конфиденциальности
                        </Link>{' '}
                        и{' '}
                        <Link
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                          to="/terms"
                        >
                          условия пользования
                        </Link>
                      </>
                    }
                  />
                  <ErrorMessage name="acceptedPolicies">
                    {(msg) => <AnimatedError msg={msg} centered />}
                  </ErrorMessage>
                </div>
                <TurnstileWidget
                  key={captchaKey}
                  onVerify={handleCheckCaptcha}
                  action="register"
                />
                <Button
                  className="col-span-2"
                  variant="primary"
                  type="submit"
                  disabled={load || googleLoad}
                >
                  {load ? (
                    <AiOutlineSync className="animate-spin" size={23} />
                  ) : (
                    <>Зарегистрироваться</>
                  )}
                </Button>
                <Link className="col-span-2 !w-fit mx-auto" to="/login">
                  Уже есть аккаунт?
                </Link>
              </Form>
            </>
          );
        }}
      </Formik>
    </motion.div>
  );
}
