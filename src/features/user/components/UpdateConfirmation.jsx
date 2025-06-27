import { AiOutlineSync } from 'react-icons/ai';

export const UpdateConfirmation = ({ onConfirm, onCancel, isLoading }) => {
  return (
    <div
      key="step1"
      className="flex flex-col items-center gap-6 h-full justify-center"
    >
      <h2 className="text-center text-2xl sm:text-3xl mb-4">
        Вы уверены что хотите обновить данные аккаунта?
      </h2>
      <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
        <button
          className="btn-primary"
          disabled={isLoading}
          onClick={onCancel}
        >
          Нет
        </button>
        <button
          className="btn-primary"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineSync className="animate-spin" size={24} />
          ) : (
            <>Да, отправить код на почту</>
          )}
        </button>
      </div>
    </div>
  );
};
