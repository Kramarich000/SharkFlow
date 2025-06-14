import { useState, useEffect, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import useBoardStore from '@store/boardStore';
import { SimpleCheckbox } from '@components/main-components/SimpleСheckBox';

import SearchBar from '@components/dashboard-components/SearchBar';
import FilterForm from '@components/dashboard-components/FilterForm';
import BoardCard from '@components/dashboard-components/BoardCard';
import PaginationControl from '@components/dashboard-components/PaginationControl';

import CreateTaskModal from '@components/dashboard-components/CreateTaskModal';
import BoardDetailsModal from '@components/dashboard-components/BoardDetailsModal';
import DeleteBoardModal from '@components/dashboard-components/DeleteBoardModal';
import CreateBoardModal from '@components/dashboard-components/CreateBoardModal';

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
import Loader from '@components/main-components/Loader';

export default function DashboardPage() {
  const {
    boards,
    handleBoardSelect,
    getBoards,
    setIsCreateBoardModalOpen,
    updateBoard,
    isLoaded,
  } = useBoardStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [recentDays, setRecentDays] = useState(0);
  const [onlyFav, setOnlyFav] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    if (!isLoaded) {
      getBoards();
    }
  }, [getBoards, isLoaded]);

  const processed = useMemo(() => {
    let list = filterByTitle(boards, searchTerm);
    list = filterByCreatedDateRange(list, dateFrom, dateTo);
    list = filterByRecentDays(list, recentDays);
    list = filterByFavorites(list, onlyFav);

    switch (sortBy) {
      case 'title':
        list =
          sortOrder === 'asc' ? sortByTitleAsc(list) : sortByTitleDesc(list);
        break;
      case 'createdAt':
        list =
          sortOrder === 'asc'
            ? sortByCreatedAsc(list)
            : sortByCreatedDesc(list);
        break;
      case 'updatedAt':
        list =
          sortOrder === 'asc'
            ? sortByUpdatedAsc(list)
            : sortByUpdatedDesc(list);
        break;
      case 'taskCount':
        list =
          sortOrder === 'asc'
            ? sortByTaskCountAsc(list)
            : sortByTaskCountDesc(list);
        break;
    }

    return [...list].sort(
      (a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0),
    );
  }, [
    boards,
    searchTerm,
    dateFrom,
    dateTo,
    recentDays,
    onlyFav,
    sortBy,
    sortOrder,
  ]);

  useEffect(
    () => setCurrentPage(1),
    [searchTerm, dateFrom, dateTo, recentDays, onlyFav],
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
      updateBoard({
        uuid: board.uuid,
        isPinned: !board.isPinned,
      });
    } catch (e) {
      console.error('Не удалось закрепить доску', e);
    }
  };

  const handleToggleFav = async (board) => {
    try {
      updateBoard({
        uuid: board.uuid,
        isFavorite: !board.isFavorite,
      });
    } catch (e) {
      console.error('Не удалось добавить доску в избранное', e);
    }
  };

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="mb-4 text-3xl font-semibold">Мои доски</h2>

      <div className="mb-6 flex flex-col gap-8">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <FilterForm
          dateFrom={dateFrom}
          onChangeDateFrom={setDateFrom}
          dateTo={dateTo}
          onChangeDateTo={setDateTo}
          recentDays={recentDays}
          onChangeRecentDays={setRecentDays}
          onChangeOnlyFav={setOnlyFav}
          sortBy={sortBy}
          onChangeSortBy={setSortBy}
          sortOrder={sortOrder}
          onChangeSortOrder={setSortOrder}
        />
      </div>
      <div className="flex items-center mb-4">
        <div className="p-4">
          <SimpleCheckbox
            id="onlyFav"
            label="Избранные"
            checked={onlyFav}
            onChange={setOnlyFav}
          />
        </div>
        <button
          className="ml-auto bg-white hover:bg-gray-200 rounded-3xl px-6 py-2 flex items-center gap-2"
          onClick={() => setIsCreateBoardModalOpen(true)}
        >
          <FaPlus size={20} /> Создать
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 overflow-auto">
        {currentBoards.map((board) => (
          <BoardCard
            key={`${board.uuid}`}
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

      <CreateBoardModal />
      <CreateTaskModal />
      <BoardDetailsModal />
      <DeleteBoardModal />
    </div>
  );
}
