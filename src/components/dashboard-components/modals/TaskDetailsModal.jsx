import { Fragment, useState, useEffect } from 'react';
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

export default function TaskDetailsModal() {
  const { isDetailsTaskModalOpen, setIsDetailsTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsDetailsTaskModalOpen: state.setIsDetailsTaskModalOpen,
      isDetailsTaskModalOpen: state.isDetailsTaskModalOpen,
    })),
  );

  const { setIsEditing, isEditing } = useTaskStore(
    useShallow((state) => ({
      setIsEditing: state.setIsEditing,
      isEditing: state.isEditing,
    })),
  );

  const { updateTask, selectedTask } = useTaskStore(
    useShallow((state) => ({
      updateTask: state.updateTask,
      selectedTask: state.selectedTask,
    })),
  );

  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setNewTitle(selectedTask.title);
      setNewDueDate(selectedTask.dueDate);
      setNewDescription(selectedTask.description);
      setNewPriority(selectedTask.priority);
      setNewStatus(selectedTask.status);
    }
  }, [selectedTask]);

  const handleUpdateTask = async () => {
    const updatedFields = {};

    const newDueDateISO =
      newDueDate instanceof Date ? newDueDate.toISOString() : newDueDate;

    const sanitizedDescription = DOMPurify.sanitize(newDescription);

    if (newTitle !== selectedTask.title) updatedFields.title = newTitle;
    if (newDueDateISO !== selectedTask.dueDate)
      updatedFields.dueDate = newDueDateISO;
    if (sanitizedDescription !== selectedTask.description)
      updatedFields.description = sanitizedDescription;
    if (newPriority !== selectedTask.priority)
      updatedFields.priority = newPriority;
    if (newStatus !== selectedTask.status) updatedFields.status = newStatus;

    if (Object.keys(updatedFields).length > 0) {
      await updateTask({
        uuid: selectedTask.uuid,
        ...updatedFields,
      });
    } else {
      setIsEditing(false);
    }
  };

  if (!selectedTask) return null;

  const showDeadline =
    selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'CANCELLED';

  return (
    <Transition appear show={isDetailsTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsDetailsTaskModalOpen(false)}
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
                className={`w-full xl:w-[75%] h-full z-9998 flex flex-col !bg-white !border-4 lg:!border-l-0 !border-b-0 transform overflow-hidden relative rounded-2xl rounded-b-none p-0 text-left align-middle shadow-2xl !transition-all ${
                  statusCardStyles[selectedTask.status] ||
                  statusCardStyles.DEFAULT
                }`}
              >
                <div className="flex h-full overflow-hidden min-h-0">
                  <TaskStatusSidebar task={selectedTask} />
                  <div className="flex flex-col p-4 md:p-10 gap-2 md:gap-8 md:min-h-0 min-w-0 w-full overflow-y-auto">
                    <TaskDetailsHeader
                      task={selectedTask}
                      newTitle={newTitle}
                      setNewTitle={setNewTitle}
                      newPriority={newPriority}
                      setNewPriority={setNewPriority}
                      newStatus={newStatus}
                      setNewStatus={setNewStatus}
                      handleUpdateTask={handleUpdateTask}
                    />

                    {showDeadline || isEditing ? (
                      <TaskDeadline
                        task={selectedTask}
                        newDueDate={newDueDate}
                        setNewDueDate={setNewDueDate}
                      />
                    ) : (
                      <div className="md:min-h-[78px]"></div>
                    )}

                    <TaskDescription
                      task={selectedTask}
                      newDescription={newDescription}
                      setNewDescription={setNewDescription}
                    />

                    <TaskTimestamps task={selectedTask} />

                    <button
                      className="primary-btn !p-1 sm:!p-4"
                      onClick={() => setIsDetailsTaskModalOpen(false)}
                    >
                      Закрыть
                    </button>
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
