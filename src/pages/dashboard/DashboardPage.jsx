import { useEffect, Suspense } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { AnimatePresence } from 'framer-motion';

import { useBoardStore } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';
import {
  PaginationControl,
  DashboardHeader,
  DashboardLoader,
  useDashboardHandlers,
} from '@features/dashboard';

import {
  BoardGrid,
  BoardGridLoader,
  BoardContextMenu,
  useBoardFilterAndPagination,
} from '@features/boards';

import { useBoards } from '@features/boards';

export default function DashboardPage() {
  const { handleBoardSelect } = useBoardStore(
    useShallow((state) => ({
      handleBoardSelect: state.handleBoardSelect,
    })),
  );

  const { setIsCreateBoardModalOpen, contextMenu, closeContextMenu } =
    useModalsStore(
      useShallow((state) => ({
        setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
        contextMenu: state.contextMenu,
        closeContextMenu: state.closeContextMenu,
      })),
    );

  const { data: boards, isLoading, isError } = useBoards();

  const {
    params,
    setParams,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    currentBoards,
  } = useBoardFilterAndPagination(boards || []);

  const {
    handleEditBoard,
    handleDeleteBoard,
    handleDuplicateBoard,
    handleToggleFav,
    handleTogglePin,
  } = useDashboardHandlers();

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

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Произошла ошибка при загрузке досок.</p>
      </div>
    );
  }

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
      {isLoading ? (
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
        </div>
      )}
    </>
  );
}
