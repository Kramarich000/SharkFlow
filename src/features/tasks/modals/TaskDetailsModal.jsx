import { useShallow } from 'zustand/shallow';
import DOMPurify from 'dompurify';

import { useModalsStore } from '@store/modalsStore';
import { useTaskStore, useTaskUpdate } from '@features/tasks';
import {
  statusCardStyles,
  TaskStatusSidebar,
  TaskDetailsHeader,
  TaskDeadline,
  TaskDescription,
  TaskTimestamps,
} from '@features/tasks';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';

export function TaskDetailsModal() {
  const { isDetailsTaskModalOpen, setIsDetailsTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsDetailsTaskModalOpen: state.setIsDetailsTaskModalOpen,
      isDetailsTaskModalOpen: state.isDetailsTaskModalOpen,
    })),
  );

  const { isEditing } = useTaskStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

  const { selectedTask } = useTaskStore(
    useShallow((state) => ({
      selectedTask: state.selectedTask,
    })),
  );

  const taskUpdate = useTaskUpdate(selectedTask);

  if (!selectedTask) return null;

  const showDeadline =
    selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'CANCELLED';

  const handleClose = () => {
    setIsDetailsTaskModalOpen(false);
  };

  return (
    <ModalBase
      open={isDetailsTaskModalOpen}
      onClose={handleClose}
      maxWidth="w-full xl:w-[95%] h-full"
      className={`z-9998 flex flex-col !border-4 lg:!border-l-0 !border-b-0 rounded-b-none p-0 shadow-2xl !transition-all ${
        statusCardStyles[selectedTask.status] || statusCardStyles.DEFAULT
      }`}
    >
      <div className="flex h-full overflow-hidden">
        <TaskStatusSidebar task={selectedTask} />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-shrink-0 p-4 sm:p-6 pb-4 border-b border-gray-100">
            <TaskDetailsHeader
              task={selectedTask}
              newTitle={taskUpdate.newTitle}
              setNewTitle={taskUpdate.setNewTitle}
              newPriority={taskUpdate.newPriority}
              setNewPriority={taskUpdate.setNewPriority}
              newStatus={taskUpdate.newStatus}
              setNewStatus={taskUpdate.setNewStatus}
              handleUpdateTask={taskUpdate.handleUpdateTask}
            />
            {showDeadline || isEditing ? (
              <TaskDeadline
                task={selectedTask}
                newDueDate={taskUpdate.newDueDate}
                setNewDueDate={taskUpdate.setNewDueDate}
              />
            ) : (
              <div className="h-6"></div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-4 bg-gray-50">
            <TaskDescription
              task={selectedTask}
              newDescription={taskUpdate.newDescription}
              setNewDescription={taskUpdate.setNewDescription}
            />
          </div>

          <div className="flex-shrink-0 p-4 sm:p-6 pt-4 border-t border-gray-100">
            <TaskTimestamps task={selectedTask} />
            <Button variant="primary" onClick={handleClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
