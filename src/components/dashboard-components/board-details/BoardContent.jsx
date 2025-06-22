import React from 'react';
import TaskSortControl from './TaskSortControl';
import TaskList from './TaskList';
import BoardLoader from './BoardLoader';

export default React.memo(function BoardContent({
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
}); 