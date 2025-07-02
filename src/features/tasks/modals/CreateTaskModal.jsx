import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { IoClose } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import { useTaskStore } from '@features/tasks';
import { useBoardStore } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';
import { TaskFormInputs, TaskFormSelectors } from '@features/tasks';
import { Button } from '@common/ui/utilities/Button';

export function CreateTaskModal() {
  const [load, setLoad] = useState(false);
  const { selectedBoard } = useBoardStore();
  const {
    title,
    dueDate,
    description,
    priority,
    status,
    setTitle,
    setDueDate,
    setDescription,
    setPriority,
    setStatus,
    createTask,
  } = useTaskStore(
    useShallow((state) => ({
      title: state.title,
      dueDate: state.dueDate,
      description: state.description,
      priority: state.priority,
      status: state.status,
      setTitle: state.setTitle,
      setDueDate: state.setDueDate,
      setDescription: state.setDescription,
      setPriority: state.setPriority,
      setStatus: state.setStatus,
      createTask: state.createTask,
    })),
  );

  const { isCreateTaskModalOpen, setIsCreateTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      isCreateTaskModalOpen: state.isCreateTaskModalOpen,
      setIsCreateTaskModalOpen: state.setIsCreateTaskModalOpen,
    })),
  );

  const handleCreateTask = async () => {
    setLoad(true);
    try {
      const newTask = await createTask(selectedBoard.uuid);
      if (newTask) {
        setTitle('');
        setDescription(null);
        setPriority(null);
        setStatus('PENDING');
        setDueDate(null);
        setIsCreateTaskModalOpen(false);
        setLoad(false);
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <Transition appear show={isCreateTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsCreateTaskModalOpen(false)}
      >
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="modal-base w-full border-2 max-w-6xl h-full transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all">
                <h2 className="text-[31px] text-center mb-4">
                  Создание задачи
                </h2>
                <div className="w-full flex flex-col gap-8">
                  <TaskFormInputs
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    handleCreateTask={handleCreateTask}
                  />
                  <TaskFormSelectors
                    priority={priority}
                    setPriority={setPriority}
                    status={status}
                    setStatus={setStatus}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                  />

                  <Button
                    variant="primary"
                    onClick={handleCreateTask}
                    title="Создать задачу"
                    disabled={load}
                  >
                    {load ? (
                      <AiOutlineSync className="animate-spin" size={23} />
                    ) : (
                      <>Создать</>
                    )}
                  </Button>
                </div>
                <button
                  type="button"
                  title="Закрыть"
                  className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                  onClick={() => setIsCreateTaskModalOpen(false)}
                >
                  <IoClose size={40} />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
