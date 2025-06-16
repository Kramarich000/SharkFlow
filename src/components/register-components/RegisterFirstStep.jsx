import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '@validators/registerSchema';
import AnimatedError from '@components/main-components/AnimatedError';
import registerHandler from '@api/http/register/registerHandler';
import { motion } from 'framer-motion';
import { LuEye } from 'react-icons/lu';
import { LuEyeClosed } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { FormikCheckbox } from '@components/main-components/checkbox/FormikCheckbox';
import { useRegisterStore } from '@store/registerStore';
import { useRef, useState } from 'react';
import { AiOutlineSync } from 'react-icons/ai';

export default function RegisterFirstStep() {
  const { setStep, passwordVisible, togglePasswordVisible } =
    useRegisterStore();
  const [load, setLoad] = useState(false);

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
        className="text-7xl"
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
          const success = await registerHandler(values);
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
              <Form className="sm:grid mt-12 flex flex-col gap-4 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
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
                    disabled={load}
                  />
                  <label htmlFor="login" className="label-styles">
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
                    autoComplete="email"
                    placeholder=" "
                    required
                    className="peer input-styles"
                    disabled={load}
                  />
                  <label htmlFor="email" className="label-styles">
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
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    className="peer input-styles !pr-8"
                    disabled={load}
                  />
                  <label htmlFor="password" className="label-styles">
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
                    autoComplete="new-password"
                    placeholder=" "
                    required
                    disabled={load}
                    className="peer input-styles"
                  />
                  <label htmlFor="confirmPassword" className="label-styles">
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
                      </>
                    }
                  />
                  <ErrorMessage name="acceptedPolicies">
                    {(msg) => <AnimatedError msg={msg} centered />}
                  </ErrorMessage>
                </div>

                <button
                  className={`primary-btn flex items-center justify-center col-span-2 ${load ? '!bg-gray-600' : null}`}
                  type="submit"
                  disabled={load}
                >
                  {load ? (
                    <AiOutlineSync className="animate-spin" size={24} />
                  ) : (
                    <>Зарегистрироваться</>
                  )}
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
  );
}
