import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { AiOutlineSync } from 'react-icons/ai';
import { FormikCheckbox, AnimatedError } from '@common/ui';
import { Button } from '@common/ui/utilities/Button';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import TurnstileWidget from '@features/auth/components/TurnstileWidget';
import { GitHubAuthButton } from '@features/auth/components/GitHubAuthButton';
import { YandexAuthButton } from '@features/auth/components/YandexAuthButton';

export function LoginStep1({
  formikRef,
  loginSchema,
  handleLoginUser,
  passwordVisible,
  setPasswordVisible,
  guestLoad,
  load,
  googleLoad,
  githubLoad,
  setGithubLoad,
  yandexLoad,
  setYandexLoad,
  totpLoad,
  createGuest,
  setGoogleLoad,
  captchaKey,
  handleCheckCaptcha,
  captchaToken,
}) {
  const isDisabled =
    guestLoad || load || googleLoad || totpLoad || githubLoad || yandexLoad;
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
          <Form className="flex flex-col sm:grid grid-cols-2 gap-6 p-8 rounded-2xl bg-surface border-2 border-[var(--main-primary)] shadow-glow">
            <h2 className="sm:col-span-2 text-3xl">Вход</h2>
            <div className="flex flex-col justify-center items-center md:flex-row col-span-2 gap-3">
              <p>Войти с помощью:</p>
              <div className="flex items-center justify-center flex-wrap gap-3">
                <GoogleAuthButton
                  btnText="Google"
                  className="!w-fit !p-1 !m-0"
                  googleLoad={googleLoad}
                  setGoogleLoad={setGoogleLoad}
                  captchaToken={captchaToken}
                  disabled={isDisabled}
                />
                <GitHubAuthButton
                  mode="auth"
                  btnText="Github"
                  className="!w-fit !p-1 !m-0"
                  nextPath="/dashboard"
                  githubLoad={githubLoad}
                  setGithubLoad={setGithubLoad}
                  captchaToken={captchaToken}
                  disabled={isDisabled}
                />
                <YandexAuthButton
                  mode="auth"
                  btnText="Yandex"
                  className="!w-fit !p-1 !m-0"
                  nextPath="/dashboard"
                  yandexLoad={yandexLoad}
                  setYandexLoad={setYandexLoad}
                  captchaToken={captchaToken}
                  disabled={isDisabled}
                />
              </div>
            </div>
            <div className="col-span-2 relative bg-[var(--main-text)] w-full h-[1px] my-2">
              <p className="absolute top-[-14px] left-1/2 -translate-x-1/2 px-2 bg-surface">
                или
              </p>
            </div>

            <div className="relative">
              <Field
                type="email"
                name="email"
                autoComplete="email"
                placeholder=" "
                required
                autoFocus
                className="peer input-styles input-primary"
                disabled={isDisabled}
              />
              <label
                htmlFor="email"
                className={`label-styles !bg-[var(--main-surface)] !transition-all ${isDisabled ? 'opacity-60 cursor-not-allowed select-none' : ''}`}
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
                autoComplete="password"
                placeholder=" "
                required
                onBlur={handleBlur}
                className="peer input-styles input-primary !pr-8"
                disabled={isDisabled}
              />
              <label
                htmlFor="password"
                className={`label-styles !bg-[var(--main-surface)] !transition-all ${isDisabled ? 'opacity-60 cursor-not-allowed select-none' : ''}`}
              >
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

            <div className="col-span-2 text-sm flex items-center justify-center">
              <FormikCheckbox
                name="rememberMe"
                id="rememberMe"
                label="Запомнить меня"
                className={`${isDisabled ? 'pointer-events-none' : ''}`}
                disabled={isDisabled}
              />
            </div>

            {process.env.NODE_ENV !== 'development' && (
              <TurnstileWidget
                key={captchaKey}
                onVerify={handleCheckCaptcha}
                action="login"
                disabled={isDisabled}
              />
            )}
            <div className="flex flex-col col-span-2 item-center justify-center gap-1">
              <Button
                variant="primary"
                // className="sm:col-span-2"
                type="submit"
                disabled={isDisabled}
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
                disabled={isDisabled}
              >
                {guestLoad ? (
                  <AiOutlineSync size={23} className="animate-spin" />
                ) : (
                  <>Войти как гость</>
                )}
              </Button>
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
