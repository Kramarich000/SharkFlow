import React from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import {
  SortableTaskCardComponent,
  TaskCard,
} from '@features/tasks/components';

const SortableTaskCard = SortableTaskCardComponent;

function TaskListComponent({
  taskSort,
  sortedTasks,
  activeId,
  handleDragStart,
  handleDragEnd,
  handleDragCancel,
}) {
  if (taskSort === 'manual') {
    return (
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sortedTasks.map((t) => t.uuid)}
          strategy={rectSortingStrategy}
        >
          <div
            className="mt-1 h-full sm:mt-4 mb-4 pr-1 sm:pr-4 text-center pt-4
                        grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
                        gap-[40px] overflow-y-auto overflow-x-hidden"
          >
            {sortedTasks.length ? (
              sortedTasks.map((task) => (
                <SortableTaskCard
                  key={`${task.uuid}-${task.updatedAt}`}
                  task={task}
                  isDragging={activeId === task.uuid}
                />
              ))
            ) : (
              <p className="text-gray-700 col-span-3">Задачи отсутствуют</p>
            )}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div style={{ opacity: 0.5, transform: 'scale(0.97)' }}>
              <TaskCard task={sortedTasks.find((t) => t.uuid === activeId)} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }

  return (
    <div
      className="mt-1 h-full sm:mt-4 mb-4 pr-1 sm:pr-4 text-center pt-4
                grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
                gap-[40px] overflow-y-auto overflow-x-hidden"
    >
      {sortedTasks.length ? (
        sortedTasks.map((task) => (
          <SortableTaskCard
            key={`${task.uuid}-${task.updatedAt}`}
            task={task}
          />
        ))
      ) : (
        <p className="text-gray-700 col-span-3">Задачи отсутствуют</p>
      )}
    </div>
  );
}

export const TaskList = React.memo(TaskListComponent);
