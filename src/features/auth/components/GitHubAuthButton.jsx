import React from 'react';
import { Button } from '@common/ui/utilities/Button';
import { AiFillGithub } from 'react-icons/ai';

function generateRandomState(length = 16) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function GitHubAuthButton({ captchaToken }) {
  const handleClick = () => {
    const clientId = import.meta.env.VITE_CLIENT_GITHUB_ID;
    const redirectUri = window.location.origin;
    const scope = 'read:user user:email';

    const state = generateRandomState();
    sessionStorage.setItem('github_oauth_state', state);

    if (captchaToken) {
      sessionStorage.setItem('captchaToken', captchaToken);
    }

    window.location.href =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${state}`;
  };

  return (
    <Button onClick={handleClick} variant="primary" type="button">
      <AiFillGithub size={20} /> Войти через GitHub
    </Button>
  );
}
