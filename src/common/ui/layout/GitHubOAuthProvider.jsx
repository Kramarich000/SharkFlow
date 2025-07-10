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

    if (code) {
      navigate(window.location.pathname, { replace: true });

      const captchaToken = sessionStorage.getItem('captchaToken');
      if (captchaToken) {
        sessionStorage.removeItem('captchaToken');
      }

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
