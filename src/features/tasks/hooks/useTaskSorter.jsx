import { useState, useMemo, useEffect, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

function getOrderedTasksFromStorage(boardUuid, tasks) {
  if (!boardUuid) return tasks;
  const saved = localStorage.getItem(`board_order_${boardUuid}`);
  if (!saved) return tasks;
  try {
    const order = JSON.parse(saved);
    const taskMap = Object.fromEntries(tasks.map((t) => [t.uuid, t]));
    const ordered = order.map((uuid) => taskMap[uuid]).filter(Boolean);
    const missing = tasks.filter((t) => !order.includes(t.uuid));
    return [...ordered, ...missing];
  } catch {
    return tasks;
  }
}

export const useTaskSorter = (tasks, boardUuid) => {
  const [orderedTasks, setOrderedTasks] = useState(() =>
    getOrderedTasksFromStorage(boardUuid, tasks),
  );
  const [taskSort, setTaskSort] = useState('manual');
  const [sortOrder, setSortOrder] = useState('asc');
  const [activeId, setActiveId] = useState(null);

  const sortedTasks = useMemo(() => {
    let arr;
    if (taskSort === 'manual') {
      arr = [...orderedTasks];
    } else {
      arr = [...tasks];
      switch (taskSort) {
        case 'priority':
          arr.sort((a, b) =>
            (a.priority ?? '').localeCompare(b.priority ?? ''),
          );
          break;
        case 'status':
          arr.sort((a, b) => (a.status ?? '').localeCompare(b.status ?? ''));
          break;
        case 'dueDate':
          arr.sort(
            (a, b) => new Date(a.dueDate ?? 0) - new Date(b.dueDate ?? 0),
          );
          break;
        case 'updatedAt':
          arr.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'createdAt':
        default:
          arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }
    if (sortOrder === 'desc') arr.reverse();
    return arr;
  }, [orderedTasks, tasks, taskSort, sortOrder]);

  useEffect(() => {
    if (taskSort !== 'manual') return;
    const newOrder = getOrderedTasksFromStorage(boardUuid, tasks);
    if (
      newOrder.length !== orderedTasks.length ||
      newOrder.some(
        (t, i) =>
          t.uuid !== orderedTasks[i]?.uuid ||
          t.updatedAt !== orderedTasks[i]?.updatedAt,
      )
    ) {
      setOrderedTasks(newOrder);
    }
  }, [boardUuid, tasks, taskSort, orderedTasks]);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      setActiveId(null);
      if (taskSort !== 'manual') return;
      if (!over || active.id === over.id) return;
      const oldIndex = orderedTasks.findIndex((t) => t.uuid === active.id);
      const newIndex = orderedTasks.findIndex((t) => t.uuid === over.id);
      const newOrder = arrayMove(orderedTasks, oldIndex, newIndex);
      setOrderedTasks(newOrder);
      if (boardUuid) {
        localStorage.setItem(
          `board_order_${boardUuid}`,
          JSON.stringify(newOrder.map((t) => t.uuid)),
        );
      }
    },
    [taskSort, orderedTasks, boardUuid],
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    taskSort,
    setTaskSort,
    sortOrder,
    setSortOrder,
    activeId,
    sortedTasks,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}; 