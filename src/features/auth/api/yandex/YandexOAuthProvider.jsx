import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { yandexAuth } from '@features/auth/api/yandex/connect/yandexAuth';
import { yandexConnect } from '@features/auth/api/yandex/connect/yandexConnect';
import { useAuthStore } from '@features/auth/store';
import { useUserStore } from '@features/user';
import { useModalsStore } from '@store/modalsStore';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

export default function YandexOAuthProvider() {
  const navigate = useNavigate();
  const didRun = useRef(false);

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken);

  const setIsConnectYandexModalOpen = useModalsStore(
    (state) => state.setIsConnectYandexModalOpen,
  );

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const stateRaw = params.get('state');

    if (!code || !stateRaw) {
      showToast('Ошибка OAuth: отсутствует code или state');
      return;
    }

    const [stateValue, nextPathRaw = '/dashboard', mode = 'auth'] =
      stateRaw.split('|');

    const nextPath =
      nextPathRaw && nextPathRaw.trim() !== '' ? nextPathRaw : '/dashboard';

    const storedState = sessionStorage.getItem('yandex_oauth_state');
    const storedCaptchaToken = sessionStorage.getItem('captchaToken');
    const [storedValue] = (storedState || '').split('|');

    if (!storedState || storedState === 'null') {
      showToast('Ошибка безопасности: отсутствует сохраненный state');
      return;
    }

    if (!storedState) {
      showToast('Ошибка безопасности: отсутствует сохраненный state');
      return;
    }

    if (stateRaw.trim() !== storedState.trim()) {
      showToast('Ошибка безопасности: повторите еще раз', 'error');
      return;
    }

    if (!storedCaptchaToken) {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }
    console.log('About to remove yandex_oauth_state and captchaToken from LS');

    sessionStorage.removeItem('yandex_oauth_state');
    sessionStorage.removeItem('captchaToken');

    const handler = mode === 'connect' ? yandexConnect : yandexAuth;

    handler(code, stateRaw, storedCaptchaToken)
      .then((res) => {
        if (!res) {
          throw new Error(
            'Сервер не вернул данные. Возможна ошибка авторизации',
          );
        }

        const { accessToken, csrfToken } = res;

        if (mode === 'auth') {
          if (!accessToken || !csrfToken) {
            throw new Error(
              'Некорректный ответ от сервера: отсутствуют токены',
            );
          }
          setAccessToken(accessToken);
          setCsrfToken(csrfToken);
          navigate(nextPath, { replace: true });
        } else if (mode === 'connect') {
          if (res.requireEmailConfirmed) {
            setIsConnectYandexModalOpen(true);
          } else {
            navigate(nextPath, { replace: true });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate, setAccessToken, setCsrfToken]);

  return (
    <div className="h-full flex-col flex items-center justify-center">
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
      <p className="text-4xl mt-4 animate-pulse">Пожалуйста подождите</p>
    </div>
  );
}
