import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { IoCopy } from 'react-icons/io5';
import { QrCode } from '@utils/totp/QrCode';

export function Step3({ loading, qrCode, secret, totpCode, onTotpChange, onCopySecret, onSubmit }) {
  return (
    <div className="flex flex-col gap-5">
      <QrCode value={qrCode} />
      <div className="flex items-center w-full justify-center gap-2 mt-2 select-all cursor-pointer">
        <code
          onClick={onCopySecret}
          className="text-lg text-center font-mono p-2 break-all rounded cursor-pointer select-all border-2 border-[var(--main-primary)] hover:bg-[var(--main-primary)] !text-[var(--main-text)] hover:!text-[var(--main-button-text)] !transition-colors"
          title="Кликните, чтобы скопировать"
          aria-label="Скопировать секрет в буфер обмена"
        >
          {secret}
        </code>
        <Button
          onClick={onCopySecret}
          variant="tertiary"
          className="p-2 rounded !bg-transparent hover:!bg-transparent group"
          aria-label="Скопировать секретный код"
        >
          <IoCopy
            size={24}
            className="text-[var(--main-text)] group-hover:text-[var(--main-primary)] !transition-colors"
          />
        </Button>
      </div>
      <div className="relative w-full">
        <input
          className="peer input-styles input-primary"
          value={totpCode}
          onChange={onTotpChange}
          placeholder=" "
          required
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Введите код из приложения
        </label>
      </div>
      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineSync size={23} className="animate-spin" />
        ) : (
          <>Подтвердить</>
        )}
      </Button>
    </div>
  );
} 