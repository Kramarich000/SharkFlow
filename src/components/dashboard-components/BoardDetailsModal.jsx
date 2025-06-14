import { Fragment } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoCloseOutline, IoCheckmark } from 'react-icons/io5';
import { ColorSelector } from '@components/dashboard-components/ColorSelector';
import { IoMdSettings } from 'react-icons/io';
import useBoardStore from '@store/boardStore';
import useTaskStore from '@store/taskStore';

export default function BoardDetailsModal() {
  const {
    selectedBoard,
    isOpen,
    isEditing,
    newTitle,
    newColor,
    newIsPinned,
    newIsFavorite,
    setNewTitle,
    setNewColor,
    setIsOpen,
    setisEditing,
    updateBoard,
    setIsDeleteBoardModalOpen,
  } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
      isOpen: state.isOpen,
      isEditing: state.isEditing,
      newTitle: state.newTitle,
      newColor: state.newColor,
      newIsPinned: state.newIsPinned,
      newIsFavorite: state.newIsFavorite,
      setNewTitle: state.setNewTitle,
      setNewColor: state.setNewColor,
      setIsOpen: state.setIsOpen,
      setisEditing: state.setisEditing,
      updateBoard: state.updateBoard,
      setIsDeleteBoardModalOpen: state.setIsDeleteBoardModalOpen,
    })),
  );

  const { setIsCreateTaskModalOpen } = useTaskStore();

  const saveUpdateBoard = () => {
    if (!selectedBoard) return;

    const updatedFields = {};
    if (newTitle !== selectedBoard.title) {
      updatedFields.title = newTitle;
    }
    const cleanNewColor = newColor.startsWith('#')
      ? newColor.slice(1)
      : newColor;
    if (cleanNewColor !== selectedBoard.color) {
      updatedFields.color = cleanNewColor;
    }
    if (newIsPinned !== selectedBoard.isPinned) {
      updatedFields.isPinned = newIsPinned;
    }
    if (newIsFavorite !== selectedBoard.isFavorite) {
      updatedFields.isFavorite = newIsFavorite;
    }

    updateBoard({ uuid: selectedBoard.uuid, ...updatedFields });
  };

  const saveDeleteBoard = () => {
    setIsDeleteBoardModalOpen(true);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
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
                className="w-full h-[90%] max-w-6xl border-4 border-b-0 bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all"
                style={{
                  borderColor: selectedBoard?.color.startsWith('#')
                    ? selectedBoard?.color
                    : `#${selectedBoard?.color}`,
                }}
              >
                <div
                  className="relative flex items-center justify-center gap-2 px-[80px]"
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') saveUpdateBoard();
                  //   if (e.key === 'Escape') setisEditing(false);
                  // }}
                >
                  {isEditing ? (
                    <>
                      <button className="!p-2 group" onClick={saveDeleteBoard}>
                        <FaTrash
                          size={40}
                          className="group-hover:text-red-500 transition-colors"
                        />
                      </button>
                      <ColorSelector
                        wrapperClassName="absolute z-50"
                        pickerClassName="top-[50px]"
                        color={newColor}
                        setColor={setNewColor}
                      />
                      <input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveUpdateBoard();
                          if (e.key === 'Escape') setisEditing(false);
                        }}
                        autoFocus
                        className="text-center max-w-xl text-4xl border-b-2 border-[#111111] focus:outline-none w-full"
                      />
                      <button
                        className="!p-1.5"
                        onClick={saveUpdateBoard}
                        title="Сохранить"
                      >
                        <IoCheckmark size={40} />
                      </button>
                    </>
                  ) : (
                    <>
                      <DialogTitle
                        onClick={() => setisEditing(true)}
                        className="text-center max-w-xl text-4xl whitespace-nowrap overflow-x-hidden overflow-y-hidden overflow-ellipsis border-b-2 border-transparent"
                      >
                        {selectedBoard?.title}
                      </DialogTitle>
                      <button
                        onClick={() => setisEditing(true)}
                        title="Редактировать"
                      >
                        <IoMdSettings size={40} />
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
                    <FaPlus size={40} color="rgba(0,0,0,.3)" />
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex !transition-transform absolute right-0 justify-center px-4 py-2 text-sm top-[5px]"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseOutline size={40} />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
