import React from 'react';
import { FaEye, FaThumbtack, FaTasks } from 'react-icons/fa';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { GrPowerCycle } from 'react-icons/gr';
import { FaStar } from 'react-icons/fa';
import { FaEllipsisH } from 'react-icons/fa';
import { dateFormatter } from '@utils/date/dateFormatter';
import useModalsStore from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import useTaskStore from 'features/tasks/store/taskStore';

function BoardCardComponent({ board, onOpen, onTogglePin, onToggleFav }) {
  const { setIsDetailsBoardModalOpen, openContextMenu, contextMenu } =
    useModalsStore(
      useShallow((state) => ({
        setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
        openContextMenu: state.openContextMenu,
        contextMenu: state.contextMenu,
      })),
    );

  const menuVisibleForThisCard =
    contextMenu.visible && contextMenu.board?.uuid === board.uuid;

  const { getTasks, setSelectedBoard } = useTaskStore(
    useShallow((state) => ({
      getTasks: state.getTasks,
      setSelectedBoard: state.setSelectedBoard,
    })),
  );

  const handleMenuClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    openContextMenu(rect.right, rect.bottom, board);
  };

  return (
    <div
      className="group relative hover:translate-y-[-10px] overflow-auto rounded-xl border-l-8 border-2 box-content max-h-[269px] bg-white p-4 shadow-lg !transition-transform"
      style={{
        borderColor: board.color.startsWith('#')
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
        className="!p-2 absolute right-4 top-2.5 text-gray-400 hover:text-gray-800 hover:scale-120 !transition-all"
        onClick={() => {
          setSelectedBoard(board.uuid);
          getTasks(board.uuid);
          onOpen(board);
          setIsDetailsBoardModalOpen(true);
        }}
      >
        <FaEye size={27} />
      </button>

      <div className="absolute top-2.5 right-14 flex items-center">
        <button
          title="Действия"
          className={`!p-2 hover:text-gray-800 hover:scale-120 !transition-all ${
            menuVisibleForThisCard
              ? 'text-black scale-110 rotate-90'
              : 'text-gray-400 scale-100'
          } hover:text-black`}
          onClick={handleMenuClick}
        >
          <FaEllipsisH size={28} />
        </button>
      </div>

      <button
        title={board.isPinned ? 'Открепить доску' : 'Закрепить доску'}
        className={`!p-2 absolute left-4 top-4 text-gray-400 hover:text-gray-900 hover:scale-120 !transition-all`}
        onClick={() => onTogglePin(board)}
      >
        <FaThumbtack
          size={27}
          className={board.isPinned ? 'rotate-0 text-gray-900' : 'rotate-45 '}
        />
      </button>

      <button
        title={!board.isFavorite ? 'В избранное' : 'Убрать из избранного'}
        className={`!p-2 absolute left-15 top-3.5 hover:scale-120 !transition-all
               ${
                 board.isFavorite
                   ? 'text-amber-400'
                   : 'text-gray-400 hover:text-amber-400'
               }`}
        onClick={() => onToggleFav(board)}
      >
        <FaStar size={27} className={board.isFavorite ? null : 'opacity-60'} />
      </button>

      <div className="flex flex-col mt-4 items-center w-full md:items-start">
        <div className="flex items-center gap-2">
          <FaTasks size={20} title="Количество задач" />
          <p>Задач: {board.taskCount ?? 0}</p>
        </div>
        <div className="flex items-center gap-2 mt-1">
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

export const BoardCard = React.memo(BoardCardComponent);
