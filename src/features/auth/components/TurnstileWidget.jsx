import { useEffect, useRef, useState, useCallback } from 'react';
import { showToast } from '@utils/toast';
import { useMediaQuery } from '@common/hooks';
import { useThemeStore } from '@store/themeStore';

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
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    window.handleTurnstileSuccess = function (token) {
      setLoadError(false);
      onSuccess?.(token);
    };
    window.handleTurnstileError = function () {
      setLoadError(true);
      showToast('Произошла ошибка при прохождении captcha', 'error');
      console.error('CAPTCHA error');
    };
    window.handleTurnstileExpired = function () {
      showToast('Срок действия captcha истёк', 'error');
      setLoadError(true);
      console.warn('CAPTCHA expired');
    };
    return () => {
      delete window.handleTurnstileSuccess;
      delete window.handleTurnstileError;
      delete window.handleTurnstileExpired;
    };
  }, [onSuccess]);

  useEffect(() => {
    const scriptId = 'cf-turnstile-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setLoadError(true);
        showToast('Ошибка загрузки скрипта капчи', 'error');
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    setLoadError(false);
    if (!containerRef.current) return;
    if (containerRef.current.__turnstileRendered) return;
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
          containerRef.current.__turnstileRendered = true;
          console.log('TurnstileWidget rendered');
        } catch (e) {
          setLoadError(true);
          showToast('Ошибка инициализации капчи', 'error');
        }
      } else {
        setTimeout(tryRender, 300);
      }
    };
    tryRender();
    return () => {
      if (window.turnstile && containerRef.current) {
        try {
          window.turnstile.reset(containerRef.current);
        } catch {}
        containerRef.current.__turnstileRendered = false;
      }
    };
  }, [sitekey, widgetTheme, widgetSize, action, reloadKey]);

  const handleReload = useCallback(() => {
    setReloadKey((k) => k + 1);
    setLoadError(false);
  }, []);

  return (
    <div className="col-span-2">
      {loadError ? (
        <div className="flex flex-col items-center gap-2">
          <div className="text-red-600">Не удалось загрузить капчу</div>
          <button
            type="button"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleReload}
          >
            Перезагрузить капчу
          </button>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="cf-turnstile"
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
      )}
    </div>
  );
}