import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubAuth } from '@features/auth/api/github/connect/githubAuth';
import { githubConnect } from '@features/auth/api/github/connect/githubConnect';
import { useAuthStore } from '@features/auth/store';
import { useUserStore } from '@features/user';
import { useModalsStore } from '@store/modalsStore';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/shallow';

export default function GitHubOAuthProvider() {
  const navigate = useNavigate();

  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));

  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setCsrfToken = useAuthStore((state) => state.setCsrfToken);

  const setIsConnectGithubModalOpen = useModalsStore(
    (state) => state.setIsConnectGithubModalOpen,
  );

  useEffect(() => {
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

    const storedState = sessionStorage.getItem('github_oauth_state');
    const storedCaptchaToken = sessionStorage.getItem('captchaToken');
    const [storedValue] = (storedState || '').split('|');

    if (stateValue !== storedValue) {
      showToast('Ошибка безопасности: некорректный state', 'error');
      return;
    }

    if (!storedCaptchaToken) {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }

    sessionStorage.removeItem('github_oauth_state');
    sessionStorage.removeItem('captchaToken');

    const handler = mode === 'connect' ? githubConnect : githubAuth;

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
            setIsConnectGithubModalOpen(true);
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
