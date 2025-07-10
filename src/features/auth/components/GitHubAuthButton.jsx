import React from 'react';
import { Button } from '@common/ui/utilities/Button';
import { AiFillGithub } from 'react-icons/ai';
import { showToast } from '@utils/toast';

function generateRandomState(length = 16) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function GitHubAuthButton({ nextPath = '/dashboard', captchaToken }) {
  const handleClick = () => {
    if (!captchaToken && process.env.NODE_ENV === 'production') {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }
    const clientId = import.meta.env.VITE_CLIENT_GITHUB_ID;
    const redirectUri = `${window.location.origin}/oauth/github/callback`;
    const scope = 'read:user user:email';

    const randomState = generateRandomState();
    const fullState = `${randomState}|${nextPath}`;
    sessionStorage.setItem('github_oauth_state', fullState);
    sessionStorage.setItem('captchaToken', captchaToken);

    const githubUrl =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${encodeURIComponent(fullState)}`;

    window.location.href = githubUrl;
  };

  return (
    <Button onClick={handleClick} variant="primary" type="button">
      <AiFillGithub size={20} /> Войти через GitHub
    </Button>
  );
}
