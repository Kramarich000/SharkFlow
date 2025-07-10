import { useRef, useState } from 'react';
import { useResponsive } from '@common/hooks';
import { useThemeStore } from '@store/themeStore';
import Turnstile from 'react-turnstile';
import { showToast } from '@utils/toast';
import { AiOutlineSync } from 'react-icons/ai';
import { Button } from '@common/ui/utilities/Button';

export default function TurnstileWidget({ onVerify, action }) {
  const siteKey = import.meta.env.VITE_SITE_KEY || '1x00000000000000000000AA';
  const mode = useThemeStore((state) => state.mode);
  const { isMobile } = useResponsive();

  const [hasError, setHasError] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const turnstileRef = useRef(null);

  const size = isMobile ? 'compact' : 'normal';

  const handleError = () => {
    showToast('Ошибка проверки капчи', 'error');
    setHasError(true);
  };

  const handleReset = () => {
    setIsResetting(true);
    setHasError(false);
    try {
      if (turnstileRef.current?.reset) {
        turnstileRef.current.reset();
      } else {
        throw new Error('Reset not available');
      }
    } catch (err) {
      console.error(err);
      showToast('Не удалось сбросить проверку', 'error');
    } finally {
      setTimeout(() => setIsResetting(false), 300); 
    }
  };

  return (
    <div className="col-span-2 min-h-[146px] sm:min-h-[71px]">
      <Turnstile
        ref={turnstileRef}
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
          disabled={isResetting}
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
