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

export function RegisterFirstStep() {
  const { setStep, passwordVisible, togglePasswordVisible } =
    useRegisterStore();
  const [load, setLoad] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);

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
          acceptedPolicies: '',
        }}
        onSubmit={async (values, actions) => {
          setLoad(true);
          const success = await register(values);
          if (success) {
            setStep(2);
            setLoad(false);
          } else {
            actions.setSubmitting(false);
            setLoad(false);
          }
        }}
      >
        {({ handleChange, handleBlur }) => {
          return (
            <>
              <Form className="sm:grid mt-4 sm:mt-12 flex flex-col gap-4 p-8 rounded-2xl border-2 bg-surface border-[var(--main-primary)] shadow-glow transition-colors">
                <h2 className="col-span-2 text-3xl">Регистрация</h2>

                <div className="relative">
                  <Field
                    type="text"
                    name="login"
                    id="login"
                    autoComplete="username"
                    placeholder=" "
                    required
                    className="peer input-styles input-primary"
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
                    className="peer input-styles input-primary"
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
                    className="peer input-styles input-primary"
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
                    className={`${load ? 'pointer-events-none' : null}`}
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
                <div className="col-span-2 w-full">
                  <GoogleAuthButton
                    btnText="Войти через Google"
                    googleLoad={googleLoad}
                    setGoogleLoad={setGoogleLoad}
                    disabled={load || googleLoad}
                  />
                </div>
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
