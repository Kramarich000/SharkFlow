import { useState, useEffect, lazy, Suspense } from 'react';
import useBoardStore from '@store/boardStore';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence } from 'framer-motion';

import PaginationControl from '@components/dashboard-components/PaginationControl';
import DashboardHeader from '@components/dashboard-components/page-components/DashboardHeader';
import BoardGrid from '@components/dashboard-components/page-components/BoardGrid';
import BoardGridLoader from '@components/dashboard-components/page-components/BoardGridLoader';
import BoardContextMenu from '@components/dashboard-components/BoardContextMenu';
import DashboardLoader from '@components/dashboard-components/page-components/DashboardLoader';

import useModalsStore from '@store/modalsStore';
import { useBoardFilterAndPagination } from '@hooks/useBoardFilterAndPagination';
import DeleteTaskModal from '@components/dashboard-components/modals/DeleteTaskModal';

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
  const {
    boards,
    handleBoardSelect,
    getBoards,
    updateBoard,
    isLoaded,
    createBoard,
  } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      handleBoardSelect: state.handleBoardSelect,
      getBoards: state.getBoards,
      updateBoard: state.updateBoard,
      isLoaded: state.isLoaded,
      createBoard: state.createBoard,
    })),
  );

  const {
    setIsCreateBoardModalOpen,
    setIsDetailsBoardModalOpen,
    setIsDeleteBoardModalOpen,
    contextMenu,
    closeContextMenu,
  } = useModalsStore(
    useShallow((state) => ({
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
      setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
      setIsDeleteBoardModalOpen: state.setIsDeleteBoardModalOpen,
      contextMenu: state.contextMenu,
      closeContextMenu: state.closeContextMenu,
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

  useEffect(() => {
    const handleClick = () => {
      if (contextMenu.visible) {
        closeContextMenu();
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [contextMenu.visible, closeContextMenu]);

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

  const handleEditBoard = () => {
    if (!contextMenu.board) return;
    handleBoardSelect(contextMenu.board);
    setIsDetailsBoardModalOpen(true);
  };

  const handleDuplicateBoard = async () => {
    if (!contextMenu.board) return;
    const { title, color } = contextMenu.board;

    let newTitle = `${title} (копия)`;
    await createBoard({ title: newTitle, color });
  };

  const handleDeleteBoard = () => {
    if (!contextMenu.board) return;
    handleBoardSelect(contextMenu.board);
    setIsDeleteBoardModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {contextMenu.visible && (
          <BoardContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={closeContextMenu}
            onEdit={handleEditBoard}
            onDuplicate={handleDuplicateBoard}
            onDelete={handleDeleteBoard}
          />
        )}
      </AnimatePresence>
      {loading ? (
        <div className="flex h-full flex-col p-0 sm:p-6">
          <DashboardHeader
            params={params}
            setParams={setParams}
            onOpenCreateBoard={() => setIsCreateBoardModalOpen(true)}
          />
          <BoardGridLoader />
        </div>
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
            <DeleteTaskModal />
            <BoardDetailsModal />
            <TaskDetailsModal />
            <DeleteBoardModal />
          </Suspense>
        </div>
      )}
    </>
  );
}
