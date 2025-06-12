import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginSchema } from '@validators/loginSchema';
import AnimatedError from '@components/main-components/AnimatedError';
import loginHandler from '@api/http/loginHandler';
import uploadingUserDataHandle from '@api/http/uploadingUserDataHandle';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuEye } from 'react-icons/lu';
import { LuEyeClosed } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const formikRef = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-full flex-col flex items-center justify-center">
      <AnimatePresence mode="wait">
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
              const successfullyLogged = await loginHandler(values);
              if (successfullyLogged) {
                await uploadingUserDataHandle();
                navigate('/dashboard');
              }
            }}
          >
            {({ handleChange, handleBlur }) => {
              return (
                <>
                  <Form className="flex flex-col sm:grid grid-cols-2 gap-6 bg-[#fff] border-b-4 border-[#111111] p-8 rounded-2xl">
                    <h2 className="sm:col-span-2 text-3xl">Вход</h2>

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
                        className="peer w-full p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
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

                    <div className="flex col-span-2 justify-center items-center text-sm">
                      <Field
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="p-4 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[8px] rounded-b-[0px] focus:rounded-[8px] transition-all"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-left">
                        Запомнить меня
                      </label>
                    </div>

                    <button className="primary-btn sm:col-span-2" type="submit">
                      Войти
                    </button>
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
      </AnimatePresence>
    </div>
  );
}
