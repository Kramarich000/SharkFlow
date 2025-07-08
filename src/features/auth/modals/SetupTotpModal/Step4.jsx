import { IoCheckmarkCircle } from 'react-icons/io5';

export function Step4({ step }) {
  return (
    <div
      className={`p-12 border-2 border-[var(--main-primary)] text-center rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow ${
        step === 3 ? 'mt-0' : 'mt-8'
      }`}
    >
      <IoCheckmarkCircle
        size={100}
        className="text-[var(--main-primary)]"
      />
      <p className="text-[20px]">Вы успешно подключили 2FA</p>
    </div>
  );
} 