import { useRef, useState } from 'react';
import { useResponsive } from '@common/hooks';
import { useThemeStore } from '@store/themeStore';
import Turnstile from 'react-turnstile';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { Button } from '@common/ui/utilities/Button';

export default function TurnstileWidget({ onVerify, action, disabled }) {
  const siteKey = import.meta.env.VITE_SITE_KEY || '1x00000000000000000000AA';
  const mode = useThemeStore((state) => state.mode);
  const { isMobile } = useResponsive();

  const [hasError, setHasError] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);

  const size = isMobile ? 'compact' : 'normal';

  const handleError = () => {
    showToast('Ошибка проверки капчи', 'error');
    setHasError(true);
  };

  const handleReset = () => {
    if (disabled) return;
    setIsResetting(true);
    setHasError(false);
    setWidgetKey((prev) => prev + 1);
    setTimeout(() => setIsResetting(false), 300);
  };

  return (
    <div
      className={`col-span-2 min-h-[146px] sm:min-h-[71px] flex items-center justify-center  ${disabled ? 'opacity-60 cursor-not-allowed select-none' : 'cursor-pointer outline-none'}`}
    >
      <Turnstile
        key={widgetKey}
        sitekey={siteKey}
        className={hasError ? 'hidden' : ''}
        onVerify={(token) => {
          setHasError(false);
          onVerify(token);
        }}
        onError={handleError}
        onExpire={() =>
          showToast(
            'Время проверки капчи истекло, пожалуйста, повторите попытку',
            'error',
          )
        }
        theme={mode}
        size={size}
        language="auto"
        action={action}
        tabIndex={0}
      />

      {hasError && (
        <Button
          variant="primary"
          type="button"
          onClick={handleReset}
          className="!bg-red-400 !w-fit hover:!bg-red-500 !transition col-span-2 mx-auto"
          disabled={isResetting || disabled}
        >
          {isResetting ? (
            <AiOutlineSync className="animate-spin" size={23} />
          ) : (
            <>Повторить проверку</>
          )}
        </Button>
      )}
    </div>
  );
}
