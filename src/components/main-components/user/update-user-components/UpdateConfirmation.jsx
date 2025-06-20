import { AiOutlineSync } from 'react-icons/ai';

const UpdateConfirmation = ({ onConfirm, onCancel, isLoading }) => {
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
          className={`primary-btn ${isLoading ? 'pointer-events-none' : ''}`}
          disabled={isLoading}
          onClick={onCancel}
        >
          Нет
        </button>
        <button
          className={`primary-btn order-[-1] md:order-1 items-center justify-center flex ${
            isLoading ? '!bg-gray-600 pointer-events-none' : ''
          }`}
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

export default UpdateConfirmation; 