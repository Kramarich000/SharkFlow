import { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useAuthStore } from '@store/authStore';
import useBoardStore from '@store/boardStore';
import CreateBoardModal from '@components/dashboard-components/CreateBoardModal';
import CreateTaskModal from '@components/dashboard-components/CreateTaskModal';
import BoardDetailsModal from '@components/dashboard-components/BoardDetailsModal';

export default function DashboardPage() {
  const token = useAuthStore((state) => state.accessToken);

  const { boards, handleBoardSelect, fetchBoards, setIsCreateBoardModalOpen } =
    useBoardStore();

  useEffect(() => {
    if (token) {
      fetchBoards(token);
    }
  }, [token, fetchBoards]);

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Мои задачи</h2>
      <div className="max-w-full mx-auto max-h-150 overflow-auto grid grid-cols-2 gap-4 flex-wrap">
        {boards.map((board) => (
          <button
            key={`${board.uuid}-${board.createdAt}`}
            onClick={() => handleBoardSelect(board)}
            className="relative overflow-auto !border-0 !border-b-8 max-h-[269px] bg-white !transition-all box-content duration-200 p-4 min-w-[300px] group hover:brightness-80"
            style={{
              borderBottomColor: `#${board.color}`,
            }}
          >
            <p>
              Дата создания:{' '}
              {new Date(board.createdAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="text-3xl min-h-50 whitespace-nowrap overflow-x-auto overflow-ellipsis w-full grid place-items-center">
              {board.title}
            </div>
            <p>
              Последнее изменение:{' '}
              {new Date(board.updatedAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </button>
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
    </div>
  );
}
