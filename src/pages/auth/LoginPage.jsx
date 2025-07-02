import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState, useRef } from 'react';
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
import { googleAuth } from '@features/auth/api/googleAuth';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';

export default function LoginPage() {
  const formikRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [guestLoad, setGuestLoad] = useState(false);

  const createGuest = async () => {
    try {
      setGuestLoad(true);
      await guestLogin();
      setGuestLoad(false);
    } catch (error) {
    } finally {
      setGuestLoad(false);
    }
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
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <Formik
              innerRef={formikRef}
              validationSchema={loginSchema}
              initialValues={{
                email: '',
                password: '',
                rememberMe: false,
              }}
              onSubmit={async (values) => {
                setLoad(true);
                try {
                  const successfullyLogged = await login(values);
                  if (successfullyLogged) {
                    await getUser();
                    navigate('/dashboard');
                    setLoading(true);
                  }
                } finally {
                  setLoading(false);
                  setLoad(false);
                }
              }}
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
                          onChange={(e) => {
                            handleChange(e);
                          }}
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

                      <Button
                        variant="primary"
                        className="sm:col-span-2"
                        type="submit"
                        disabled={load || guestLoad}
                      >
                        {load ? (
                          <AiOutlineSync size={23} className="animate-spin" />
                        ) : (
                          <>Войти</>
                        )}
                      </Button>
                      <div className="flex col-span-2 item-center justify-center gap-3">
                        <Button
                          variant="primary"
                          type="button"
                          onClick={() => {
                            createGuest();
                          }}
                          disabled={guestLoad || load}
                        >
                          {guestLoad || load ? (
                            <AiOutlineSync size={23} className="animate-spin" />
                          ) : (
                            <>Войти как гость</>
                          )}
                        </Button>
                        <GoogleAuthButton />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
