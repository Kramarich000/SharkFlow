import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { AiOutlineSync } from 'react-icons/ai';
import { FormikCheckbox, AnimatedError } from '@common/ui';
import { Button } from '@common/ui/utilities/Button';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import TurnstileWidget from '@features/auth/components/TurnstileWidget';
import { GitHubAuthButton } from '@features/auth/components/GitHubAuthButton';

export function LoginStep1({
  formikRef,
  loginSchema,
  handleLoginUser,
  passwordVisible,
  setPasswordVisible,
  guestLoad,
  load,
  googleLoad,
  totpLoad,
  createGuest,
  setGoogleLoad,
  captchaKey,
  handleCheckCaptcha,
}) {
  return (
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
      {({ handleBlur }) => (
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
                {(msg) => <AnimatedError msg={msg} variant="register" />}
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
                {(msg) => <AnimatedError msg={msg} variant="register" />}
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

            <TurnstileWidget key={captchaKey} onVerify={handleCheckCaptcha} />
            <div className="flex flex-col col-span-2 item-center justify-center gap-3">
              <Button
                variant="primary"
                // className="sm:col-span-2"
                type="submit"
                disabled={guestLoad || load || googleLoad}
              >
                {load ? (
                  <AiOutlineSync size={23} className="animate-spin" />
                ) : (
                  <>Войти</>
                )}
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={createGuest}
                disabled={guestLoad || load || googleLoad || totpLoad}
              >
                {guestLoad ? (
                  <AiOutlineSync size={23} className="animate-spin" />
                ) : (
                  <>Войти как гость</>
                )}
              </Button>
            </div>
            <div className="flex flex-col md:flex-row col-span-2 item-center justify-center gap-3">
              <GoogleAuthButton
                btnText="Войти через Google"
                googleLoad={googleLoad}
                setGoogleLoad={setGoogleLoad}
                disabled={guestLoad || load || googleLoad || totpLoad}
              />
              <GitHubAuthButton nextPath="/dashboard" />
            </div>
            <Link className="text-blue-600" to="/register">
              Нет аккаунта?
            </Link>
            <Link className="text-blue-600" to="/reset-password">
              Забыли пароль?
            </Link>
          </Form>
        </>
      )}
    </Formik>
  );
}
