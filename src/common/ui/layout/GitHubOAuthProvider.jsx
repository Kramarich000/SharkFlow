import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubAuth } from '@features/auth/api/github/connect/githubAuth';
import { useAuthStore } from '@features/auth/store';
import { showToast } from '@utils/toast';

export function GitHubOAuthProvider() {
  const navigate = useNavigate();
  const { setAccessToken, setCsrfToken } = useAuthStore.getState();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const returnedState = url.searchParams.get('state');
    const storedState = sessionStorage.getItem('github_oauth_state');

    if (code) {
      if (!returnedState || returnedState !== storedState) {
        showToast('Ошибка безопасности: некорректный state');
        return;
      }
      sessionStorage.removeItem('github_oauth_state');

      const captchaToken = sessionStorage.getItem('captchaToken');
      if (captchaToken) {
        sessionStorage.removeItem('captchaToken');
      }

      navigate(window.location.pathname, { replace: true });

      githubAuth(code, captchaToken)
        .then((res) => {
          const data = res.data;
          setAccessToken(data.accessToken);
          setCsrfToken(data.csrfToken);
          showToast('Успешный вход через GitHub');
          navigate('/dashboard');
        })
        .catch((err) => {
          console.error(err);
          showToast('Ошибка при входе через GitHub');
        });
    }
  }, []);

  return null;
}
