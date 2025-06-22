import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import DOMPurify from 'dompurify';

import { statusCardStyles } from '@data/taskOptions';

import TaskStatusSidebar from '@components/task-components/details/TaskStatusSidebar';
import TaskDetailsHeader from '@components/task-components/details/TaskDetailsHeader';
import TaskDeadline from '@components/task-components/details/TaskDeadline';
import TaskDescription from '@components/task-components/details/TaskDescription';
import TaskTimestamps from '@components/task-components/details/TaskTimestamps';
import { useTaskUpdate } from '@hooks/useTaskUpdate';

export default function TaskDetailsModal() {
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

  // Используем кастомный хук для логики обновления задачи
  const taskUpdate = useTaskUpdate(selectedTask);

  if (!selectedTask) return null;

  const showDeadline =
    selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'CANCELLED';

  const handleClose = () => {
    setIsDetailsTaskModalOpen(false);
  };

  return (
    <Transition appear show={isDetailsTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={handleClose}
      >
        <div className="fixed inset-0">
          <div className="flex h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel
                className={`w-full xl:w-[95%] h-full z-9998 flex flex-col !bg-white !border-4 lg:!border-l-0 !border-b-0 transform overflow-hidden relative rounded-2xl rounded-b-none p-0 text-left align-middle shadow-2xl !transition-all ${
                  statusCardStyles[selectedTask.status] ||
                  statusCardStyles.DEFAULT
                }`}
              >
                <div className="flex h-full overflow-hidden">
                  <TaskStatusSidebar task={selectedTask} />
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-100 bg-white">
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

                    <div className="flex-1 overflow-y-auto p-6 pt-4 bg-gray-50">
                      <TaskDescription
                        task={selectedTask}
                        newDescription={taskUpdate.newDescription}
                        setNewDescription={taskUpdate.setNewDescription}
                      />
                    </div>

                    <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100 bg-white">
                      <TaskTimestamps task={selectedTask} />
                      <button
                        className="primary-btn"
                        onClick={handleClose}
                      >
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
