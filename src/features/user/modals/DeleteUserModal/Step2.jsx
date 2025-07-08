import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function Step2({ loading, confirmationCode, onCodeChange, onDelete, onCancel }) {
  return (
    <div className="flex flex-col gap-6 h-full justify-center">
      <h2 className="text-center text-3xl mb-4">Введите код:</h2>
      <div className="relative">
        <input
          type="text"
          required
          className="peer input-styles input-primary"
          value={confirmationCode}
          onChange={onCodeChange}
          disabled={loading}
          placeholder=" "
        />
        <label className="label-styles !bg-[var(--main-modal-bg)]">
          Введите код подтверждения
        </label>
      </div>
      <div className="flex gap-2 flex-col md:flex-row items-center justify-center">
        <Button
          variant="primary"
          disabled={loading}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          variant="primary"
          className="order-[-1] md:order-1 !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
          onClick={onDelete}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineSync className="animate-spin !text-white" size={23} />
          ) : (
            <>Подтвердить удаление</>
          )}
        </Button>
      </div>
    </div>
  );
} 