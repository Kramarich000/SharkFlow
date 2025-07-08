import { useEffect, useRef } from 'react';
import { useThemeStore } from '@store/themeStore';
import { useMediaQuery } from '@common/hooks';

export default function TurnstileWidget({ action, onSuccess }) {
  const containerRef = useRef(null);
  const mode = useThemeStore((state) => state.mode);
  const sitekey =
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_SITE_KEY
      : import.meta.env.VITE_TEST_SITE_KEY;
  const isMobile = useMediaQuery('(max-width: 400px)');
  const widgetSize = isMobile ? 'compact' : 'normal';
  const widgetTheme = mode === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    window.handleTurnstileSuccess = function (token) {
      onSuccess?.(token);
    };
    window.handleTurnstileError = function () {
    };
    window.handleTurnstileExpired = function () {
    };

    const scriptId = 'cf-turnstile-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const tryRender = () => {
      if (window.turnstile && containerRef.current) {
        try {
          window.turnstile.render(containerRef.current, {
            sitekey,
            theme: widgetTheme,
            size: widgetSize,
            callback: 'handleTurnstileSuccess',
            'error-callback': 'handleTurnstileError',
            'expired-callback': 'handleTurnstileExpired',
            action,
          });
        } catch {}
      } else {
        setTimeout(tryRender, 300);
      }
    };
    tryRender();
    return () => {
      delete window.handleTurnstileSuccess;
      delete window.handleTurnstileError;
      delete window.handleTurnstileExpired;
    };
  }, [sitekey, widgetTheme, widgetSize, action]);

  return (
    <div
      ref={containerRef}
      className="cf-turnstile col-span-2"
      data-sitekey={sitekey}
      data-theme={widgetTheme}
      data-size={widgetSize}
      data-language="auto"
      data-callback="handleTurnstileSuccess"
      data-error-callback="handleTurnstileError"
      data-expired-callback="handleTurnstileExpired"
      data-action={action}
      data-appearance="always"
      data-retry="auto"
      data-retry-interval="8000"
      data-refresh-expired="auto"
      data-refresh-timeout="auto"
      data-feedback-enabled="true"
    ></div>
  );
}