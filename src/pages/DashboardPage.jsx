import { useState, useEffect, lazy, Suspense } from 'react';
import useBoardStore from '@store/boardStore';
import { useShallow } from 'zustand/react/shallow';

import PaginationControl from '@components/dashboard-components/PaginationControl';
import DashboardHeader from '@components/dashboard-components/page-components/DashboardHeader';
import BoardGrid from '@components/dashboard-components/page-components/BoardGrid';
import DashboardLoader from '@components/dashboard-components/page-components/DashboardLoader';

import useModalsStore from '@store/modalsStore';
import { useBoardFilterAndPagination } from '@hooks/useBoardFilterAndPagination';

const CreateBoardModal = lazy(
  () => import('@components/dashboard-components/modals/CreateBoardModal'),
);
const CreateTaskModal = lazy(
  () => import('@components/dashboard-components/modals/CreateTaskModal'),
);
const BoardDetailsModal = lazy(
  () => import('@components/dashboard-components/modals/BoardDetailsModal'),
);
const DeleteBoardModal = lazy(
  () => import('@components/dashboard-components/modals/DeleteBoardModal'),
);
const TaskDetailsModal = lazy(
  () => import('@components/dashboard-components/modals/TaskDetailsModal'),
);

export default function DashboardPage() {
  const { boards, handleBoardSelect, getBoards, updateBoard, isLoaded } =
    useBoardStore(
      useShallow((state) => ({
        boards: state.boards,
        handleBoardSelect: state.handleBoardSelect,
        getBoards: state.getBoards,
        updateBoard: state.updateBoard,
        isLoaded: state.isLoaded,
      })),
    );

  const { setIsCreateBoardModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
    })),
  );

  const [loading, setLoading] = useState(true);

  const {
    params,
    setParams,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    currentBoards,
  } = useBoardFilterAndPagination(boards);

  useEffect(() => {
    if (!isLoaded) {
      getBoards();
    }
  }, [isLoaded, getBoards]);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  const handleTogglePin = async (board) => {
    try {
      await updateBoard({ uuid: board.uuid, isPinned: !board.isPinned });
    } catch (e) {
      console.error('Не удалось закрепить доску', e);
    }
  };

  const handleToggleFav = async (board) => {
    try {
      await updateBoard({ uuid: board.uuid, isFavorite: !board.isFavorite });
    } catch (e) {
      console.error('Не удалось добавить доску в избранное', e);
    }
  };

  return (
    <>
      {loading ? (
        <DashboardLoader />
      ) : (
        <div className="flex flex-col h-full p-0 sm:p-6">
          <DashboardHeader
            params={params}
            setParams={setParams}
            onOpenCreateBoard={() => setIsCreateBoardModalOpen(true)}
          />

          <BoardGrid
            boards={currentBoards}
            onOpen={handleBoardSelect}
            onTogglePin={handleTogglePin}
            onToggleFav={handleToggleFav}
          />

          <PaginationControl
            page={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />

          <Suspense fallback={null}>
            <CreateBoardModal />
            <CreateTaskModal />
            <BoardDetailsModal />
            <TaskDetailsModal />
            <DeleteBoardModal />
          </Suspense>
        </div>
      )}
    </>
  );
}
