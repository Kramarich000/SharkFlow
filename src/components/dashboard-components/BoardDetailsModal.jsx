import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { IoCloseOutline, IoClose, IoCheckmark } from 'react-icons/io5';
import { ColorSelector } from '@components/dashboard-components/ColorSelector';
import useBoardStore from '@store/boardStore';
import useTaskStore from '@store/taskStore';
import { useAuthStore } from '@store/authStore';

export default function BoardDetailsModal() {
  const token = useAuthStore((state) => state.accessToken);
  const {
    selectedBoard,
    isOpen,
    isEditingTitle,
    newTitle,
    newColor,
    setNewTitle,
    setNewColor,
    setIsOpen,
    setIsEditingTitle,
    updateBoard,
  } = useBoardStore();

  const { setIsCreateTaskModalOpen } = useTaskStore();

  const saveUpdateBoard = () => {
    updateBoard(token);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
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
              <DialogPanel
                className="w-full max-w-6xl h-[80vh] !border-4 bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all"
                style={{ borderColor: `#${selectedBoard?.color}` }}
              >
                {' '}
                <ColorSelector
                  wrapperClassName="absolute z-50"
                  pickerClassName="top-[50px]"
                  color={newColor}
                  setColor={setNewColor}
                />
                <div className="relative flex items-center justify-center px-[40px]">
                  {isEditingTitle ? (
                    <>
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveUpdateBoard();
                          if (e.key === 'Escape') setIsEditingTitle(false);
                        }}
                        autoFocus
                        className="text-center text-4xl border-b-2 border-[#111111] focus:outline-none w-full"
                      />

                      <button
                        className="!p-2"
                        onClick={saveUpdateBoard}
                        title="Сохранить"
                      >
                        <IoCheckmark size={32} />
                      </button>
                      <button
                        className="!p-2"
                        onClick={() => setIsEditingTitle(false)}
                        title="Отмена"
                      >
                        <IoCloseOutline size={32} />
                      </button>
                    </>
                  ) : (
                    <>
                      <DialogTitle
                        onClick={() => setIsEditingTitle(true)}
                        className="text-center text-4xl whitespace-nowrap overflow-x-auto overflow-y-hidden border-b-2 border-transparent"
                      >
                        {selectedBoard?.title}
                      </DialogTitle>
                      <button
                        onClick={() => setIsEditingTitle(true)}
                        title="Редактировать"
                      >
                        <FaPencilAlt size={25} />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-4 pb-20 text-center grid justify-items-center max-h-full grid-cols-2 gap-[40px] overflow-y-auto">
                  {selectedBoard?.tasks?.length ? (
                    selectedBoard.tasks.map((task) => (
                      <div
                        key={task.uuid}
                        className="border-2 relative w-full rounded-3xl py-2 flex flex-col gap-2 px-6"
                      >
                        <p className="text-sm text-left">
                          <span
                            className={`${
                              task.completed
                                ? 'text-green-600 bg-green-100'
                                : 'text-red-600 bg-red-00'
                            } rounded-2xl px-1.5`}
                          >
                            {task.completed ? 'Выполнено' : 'В процессе'}
                          </span>
                        </p>
                        <p className="font-semibold">{task.title}</p>

                        <div className="text-sm text-left text-gray-900 list-decimal list-inside">
                          {Array.isArray(task.description) ? (
                            task.description.map((line, index) => (
                              <p key={index}>{line}</p>
                            ))
                          ) : typeof task.description === 'string' &&
                            task.description.trim() ? (
                            task.description
                              .split('\n')
                              .map((line, index) => <p key={index}>{line}</p>)
                          ) : (
                            <p className="text-center">Без описания</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-700 text-center col-span-2">
                      Задачи отсутствуют
                    </p>
                  )}
                  <button
                    key="create-task"
                    className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl relative col-span-2"
                    onClick={() => setIsCreateTaskModalOpen(true)}
                  >
                    <FaPlus size={30} color="rgba(0,0,0,.3)" />
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex !transition-transform absolute right-0 justify-center px-4 py-2 text-sm top-[5px]"
                  onClick={() => setIsOpen(false)}
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
