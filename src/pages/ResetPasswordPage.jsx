import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineSync } from 'react-icons/ai';
import AnimatedError from '@components/main-components/AnimatedError';
import {
  resetRequest,
  resetVerifyCode,
  resetSetNewPassword,
} from '@api/http/password';
import {
  passwordResetEmailSchema,
  passwordResetCodeSchema,
  passwordResetNewPasswordSchema,
} from '@validators/passwordResetSchema';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async ({ email }) => {
    setLoading(true);
    setServerError('');
    try {
      await resetRequest(email);
      setEmail(email);
      setStep(2);
    } catch (err) {
      setServerError(
        err?.response?.data?.error || 'Ошибка при отправке письма',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async ({ code }) => {
    setLoading(true);
    setServerError('');
    try {
      await resetVerifyCode(email, code);
      setStep(3);
    } catch (err) {
      setServerError(err?.response?.data?.error || 'Неверный код');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async ({ password, confirmPassword }) => {
    setLoading(true);
    setServerError('');
    try {
      await resetSetNewPassword(email, password);
      navigate('/login');
    } catch (err) {
      setServerError(
        err?.response?.data?.error || 'Не удалось обновить пароль',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex-col flex items-center justify-center py-15">
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, transform: 'translateX(50px)' }}
          animate={{ opacity: 1, transform: 'translateX(0)' }}
          exit={{ opacity: 0, transform: 'translateX(-50px)' }}
          className="w-full max-w-md"
        >
          {serverError && <p className="text-red-600 mb-4">{serverError}</p>}

          {step === 1 && (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={passwordResetEmailSchema}
              onSubmit={handleEmailSubmit}
            >
              <Form className="flex flex-col gap-6 bg-white border-b-4 border-black p-8 rounded-2xl">
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    placeholder=" "
                    className="peer input-styles"
                    required
                  />
                  <label htmlFor="email" className="label-styles">
                    Почта
                  </label>
                  <ErrorMessage name="email" component={AnimatedError} />
                </div>

                <button
                  type="submit"
                  className="primary-btn flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineSync className="animate-spin" />
                  ) : (
                    'Отправить код'
                  )}
                </button>
              </Form>
            </Formik>
          )}

          {step === 2 && (
            <Formik
              initialValues={{ code: '' }}
              validationSchema={passwordResetCodeSchema}
              onSubmit={handleCodeSubmit}
            >
              <Form className="flex flex-col gap-6 bg-white border-b-4 border-black p-8 rounded-2xl">
                <div className="relative">
                  <Field
                    type="text"
                    name="code"
                    placeholder=" "
                    className="peer input-styles"
                    required
                  />
                  <label htmlFor="code" className="label-styles">
                    Код из письма
                  </label>
                  <ErrorMessage name="code" component={AnimatedError} />
                </div>

                <button
                  type="submit"
                  className="primary-btn flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineSync className="animate-spin" />
                  ) : (
                    'Проверить код'
                  )}
                </button>
              </Form>
            </Formik>
          )}

          {step === 3 && (
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validationSchema={passwordResetNewPasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              <Form className="flex flex-col gap-6 bg-white border-b-4 border-black p-8 rounded-2xl">
                <div className="relative">
                  <Field
                    type="password"
                    name="password"
                    placeholder=" "
                    className="peer input-styles"
                    required
                  />
                  <label htmlFor="password" className="label-styles">
                    Новый пароль
                  </label>
                  <ErrorMessage name="password" component={AnimatedError} />
                </div>

                <div className="relative">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder=" "
                    className="peer input-styles"
                    required
                  />
                  <label htmlFor="confirmPassword" className="label-styles">
                    Подтвердите пароль
                  </label>
                  <ErrorMessage
                    name="confirmPassword"
                    component={AnimatedError}
                  />
                </div>

                <button
                  type="submit"
                  className="primary-btn flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineSync className="animate-spin" />
                  ) : (
                    'Сменить пароль'
                  )}
                </button>
              </Form>
            </Formik>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
