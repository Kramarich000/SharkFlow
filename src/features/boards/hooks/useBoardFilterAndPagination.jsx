import { useState, useMemo, useEffect } from 'react';
import {
  filterByTitle,
  filterByCreatedDateRange,
  filterByRecentDays,
  filterByFavorites,
  filterByTaskCount,
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

export const useBoardFilterAndPagination = (boards) => {
  const [params, setParams] = useState({
    searchTerm: '',
    dateRange: [null, null],
    recentDays: 0,
    onlyFav: false,
    sortBy: '',
    sortOrder: '',
    taskCount: -1,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const processedBoards = useMemo(() => {
    let list = filterByTitle(boards, params.searchTerm);
    list = filterByCreatedDateRange(
      list,
      params.dateRange[0],
      params.dateRange[1],
    );
    list = filterByRecentDays(list, params.recentDays);
    list = filterByFavorites(list, params.onlyFav);
    list = filterByTaskCount(list, params.taskCount);

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
      default:
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
    params.taskCount,
    params.sortBy,
    params.sortOrder,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    params.searchTerm,
    params.dateRange,
    params.recentDays,
    params.onlyFav,
    params.taskCount,
  ]);

  const totalPages = Math.max(1, Math.ceil(processedBoards.length / pageSize));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentBoards = processedBoards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return {
    params,
    setParams,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    currentBoards,
  };
}; 