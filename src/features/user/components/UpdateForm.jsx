import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export const UpdateForm = ({
  onUpdate,
  onCancel,
  isLoading,
  confirmationCode,
  setConfirmationCode,
  newLogin,
  setNewLogin,
}) => {
  return (
    <div key="step2" className="flex flex-col gap-5 h-full justify-center mb-4">
      <div>
        <h2 className="text-center text-2xl sm:text-3xl mb-4">
          Введите код и новые данные:
        </h2>
        <div className="relative">
          <input
            type="text"
            required
            className="peer input-styles input-primary"
            value={confirmationCode.confirmationCode}
            onChange={(e) =>
              setConfirmationCode({ confirmationCode: e.target.value })
            }
            disabled={isLoading}
            placeholder=" "
          />
          <label className="label-styles !bg-[var(--main-modal-bg)]">
            Введите код подтверждения
          </label>
        </div>
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            required
            className="peer input-styles input-primary"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            disabled={isLoading}
            placeholder=" "
          />
          <label className="label-styles !bg-[var(--main-modal-bg)]">
            Введите новый логин
          </label>
        </div>
        {/* <p className="text-center text-2xl">и/или</p>
        <div className="relative">
          <input
            type="text"
            required
            className="peer input-styles"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={isLoading}
            placeholder=" "
          />
          <label className="label-styles">Введите новую почту</label>
        </div> */}
      </div>
      <div className="flex items-center flex-col md:flex-row justify-center gap-2">
        <Button
          className="order-1 md:order-[-1]"
          variant="primary"
          disabled={isLoading}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={onUpdate} disabled={isLoading}>
          {isLoading ? (
            <AiOutlineSync className="animate-spin !text-white" size={23} />
          ) : (
            <>Подтвердить обновление</>
          )}
        </Button>
      </div>
    </div>
  );
};
