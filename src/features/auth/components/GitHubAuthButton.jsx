import React from 'react';
import { Button } from '@common/ui/utilities/Button';
import { AiFillGithub } from 'react-icons/ai';

export function GitHubAuthButton({ captchaToken }) {
  const handleClick = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = window.location.origin + window.location.pathname;
    const scope = 'read:user user:email';
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

    if (captchaToken) {
      sessionStorage.setItem('captchaToken', captchaToken);
    }

    window.location.href = githubUrl;
  };

  return (
    <Button onClick={handleClick} variant="primary" type="button">
      <AiFillGithub size={20} /> Войти через GitHub
    </Button>
  );
}
