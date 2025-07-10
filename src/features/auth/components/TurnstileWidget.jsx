import { useResponsive } from '@common/hooks';
import { useThemeStore } from '@store/themeStore';
import Turnstile from 'react-turnstile';

export default function TurnstileWidget({ onVerify, action }) {
  const siteKey = import.meta.env.VITE_SITE_KEY || '1x00000000000000000000AA';
  const mode = useThemeStore((state) => state.mode);
  const { isMobile } = useResponsive();
  let size;
  if (isMobile) {
    size = 'compact';
  } else {
    size = 'normal';
  }

  return (
    <Turnstile
      sitekey={siteKey}
      onVerify={onVerify}
      onError={() => showToast('Ошибка проверки капчи')}
      onExpire={() =>
        showToast('Время проверки капчи истекло, пожалуйста, повторите')
      }
      theme={mode}
      size={size}
      language="auto"
      action={action}
      className="col-span-2"
      tabIndex={0}
    />
  );
}
