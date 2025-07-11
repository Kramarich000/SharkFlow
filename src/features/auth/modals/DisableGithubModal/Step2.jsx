import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function Step2({ loading, confirmationCode, onChange, onSubmit }) {
  return (
    <>
      <div className="relative w-full">
        <input
          className="peer input-styles input-primary"
          value={confirmationCode}
          onChange={onChange}
          placeholder=" "
          required
          maxLength={6}
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Введите код подтверждения из почты
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
          <>Отправить</>
        )}
      </Button>
    </>
  );
} 