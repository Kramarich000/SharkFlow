import { AiOutlineSync } from 'react-icons/ai';

export const ProfileLoader = () => {
  return (
    <div className="h-full flex-col flex items-center justify-center">
      <div
        key="loader"
        style={{ animation: 'spin 1.2s linear infinite' }}
        className="text-7xl flex gap-8 text-center"
      >
        <AiOutlineSync />
      </div>
      <p className="text-4xl mt-4 animate-pulse">Загрузка ваших данных</p>
    </div>
  );
};
