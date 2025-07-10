import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubAuth } from '@features/auth/api/github/connect/githubAuth';
import { useAuthStore } from '@features/auth/store';
import { showToast } from '@utils/toast';

export default function GitHubOAuthProvider() {
  const navigate = useNavigate();
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const stateRaw = params.get('state');

    if (!code || !stateRaw) {
      showToast('Ошибка OAuth: отсутствует code или state');
      return;
    }

    const [stateValue, nextPathRaw = '/dashboard'] = stateRaw.split('|');
    const nextPath =
      nextPathRaw && nextPathRaw.trim() !== '' ? nextPathRaw : '/dashboard';

    const storedState = sessionStorage.getItem('github_oauth_state');
    const [storedValue] = (storedState || '').split('|');

    if (stateValue !== storedValue) {
      showToast('Ошибка безопасности: некорректный state');
      return;
    }

    sessionStorage.removeItem('github_oauth_state');

    githubAuth(code)
      .then((res) => {
        if (!res) {
          throw new Error(
            'Сервер не вернул данные. Возможна ошибка авторизации',
          );
        }
        const { accessToken, csrfToken } = res;

        if (!accessToken || !csrfToken) {
          throw new Error('Некорректный ответ от сервера: отсутствуют токены');
        }

        setAccessToken(accessToken);
        setCsrfToken(csrfToken);
        showToast('Успешный вход через GitHub');
        navigate(nextPath, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        showToast('Не удалось войти через GitHub');
      });
  }, [navigate, setAccessToken, setCsrfToken]);

  return null;
}
