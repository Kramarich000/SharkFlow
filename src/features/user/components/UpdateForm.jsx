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
            className="peer input-styles"
            value={confirmationCode.confirmationCode}
            onChange={(e) =>
              setConfirmationCode({ confirmationCode: e.target.value })
            }
            disabled={isLoading}
            placeholder=" "
          />
          <label className="label-styles">Введите код подтверждения</label>
        </div>
      </div>
      <div>
        <div className="relative">
          <input
            type="text"
            required
            className="peer input-styles"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            disabled={isLoading}
            placeholder=" "
          />
          <label className="label-styles">Введите новый логин</label>
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
        <button
          className="btn-primary"
          disabled={isLoading}
          onClick={onCancel}
        >
          Отмена
        </button>
        <button
          className="btn-primary"
          onClick={onUpdate}
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineSync className="animate-spin !text-white" size={24} />
          ) : (
            <>Подтвердить обновление</>
          )}
        </button>
      </div>
    </div>
  );
};
