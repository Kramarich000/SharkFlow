import { AiOutlineSync } from 'react-icons/ai';

const BoardLoader = () => (
  <div className="h-full mt-4 mb-4 flex-col flex items-center justify-center">
    <div
      key="loader"
      style={{ animation: 'spin 1.2s linear infinite' }}
      className="text-7xl flex gap-8 text-center"
    >
      <AiOutlineSync />
    </div>
    <p className="text-4xl mt-4 animate-pulse text-center">
      Загрузка ваших задач
    </p>
  </div>
);

export default BoardLoader; 