import { useState, useEffect } from 'react';
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
import { FaArrowLeft } from 'react-icons/fa';

export default function DashboardPage() {
  const token = useAuthStore((state) => state.accessToken);

  const { boards, handleBoardSelect, getBoards, setIsCreateBoardModalOpen } =
    useBoardStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (token) {
      getBoards(token);
    }
  }, [token, getBoards]);

  const filteredBoards = boards.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredBoards.length / pageSize);

  const currentBoards = filteredBoards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="mb-2 text-3xl font-semibold">Мои доски</h2>
      <div className="relative mb-4 flex gap-4">
        <input
          type="text"
          name="search"
          placeholder=" "
          required
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="peer w-full p-2 outline-0 border border-transparent border-b-[#111111] focus:border-[#111111] rounded-[0px] focus:rounded-[8px] transition-all"
        />
        <label
          htmlFor="search"
          className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200
                              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base
                              peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#888] bg-[#c7c7c7] px-1
                              peer-valid:top-0 peer-valid:text-sm peer-valid:text-[#888]"
        >
          Поиск досок...
        </label>
        <button
          key="create-board"
          className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl w-40"
          onClick={() => setIsCreateBoardModalOpen(true)}
        >
          <p className="flex justify-between items-center text-left">
            Создать
            <FaPlus size={25} color="rgba(0,0,0,.3)" />
          </p>
        </button>
      </div>

      <div className="w-full mx-auto grid sm:grid-cols-2 gap-4 flex-wrap mb-4">
        {currentBoards.map((board) => (
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
      </div>

      <div className="flex justify-center items-center gap-4 mt-auto">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <FaArrowLeft className="rotate-180" />
        </button>
      </div>
      <CreateBoardModal />
      <CreateTaskModal />
      <BoardDetailsModal />
      <DeleteBoardModal />
    </div>
  );
}
