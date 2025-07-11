import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';

export function Step1({ loading, onNo, onYes }) {
  return (
    <div className="flex flex-col items-center gap-6 h-full justify-center">
      <h2 className="text-center text-2xl sm:text-3xl mb-4">
        Вы уверены что хотите отключить Github авторизацию?
      </h2>
      <div className="flex flex-col md:flex-row items-center w-full justify-center gap-2">
        <Button
          variant="primary"
          disabled={loading}
          onClick={onNo}
        >
          Нет
        </Button>
        <Button
          variant="primary"
          className="order-[-1] md:order-1"
          onClick={onYes}
          disabled={loading}
        >
          {loading ? (
            <AiOutlineSync className="animate-spin" size={23} />
          ) : (
            <>Да, отправить код на почту</>
          )}
        </Button>
      </div>
    </div>
  );
} 