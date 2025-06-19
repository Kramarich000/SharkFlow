import { FaEye, FaThumbtack } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GrPowerCycle } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa';
import { dateFormatter } from '@utils/date/dateFormatter';
import useModalsStore from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import useTaskStore from '@store/taskStore';
import { useEffect } from 'react';

export default function BoardCard({ board, onOpen, onTogglePin, onToggleFav }) {
  const { setIsDetailsBoardModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
    })),
  );

  const { getTasks, setSelectedBoard } = useTaskStore(
    useShallow((state) => ({
      getTasks: state.getTasks,
      setSelectedBoard: state.setSelectedBoard,
    })),
  );

  return (
    <div
      className="relative overflow-auto rounded-3xl lg:hover:translate-y-[-20px] lg:shadow-2xl !transition-transform border-b-8 box-content max-h-[269px] bg-white p-4 group"
      style={{
        borderBottomColor: board.color.startsWith('#')
          ? board.color
          : `#${board.color}`,
      }}
    >
      <div className="min-h-40 pt-8 flex items-center justify-center">
        <h2 className="text-3xl truncate sm:hidden max-w-sm">{board.title}</h2>

        <h2 className="text-3xl break-words hidden sm:block max-w-sm whitespace-normal">
          {board.title}
        </h2>
      </div>

      <button
        title="Открыть доску"
        className="!p-2 absolute right-4 top-2.5 xl:opacity-0 group-hover:opacity-100 hover:scale-120 !transition-all"
        onClick={() => {
          setSelectedBoard(board.uuid);
          getTasks(board.uuid);
          onOpen(board);
          setIsDetailsBoardModalOpen(true);
        }}
      >
        <FaEye size={27} />
      </button>

      <button
        title={board.isPinned ? 'Открепить доску' : 'Закрепить доску'}
        className={`!p-2 absolute left-4 top-4 text-gray-700 hover:scale-120 hover:text-[#111111] !transition-all
               xl:opacity-0 group-hover:opacity-100 ${board.isPinned ? 'opacity-100' : null}`}
        onClick={() => onTogglePin(board)}
      >
        <FaThumbtack
          size={27}
          className={board.isPinned ? 'rotate-0' : 'rotate-45 opacity-30'}
        />
      </button>

      <button
        title={!board.isFavorite ? 'В избранное' : 'Убрать из избранного'}
        className={`!p-2 absolute left-15 top-3.5 hover:scale-120 !transition-all hover:text-amber-400
               xl:opacity-0 group-hover:opacity-100 ${board.isFavorite ? 'text-amber-400 opacity-100' : null}`}
        onClick={() => onToggleFav(board)}
      >
        <FaStar size={27} className={board.isFavorite ? null : 'opacity-30'} />
      </button>

      <div className="flex flex-col mt-4 items-center w-full md:items-start">
        <div className="flex items-center gap-2">
          <AiOutlineClockCircle size={20} title="Дата создания" />
          <p>{dateFormatter(board.createdAt)}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <GrPowerCycle size={20} title="Дата последнего обновления" />
          <p>{dateFormatter(board.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}
