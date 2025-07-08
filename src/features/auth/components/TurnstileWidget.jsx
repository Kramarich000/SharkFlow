import { useEffect, useRef } from "react";

export default function TurnstileWidget({ onSuccess }) {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (window.turnstile && widgetRef.current) {
      window.turnstile.render(widgetRef.current, {
        sitekey: import.meta.env.VITE_SITE_KEY || import.meta.env.VITE_TEST_SITE_KEY,
        theme: "auto",
        size: "normal",
        language: "auto",
        callback: (token) => {
          if (onSuccess) onSuccess(token);
        },
        "error-callback": "handleTurnstileError",
        "expired-callback": "handleTurnstileExpired",
        action: "login",
        appearance: "always",
        retry: "auto",
        "retry-interval": 8000,
        "refresh-expired": "auto",
        "refresh-timeout": "auto",
        "feedback-enabled": true,
      });
    }
  }, [onSuccess]);

  return <div ref={widgetRef} className="cf-turnstile col-span-2"></div>;
}