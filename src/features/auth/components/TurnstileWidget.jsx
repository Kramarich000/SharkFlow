export default function TurnstileWidget() {
  return (
    <div
      className="cf-turnstile col-span-2"
      data-sitekey={import.meta.env.VITE_SITE_KEY || import.meta.env.VITE_TEST_SITE_KEY}
      data-theme="auto"
      data-size="normal"
      data-language="auto"
      data-callback="handleTurnstileSuccess"
      data-error-callback="handleTurnstileError"
      data-expired-callback="handleTurnstileExpired"
      data-action="login"
      data-appearance="always"
      data-retry="auto"
      data-retry-interval="8000"
      data-refresh-expired="auto"
      data-refresh-timeout="auto"
      data-feedback-enabled="true"
    ></div>
  );
}