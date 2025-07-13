import React from 'react';
import { Button } from '@common/ui/utilities/Button';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { generateSecureRandomState } from '@utils/generators/generateRandomState';
import { FaYandex } from 'react-icons/fa';

export function YandexAuthButton({
  mode = 'auth',
  nextPath = '/dashboard',
  captchaToken,
  yandexLoad,
  className,
  setYandexLoad,
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
      setYandexLoad(false);
      return;
    }

    setYandexLoad(true);
    const clientId = import.meta.env.VITE_CLIENT_YANDEX_ID;
    const redirectUri = `${window.location.origin}/oauth/yandex/callback`;

    if (!clientId) {
      showToast('Yandex OAuth не настроен', 'error');
      setYandexLoad(false);
      return;
    }

    const randomState = generateSecureRandomState();
    const fullState = `${randomState}|${nextPath}|${mode}`;
    console.log('fullState', fullState);

    sessionStorage.setItem('yandex_oauth_state', fullState);
    sessionStorage.setItem('captchaToken', captchaToken);

    const yandexUrl =
      `https://oauth.yandex.ru/authorize` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(fullState)}`;

    window.location.href = yandexUrl;
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="primary"
        className={`${mode === 'connect' && '!flex-col'} ${className}`}
        type="button"
        disabled={disabled}
      >
        {/* {yandexLoad && mode === 'auth' ? (
          <AiOutlineSync size={23} className="animate-spin" />
        ) : (
          <>
            <FaYandex size={20} />
            {btnText || 'Войти через Yandex'}
          </>
        )} */}

        <>
          <FaYandex size={20} />
          {btnText || 'Yandex'}
        </>
      </Button>
    </>
  );
}
