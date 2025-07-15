import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function RestoredSuccess() {
  return (
    <div className="p-12 border-2 border-[var(--main-primary)] mt-8 rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow">
      <IoIosCheckmarkCircle size={100} className="text-[var(--main-primary)]" />
      <p className="text-[20px]">Вы успешно восстановили аккаунт</p>
    </div>
  );
}
