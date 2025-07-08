import { IoCheckmarkCircle } from 'react-icons/io5';

export function Step3() {
  return (
    <div className="p-12 border-2 border-[var(--main-primary)] text-center mt-8 rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow">
      <IoCheckmarkCircle
        size={100}
        className="text-[var(--main-primary)]"
      />
      <p className="text-[20px]">
        Вы успешно обновили данные аккаунта
      </p>
    </div>
  );
} 