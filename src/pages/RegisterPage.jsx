import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '@validators/registerSchema';
import AnimatedError from '@components/main-components/AnimatedError';
import registerHandler from '@api/http/register/registerHandler';
import confirmCodeHandler from '@api/http/user/confirmCodeHandler';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { LuEye } from 'react-icons/lu';
import { LuEyeClosed } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { FormikCheckbox } from '@components/main-components/FormikCheckbox';

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
                acceptedPolicies: '',
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
                    <Form className="sm:grid flex flex-col gap-4 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
                      <h2 className="col-span-2 text-3xl">Регистрация</h2>

                      <div className="relative">
                        <Field
                          type="text"
                          name="login"
                          id="login"
                          autoComplete="username"
                          placeholder=" "
                          required
                          className="peer input-styles"
                        />
                        <label htmlFor="login" className="label-styles">
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
                          className="peer input-styles"
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
                          autoComplete="new-password"
                          placeholder=" "
                          required
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                          className="input-styles"
                        />
                        <label htmlFor="password" className="label-styles">
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
                          className="peer input-styles"
                        />
                        <label
                          htmlFor="confirmPassword"
                          className="label-styles"
                        >
                          Подтвердите пароль
                        </label>
                        <ErrorMessage name="confirmPassword">
                          {(msg) => (
                            <AnimatedError msg={msg} variant="register" />
                          )}
                        </ErrorMessage>
                      </div>

                      <div className="text-sm col-span-2">
                        <FormikCheckbox
                          name="acceptedPolicies"
                          id="acceptedPolicies"
                          label={
                            <>
                              Я согласен(-на) с{' '}
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
                            </>
                          }
                        />
                        <ErrorMessage name="acceptedPolicies">
                          {(msg) => <AnimatedError msg={msg} centered />}
                        </ErrorMessage>
                      </div>

                      <button className="primary-btn col-span-2" type="submit">
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
                const success = confirmCodeHandler(values);
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
                      className="peer input-styles"
                      placeholder=" "
                    />
                    <label htmlFor="confirmationCode" className="label-styles">
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
