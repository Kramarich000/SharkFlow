import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from 'features/tasks/components/TaskCard';
import { memo } from 'react';

export const SortableTaskCardComponent = ({
  task,
  isDragging: isDraggingFromParent,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.uuid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        className={`
        ${isDragging ? 'shadow-lg z-50' : 'shadow-none z-auto'}
        ${
          isDraggingFromParent
            ? 'opacity-20 pointer-events-none'
            : 'opacity-100 pointer-events-auto'
        }
        !transform                  
        !transition-all
      `}
        isDragging={isDraggingFromParent}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const SortableTaskCard = memo(SortableTaskCardComponent);
