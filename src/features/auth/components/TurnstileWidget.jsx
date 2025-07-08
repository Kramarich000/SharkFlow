import { useEffect, useRef, useState } from 'react';
import { showToast } from '@utils/toast';
import { useMediaQuery } from '@common/hooks';
import { useThemeStore } from '@store/themeStore';

export default function TurnstileWidget({ action, onSuccess }) {
  const widgetRef = useRef(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);
  const mode = useThemeStore((state) => state.mode);
  const sitekey =
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_SITE_KEY
      : import.meta.env.VITE_TEST_SITE_KEY;
  const isMobile = useMediaQuery('(max-width: 400px)');
  const widgetSize = isMobile ? 'compact' : 'normal';
  const widgetTheme = mode === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const scriptId = 'cf-turnstile-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setWidgetError(true);
        showToast('Ошибка загрузки скрипта капчи. Отключите блокировщик рекламы или попробуйте позже.', 'error');
      };
      document.body.appendChild(script);
    }

    window.handleTurnstileSuccess = function (token) {
      onSuccess?.(token);
    };

    window.handleTurnstileError = function () {
      showToast('Произошла ошибка при прохождении captcha', 'error');
      setWidgetError(true);
      console.error('CAPTCHA error');
    };

    window.handleTurnstileExpired = function () {
      showToast('Срок действия captcha истёк', 'error');
      setWidgetError(true);
      console.warn('CAPTCHA expired');
    };

    const checkWidget = setTimeout(() => {
      if (widgetRef.current && widgetRef.current.querySelector('iframe')) {
        setWidgetLoaded(true);
      } else {
        setWidgetError(true);
        showToast('Не удалось загрузить капчу. Отключите блокировщик рекламы или попробуйте позже.', 'error');
      }
    }, 3000);

    return () => {
      clearTimeout(checkWidget);
      delete window.handleTurnstileSuccess;
      delete window.handleTurnstileError;
      delete window.handleTurnstileExpired;
    };
  }, [onSuccess]);

  if (widgetError) {
    return <div className="text-red-500">Ошибка загрузки капчи. Попробуйте позже или отключите блокировщик рекламы.</div>;
  }

  return (
    <div
      ref={widgetRef}
      className="cf-turnstile col-span-2"
      data-sitekey={sitekey}
      data-theme={widgetTheme}
      data-size={widgetSize}
      data-language="auto"
      data-callback="handleTurnstileSuccess"
      data-error-callback="handleTurnstileError"
      data-expired-callback="handleTurnstileExpired"
      data-action={action}
      // data-cdata="custom_meta"
      // data-response-field="true"
      // data-response-field-name="cf-turnstile-response"
      // data-execution="render"
      data-appearance="always"
      data-retry="auto"
      data-retry-interval="8000"
      data-refresh-expired="auto"
      data-refresh-timeout="auto"
      data-feedback-enabled="true"
    ></div>
  );
}
