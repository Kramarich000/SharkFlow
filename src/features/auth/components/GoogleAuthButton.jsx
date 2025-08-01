import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleAuth } from '@features/auth/api/google/connect/googleAuth';
import { useUserStore } from '@features/user';
import { useAuthStore } from '@features/auth/store';
import { showToast } from '@utils/toast';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@common/ui/utilities/Button';
import { useState } from 'react';
import { AiOutlineSync } from 'react-icons/ai';
import { useModalsStore } from '@store/modalsStore';
import { googleConnect } from '@features/auth/api/google/connect/googleConnect';
import { useShallow } from 'zustand/shallow';

export function GoogleAuthButton({
  btnText = '',
  className = '',
  isAuth = true,
  isNavigated = true,
  googleLoad,
  setGoogleLoad,
  captchaToken,
  disabled,
}) {
  const navigate = useNavigate();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken);

  const setIsConnectGoogleModalOpen = useModalsStore(
    (state) => state.setIsConnectGoogleModalOpen,
  );

  const login = useGoogleLogin({
    flow: 'auth-code',
    scope: 'openid profile email',
    redirect_uri: 'postmessage',
    onError: () => showToast('Ошибка входа через Google'),
    onSuccess: async (codeResponse) => {
      setGoogleLoad(true);
      try {
        const { code } = codeResponse;
        if (!code) {
          showToast('Не удалось получить код от Google');
          return;
        }

        const response = isAuth
          ? await googleAuth(code, captchaToken)
          : await googleConnect(code);

        const result = response?.data ?? response;

        if (result.accessToken) {
          setAccessToken(result.accessToken);
          setCsrfToken(result.csrfToken);
          if (isNavigated) navigate('/dashboard');
        } else if (result.requireEmailConfirmed) {
          setIsConnectGoogleModalOpen(true);
        } else {
          showToast('Сервер не вернул токен');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setGoogleLoad(false);
      }
    },
  });

  const handleClick = () => {
    if (!captchaToken && process.env.NODE_ENV === 'production' && isAuth) {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }

    login();
  };

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      className={className}
      type="button"
      disabled={disabled}
    >
      {/* {googleLoad ? (
        <AiOutlineSync size={23} className="animate-spin" />
      ) : (
        <>
          <FcGoogle size={20} className="!bg-white !rounded-full" />
          {btnText || 'Google'}
        </>
      )} */}

      <>
        <FcGoogle size={20} className="!bg-white !rounded-full" />
        {btnText || 'Google'}
      </>
    </Button>
  );
}
