import React from 'react';
import { TaskSortControl, TaskList } from '@features/tasks';
import { BoardLoader } from '@features/boards';

function BoardContentComponent({
  isLoading,
  taskSort,
  setTaskSort,
  sortOrder,
  setSortOrder,
  activeId,
  sortedTasks,
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
}) {
  if (isLoading) {
    return <BoardLoader />;
  }

  return (
    <>
      <TaskSortControl
        taskSort={taskSort}
        setTaskSort={setTaskSort}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <TaskList
        taskSort={taskSort}
        sortedTasks={sortedTasks}
        activeId={activeId}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragCancel={handleDragCancel}
      />
    </>
  );
}

export const BoardContent = React.memo(BoardContentComponent);
