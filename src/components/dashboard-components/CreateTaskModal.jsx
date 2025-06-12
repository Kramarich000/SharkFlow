import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import useTaskStore from '@store/taskStore';
import useBoardStore from '@store/boardStore';
import { useAuthStore } from '@store/authStore';

export default function CreateTaskModal() {
  const token = useAuthStore((state) => state.accessToken);
  const { selectedBoard } = useBoardStore();
  const {
    taskState,
    setTaskState,
    isCreateTaskModalOpen,
    setIsCreateTaskModalOpen,
    createTask,
  } = useTaskStore();

  const handleCreateTask = async () => {
    const newTask = await createTask(token, selectedBoard.uuid);
    if (newTask) {
      setIsCreateTaskModalOpen(false);
    }
  };

  return (
    <Transition appear show={isCreateTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsCreateTaskModalOpen(false)}
      >
        <div className="fixed inset-0 bg-transparent bg-opacity-25" />
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-1"
              leave="ease-in duration-200"
              leaveFrom="translate-y-1"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full border-2 max-w-6xl h-[50vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <input
                      autoFocus
                      value={taskState.title}
                      onChange={(e) => setTaskState({ title: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateTask();
                      }}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите название задачи"
                    />
                    <textarea
                      value={taskState.description}
                      onChange={(e) =>
                        setTaskState({ description: e.target.value })
                      }
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-lg mt-4 resize-none"
                      placeholder="Введите описание задачи"
                      rows={4}
                    />
                    <input
                      type="datetime-local"
                      value={taskState.deadline}
                      onChange={(e) =>
                        setTaskState({ deadline: e.target.value })
                      }
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-lg mt-4"
                    />
                  </div>
                  <button
                    className="!p-2 mr-20"
                    onClick={handleCreateTask}
                    title="Сохранить"
                  >
                    <FaCheck size={26} />
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                    onClick={() => setIsCreateTaskModalOpen(false)}
                  >
                    <IoClose size={40} />
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
