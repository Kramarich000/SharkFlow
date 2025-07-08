import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function Step2({
  loading,
  confirmationCode,
  onCodeChange,
  onUpdate,
  onCancel,
  newLogin,
  onLoginChange,
  newEmail,
  onEmailChange,
}) {
  return (
    <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); onUpdate(); }}>
      <div className="relative w-full">
        <input
          className="peer input-styles input-primary"
          value={newLogin}
          onChange={onLoginChange}
          placeholder=" "
          required
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Новый логин
        </label>
      </div>
      <div className="relative w-full">
        <input
          className="peer input-styles input-primary"
          value={newEmail}
          onChange={onEmailChange}
          placeholder=" "
          required
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Новый email
        </label>
      </div>
      <div className="relative w-full">
        <input
          className="peer input-styles input-primary"
          value={confirmationCode}
          onChange={onCodeChange}
          placeholder=" "
          required
          maxLength={6}
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Код подтверждения
        </label>
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <Button variant="primary" onClick={onCancel} type="button" disabled={loading}>
          Отмена
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
                <AiOutlineSync className="animate-spin" size={23} />
              ) : (
                <>Сохранить</>
              )}
        </Button>
      </div>
    </form>
  );
} 