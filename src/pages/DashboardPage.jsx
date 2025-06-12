import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAuthStore } from '@store/authStore';
import useBoardStore from '@store/boardStore';
import CreateBoardModal from '@components/dashboard-components/CreateBoardModal';
import CreateTaskModal from '@components/dashboard-components/CreateTaskModal';
import BoardDetailsModal from '@components/dashboard-components/BoardDetailsModal';
import DeleteBoardModal from '@components/dashboard-components/DeleteBoardModal';
import { GrPowerCycle } from 'react-icons/gr';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';

export default function DashboardPage() {
  const token = useAuthStore((state) => state.accessToken);

  const {
    boards,
    handleBoardSelect,
    getBoards,
    setIsCreateBoardModalOpen,
    isDeleteBoardModalOpen,
  } = useBoardStore();

  useEffect(() => {
    if (token) {
      getBoards(token);
    }
  }, [token, getBoards]);

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Мои доски</h2>
      <div className="max-w-full mx-auto max-h-150 overflow-auto grid sm:grid-cols-2 gap-4 flex-wrap">
        {boards.map((board) => (
          <div
            key={`${board.uuid}-${board.createdAt}`}
            className="relative overflow-auto !border-0 !border-b-8 max-h-[269px] bg-white !transition-all box-content duration-200 p-4 min-w-[300px]"
            style={{
              borderBottomColor: `#${board.color}`,
            }}
          >
            <div className="min-h-40 flex items-center justify-center">
              <h2 className="text-3xl overflow-ellipsis overflow-x-hidden max-w-sm">
                {board.title}
              </h2>
            </div>
            <button
              title="Открыть доску"
              className="!p-2 absolute right-4 top-4"
              onClick={() => handleBoardSelect(board)}
            >
              <FaEye size={25} />
            </button>{' '}
            <div className="flex flex-col items-end">
              <div className="flex items-center justify-center gap-2">
                <p>
                  {' '}
                  Создано:{' '}
                  {new Date(board.updatedAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <AiOutlineClockCircle
                  size={20}
                  className="inline"
                  title="Дата создания"
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <p>
                  Обновлено:{' '}
                  {new Date(board.createdAt).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>{' '}
                <GrPowerCycle
                  size={20}
                  className="inline"
                  title="Дата последнего обновления"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          key="create-board"
          className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl min-h-[269px] relative"
          onClick={() => setIsCreateBoardModalOpen(true)}
        >
          <FaPlus
            className="absolute top-[32%] left-[42.5%]"
            size={100}
            color="rgba(0,0,0,.3)"
          />
        </button>
      </div>

      <CreateBoardModal />
      <CreateTaskModal />
      <BoardDetailsModal />
      <DeleteBoardModal />
    </div>
  );
}
