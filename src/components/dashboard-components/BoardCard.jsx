import { FaEye, FaThumbtack } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GrPowerCycle } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa';

export default function BoardCard({ board, onOpen, onTogglePin, onToggleFav }) {
  return (
    <div
      className="relative overflow-auto rounded-3xl rounded-b-none border-b-8 box-content max-h-[269px]
             bg-white p-4 min-w-[300px] group"
      style={{
        borderBottomColor: board.color.startsWith('#')
          ? board.color
          : `#${board.color}`,
      }}
    >
      <div className="min-h-40 flex items-center justify-center">
        <h2 className="text-3xl overflow-ellipsis overflow-x-hidden max-w-sm">
          {board.title}
        </h2>
      </div>

      <button
        title="Открыть доску"
        className="!p-2 absolute right-4 top-2.5 opacity-0 group-hover:opacity-100 !transition-all"
        onClick={() => onOpen(board)}
      >
        <FaEye size={25} />
      </button>

      <button
        title={board.isPinned ? 'Открепить доску' : 'Закрепить доску'}
        className={`!p-2 absolute left-4 top-4 text-gray-700 hover:text-[#111111] !transition-all
               opacity-0 group-hover:opacity-100 ${board.isPinned ? 'opacity-100' : null}`}
        onClick={() => onTogglePin(board)}
      >
        <FaThumbtack
          size={20}
          className={board.isPinned ? 'rotate-0' : 'rotate-45 opacity-30'}
        />
      </button>

      <button
        title={!board.isFavorite ? 'В избранное' : 'Убрать из избранного'}
        className={`!p-2 absolute left-12 top-3.5 !transition-all hover:text-amber-400
               opacity-0 group-hover:opacity-100 ${board.isFavorite ? 'text-amber-400 opacity-100' : null}`}
        onClick={() => onToggleFav(board)}
      >
        <FaStar size={20} className={board.isFavorite ? null : 'opacity-30'} />
      </button>

      <div className="flex flex-col mt-4">
        <div className="flex items-center gap-2">
          <AiOutlineClockCircle size={20} title="Дата создания" />
          <p>
            {new Date(board.createdAt).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <GrPowerCycle size={20} title="Дата последнего обновления" />
          <p>
            {new Date(board.updatedAt).toLocaleString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
