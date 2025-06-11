import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '@validators/registerSchema';
import AnimatedError from '@components/main-components/AnimatedError';
import registerHandler from '@api/http/registerHandler';
import confirmCodeHandler from '@api/http/confirmCodeHandler';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { LuEye } from 'react-icons/lu';
import { LuEyeClosed } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (step === 3) {
      timer = setTimeout(() => {
        navigate('/login');
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [step, navigate]);

  return (
    <div className="h-full flex-col flex items-center justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <Formik
              innerRef={formikRef}
              validationSchema={registerSchema}
              initialValues={{
                login: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={async (values, actions) => {
                const success = await registerHandler(values);
                if (success) {
                  setStep(2);
                } else {
                  actions.setSubmitting(false);
                }
              }}
            >
              {({ handleChange, handleBlur }) => {
                return (
                  <>
                    <Form className="grid gap-8 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
                      <h2 className="sm:col-span-2 text-3xl">Регистрация</h2>

                      <div className="relative">
                        <Field
                          type="text"
                          name="login"
                          id="login"
                          autoComplete="username"
                          placeholder=" "
                          required
                          className="peer w-full p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                        />
                        <label
                          htmlFor="login"
                          className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                      peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                      peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-white px-1
                      peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
                        >
                          Введите логин
                        </label>
                        <ErrorMessage name="login">
                          {(msg) => (
                            <AnimatedError msg={msg} variant="register" />
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="relative">
                        <Field
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder=" "
                          required
                          className="peer w-full p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                        />
                        <label
                          htmlFor="email"
                          className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                        peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                        peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-white px-1
                        peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
                        >
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
                          autoComplete="new-password"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          className="peer w-full p-4 pr-8 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                        />
                        <label
                          htmlFor="password"
                          className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                            peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-white px-1
                            peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
                        >
                          Введите пароль
                        </label>
                        <div
                          className="absolute right-1 bottom-2 !p-2 cursor-pointer"
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

                      <div className="relative">
                        <Field
                          type={!passwordVisible ? 'password' : 'text'}
                          name="confirmPassword"
                          autoComplete="new-password"
                          placeholder=" "
                          required
                          className="peer w-full p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                        />
                        <label
                          htmlFor="confirmPassword"
                          className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                            peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-white px-1
                            peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
                        >
                          Подтвердите пароль
                        </label>
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <AnimatedError msg={msg} variant="register" />
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="flex items-center sm:justify-center text-sm sm:col-span-2">
                        <Field
                          type="checkbox"
                          id="acceptedPolicies"
                          name="acceptedPolicies"
                          className="p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                        />
                        <label
                          htmlFor="acceptedPolicies"
                          className="ml-2 text-left"
                        >
                          Я согласен с{' '}
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                            to="/privacy"
                          >
                            политикой конфиденциальности
                          </Link>{' '}
                          и{' '}
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                            to="/terms"
                          >
                            условиями пользования
                          </Link>
                        </label>
                      </div>

                      <button
                        className="primary-btn sm:col-span-2"
                        type="submit"
                      >
                        Зарегистрироваться
                      </button>
                      <Link className="col-span-2 text-blue-600" to="/login">
                        Уже есть аккаунт?
                      </Link>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <Formik
              initialValues={{ confirmationCode: '' }}
              onSubmit={async (values, actions) => {
                const success = await confirmCodeHandler(values);
                if (success) {
                  setStep(3);
                } else {
                  actions.setSubmitting(false);
                }
              }}
            >
              {() => (
                <Form className="grid gap-8 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
                  <h2 className="text-3xl">Код подтверждения</h2>
                  <div className="relative">
                    <Field
                      name="confirmationCode"
                      type="text"
                      id="confirmationCode"
                      required
                      className="peer w-full p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                      placeholder=" "
                    />
                    <label
                      htmlFor="confirmationCode"
                      className="absolute  pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-200
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                    peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-white px-1
                    peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
                    >
                      Введите код подтверждения
                    </label>
                    <ErrorMessage name="login">
                      {(msg) => <AnimatedError msg={msg} variant="register" />}
                    </ErrorMessage>
                    <ErrorMessage
                      name="confirmationCode"
                      component={AnimatedError}
                    />
                  </div>
                  <button className="primary-btn" type="submit">
                    Подтвердить
                  </button>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            animate={{ opacity: 1, transform: 'translateX(0)' }}
            exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <div className="bg-white p-12 rounded-2xl flex flex-col items-center justify-center gap-4">
              <IoIosCheckmarkCircle size={100} />
              <p className="text-[20px]">Вы успешно зарегистрировались</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
