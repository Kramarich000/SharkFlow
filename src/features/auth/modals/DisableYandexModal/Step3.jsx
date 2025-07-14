import { IoCheckmarkCircle } from 'react-icons/io5';

export function Step3() {
  return (
    <div className="p-12 border-2 border-[var(--main-primary)] text-center rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow mt-0">
      <IoCheckmarkCircle
        size={100}
        className="text-[var(--main-primary)]"
      />
      <p className="text-[20px]">Вы успешно отключили Yandex</p>
    </div>
  );
} 