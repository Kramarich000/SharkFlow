import Turnstile from 'react-turnstile';

export default function TurnstileWidget({ onVerify }) {
  const siteKey = import.meta.env.VITE_SITE_KEY || "1x00000000000000000000AA";
  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={onVerify}
      theme="auto"
      className="col-span-2"
    />
  );
}