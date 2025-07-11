import React from 'react';
import { Button } from '@common/ui/utilities/Button';
import { AiFillGithub } from 'react-icons/ai';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { generateSecureRandomState } from '@utils/generators/generateRandomState';

export function GitHubAuthButton({
  mode = 'auth',
  nextPath = '/dashboard',
  captchaToken,
  githubLoad,
  setGithubLoad,
  btnText,
  disabled,
}) {
  const handleClick = () => {
    if (
      !captchaToken &&
      process.env.NODE_ENV === 'production' &&
      mode === 'auth'
    ) {
      showToast('Пожалуйста, подтвердите, что вы не робот!', 'error');
      return;
    }

    setGithubLoad(true);
    const clientId = import.meta.env.VITE_CLIENT_GITHUB_ID;
    const redirectUri = `${window.location.origin}/oauth/github/callback`;
    const scope = 'read:user user:email';

    if (!clientId) {
      showToast('GitHub OAuth не настроен', 'error');
      return;
    }

    const randomState = generateSecureRandomState();
    const fullState = `${randomState}|${nextPath}|${mode}`;
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
    <>
      <Button
        onClick={handleClick}
        variant="primary"
        className={`${mode === 'connect' && '!flex-col'}`}
        type="button"
        disabled={disabled}
      >
        {githubLoad && mode === 'auth' ? (
          <AiOutlineSync size={23} className="animate-spin" />
        ) : (
          <>
            <AiFillGithub size={20} />
            {btnText || 'Войти через GitHub'}
          </>
        )}
      </Button>
    </>
  );
}
