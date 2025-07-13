import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function LoginStep2({
  totpCode,
  setTotpCode,
  handleLoginUserAfter2FA,
  guestLoad,
  load,
  googleLoad,
  totpLoad,
}) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="relative">
        <input
          type="text"
          value={totpCode}
          onChange={e => setTotpCode(e.target.value)}
          className="peer input-styles input-primary"
          placeholder=" "
        />
        <label className="label-styles">Введите код из приложения</label>
      </div>
      <Button
        variant="primary"
        onClick={handleLoginUserAfter2FA}
        disabled={guestLoad || load || googleLoad || totpLoad}
      >
        {totpLoad ? (
          <AiOutlineSync size={23} className="animate-spin" />
        ) : (
          <>Отправить</>
        )}
      </Button>
    </div>
  );
} 