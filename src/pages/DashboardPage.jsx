import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { FaPlus } from 'react-icons/fa';
import useBoardStore from '@store/boardStore';
import { SimpleCheckbox } from '@components/main-components/checkbox/SimpleСheckBox';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
import { AiOutlineSync } from 'react-icons/ai';

import SearchBar from '@components/dashboard-components/SearchBar';
import FilterForm from '@components/dashboard-components/FilterForm';
import BoardCard from '@components/dashboard-components/BoardCard';
import PaginationControl from '@components/dashboard-components/PaginationControl';

import Loader from '@components/main-components/Loader';
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

import {
  filterByTitle,
  filterByCreatedDateRange,
  filterByRecentDays,
  filterByFavorites,
} from '@utils/filters/boardFilters';

import {
  sortByTitleDesc,
  sortByCreatedAsc,
  sortByCreatedDesc,
  sortByUpdatedAsc,
  sortByTitleAsc,
  sortByUpdatedDesc,
  sortByTaskCountAsc,
  sortByTaskCountDesc,
} from '@utils/filters/boardSorts';
import useModalsStore from '@store/modalsStore';

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
  const [params, setParams] = useState({
    searchTerm: '',
    dateRange: [null, null],
    recentDays: 0,
    onlyFav: false,
    sortBy: '',
    sortOrder: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const processed = useMemo(() => {
    let list = filterByTitle(boards, params.searchTerm);
    list = filterByCreatedDateRange(
      list,
      params.dateRange[0],
      params.dateRange[1],
    );
    list = filterByRecentDays(list, params.recentDays);
    list = filterByFavorites(list, params.onlyFav);

    switch (params.sortBy) {
      case 'title':
        list =
          params.sortOrder === 'asc'
            ? sortByTitleAsc(list)
            : sortByTitleDesc(list);
        break;
      case 'createdAt':
        list =
          params.sortOrder === 'asc'
            ? sortByCreatedAsc(list)
            : sortByCreatedDesc(list);
        break;
      case 'updatedAt':
        list =
          params.sortOrder === 'asc'
            ? sortByUpdatedAsc(list)
            : sortByUpdatedDesc(list);
        break;
      case 'taskCount':
        list =
          params.sortOrder === 'asc'
            ? sortByTaskCountAsc(list)
            : sortByTaskCountDesc(list);
        break;
    }

    return [...list].sort(
      (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0),
    );
  }, [
    boards,
    params.searchTerm,
    params.dateRange,
    params.recentDays,
    params.onlyFav,
    params.sortBy,
    params.sortOrder,
  ]);

  useEffect(
    () => setCurrentPage(1),
    [params.searchTerm, params.dateRange, params.recentDays, params.onlyFav],
  );

  const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  const currentBoards = processed.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
        <div className="h-full flex-col flex items-center justify-center">
          <motion.div
            key="loader"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: 'linear',
            }}
            className="text-7xl flex gap-8 text-center"
          >
            <AiOutlineSync />
          </motion.div>
          <p className="text-4xl mt-4 animate-pulse">Загрузка ваших досок</p>
        </div>
      ) : (
        <div className="flex flex-col h-full p-0 sm:p-6">
          <h2 className="mb-4 text-3xl font-semibold">Мои доски</h2>

          <div className="mb-6 flex flex-col gap-8">
            <SearchBar
              value={params.searchTerm}
              onChange={(v) => setParams((p) => ({ ...p, searchTerm: v }))}
            />

            <FilterForm
              dateRange={params.dateRange}
              onChangeDateRange={(range) =>
                setParams((p) => ({ ...p, dateRange: range }))
              }
              recentDays={params.recentDays}
              onChangeRecentDays={(v) =>
                setParams((p) => ({ ...p, recentDays: v }))
              }
              onChangeOnlyFav={(v) => setParams((p) => ({ ...p, onlyFav: v }))}
              sortBy={params.sortBy}
              onChangeSortBy={(v) => setParams((p) => ({ ...p, sortBy: v }))}
              sortOrder={params.sortOrder}
              onChangeSortOrder={(v) =>
                setParams((p) => ({ ...p, sortOrder: v }))
              }
            />
          </div>

          <div className="flex flex-wrap justify-center items-center mb-4">
            <div className="p-4">
              <SimpleCheckbox
                id="onlyFav"
                label="Избранные"
                checked={params.onlyFav}
                onChange={(v) => setParams((p) => ({ ...p, onlyFav: v }))}
              />
            </div>

            <button
              className="ml-0 sm:ml-auto bg-white hover:bg-gray-200 !transition-colors rounded-3xl px-6 py-2 flex items-center gap-2"
              onClick={() => setIsCreateBoardModalOpen(true)}
            >
              Создать доску <FaPlus size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {currentBoards.map((board) => (
              <BoardCard
                key={board.uuid}
                board={board}
                onOpen={handleBoardSelect}
                onTogglePin={handleTogglePin}
                onToggleFav={handleToggleFav}
              />
            ))}
          </div>

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
            <DeleteBoardModal />
          </Suspense>
        </div>
      )}
    </>
  );
}
