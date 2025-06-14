import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginSchema } from '@validators/loginSchema';
import AnimatedError from '@components/main-components/AnimatedError';
import loginHandler from '@api/http/login/loginHandler';
import uploadingUserDataHandle from '@api/http/user/uploadingUserDataHandle';
import { FormikCheckbox } from '@components/main-components/FormikCheckbox';
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
                        autoComplete="password"
                        placeholder=" "
                        autoFocus
                        required
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className="peer input-styles"
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

                    <div className="flex col-span-2 justify-center items-center text-sm">
                      <FormikCheckbox
                        name="rememberMe"
                        id="rememberMe"
                        label="Запомнить меня"
                      />
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
