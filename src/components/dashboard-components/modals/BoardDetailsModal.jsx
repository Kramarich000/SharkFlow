import { Fragment, useState } from 'react';
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
import { AiOutlineSync } from 'react-icons/ai';

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
  const [load, setLoad] = useState(false);

  const saveUpdateBoard = async () => {
    if (!selectedBoard || load) return;
    setLoad(true);

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

    try {
      await updateBoard({ uuid: selectedBoard.uuid, ...updatedFields });
    } catch (err) {
      console.error('Ошибка при обновлении доски:', err);
    } finally {
      setLoad(false);
    }
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
                className="w-full h-[90%] max-w-6xl border-4 border-b-0 z-9999 bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all"
                style={{
                  borderColor: selectedBoard?.color.startsWith('#')
                    ? selectedBoard?.color
                    : `#${selectedBoard?.color}`,
                }}
              >
                {isEditing ? (
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveUpdateBoard();
                      if (e.key === 'Escape') setisEditing(false);
                    }}
                    autoFocus
                    className="text-center text-4xl overflow-y-hidden border-b-1 mb-4 pb-2 border-[#111111] focus:outline-none w-full"
                    disabled={load}
                    maxLength={64}
                  />
                ) : (
                  <DialogTitle
                    onClick={() => setisEditing(true)}
                    className="text-center mb-4 text-4xl whitespace-nowrap overflow-x-hidden overflow-y-hidden overflow-ellipsis pb-2 border-b-1 border-transparent"
                  >
                    {selectedBoard?.title}
                  </DialogTitle>
                )}
                <div
                  className={`relative flex items-center gap-2 ${isEditing ? 'justify-between' : 'justify-between'}`}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') saveUpdateBoard();
                  //   if (e.key === 'Escape') setisEditing(false);
                  // }}
                >
                  {isEditing ? (
                    <>
                      <button
                        className={` !p-0 sm:!p-2 ${load ? '' : 'group'}`}
                        onClick={saveDeleteBoard}
                        disabled={load}
                      >
                        <FaTrash
                          size={40}
                          className="group-hover:text-red-500 transition-colors"
                        />
                      </button>
                      <div className="flex w-full items-center flex-col gap-4">
                        <ColorSelector
                          wrapperClassName={`absolute z-50 !w-full !p-0 ${load ? 'pointer-events-none' : null}`}
                          pickerClassName="!top-[50px] !p-2 !w-full !left-0 flex-wrap overflow-y-auto max-h-[500px] !absolute"
                          color={newColor}
                          setColor={setNewColor}
                          disabled={load}
                        />
                      </div>
                      <button
                        className="!p-0 sm:!p-2"
                        onClick={saveUpdateBoard}
                        title="Сохранить"
                        disabled={load}
                      >
                        {load ? (
                          <AiOutlineSync
                            size={40}
                            className="animate-spin duration-75"
                          />
                        ) : (
                          <IoCheckmark size={40} />
                        )}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        key="create-task"
                        className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl !p-0 !py-2"
                        onClick={() => setIsCreateTaskModalOpen(true)}
                        disabled={load}
                      >
                        <div className="flex gap-4 items-center justify-center">
                          <p className="text-4xl font-normal">Создать</p>{' '}
                          <FaPlus size={30} color="rgba(0,0,0,.3)" />
                        </div>
                      </button>

                      <button
                        onClick={() => setisEditing(true)}
                        title="Редактировать"
                        disabled={load}
                        className="!p-0 !py-2"
                      >
                        <IoMdSettings size={40} />
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-4 text-center grid justify-items-center max-h-full grid-cols-2 gap-[40px] overflow-y-auto">
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
                    <p className="text-gray-700 lg:text-left col-span-2 pb-60">
                      Задачи отсутствуют Lorem ipsum dolor, sit amet consectetur
                      adipisicing elit. Exercitationem perspiciatis expedita
                      omnis, itaque commodi recusandae dolorem. Nihil, earum
                      placeat! Asperiores quod nam provident, voluptas doloribus
                      fugit. Aspernatur aperiam perferendis ex. Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex. Lorem ipsum dolor, sit amet
                      consectetur adipisicing elit. Exercitationem perspiciatis
                      expedita omnis, itaque commodi recusandae dolorem. Nihil,
                      earum placeat! Asperiores quod nam provident, voluptas
                      doloribus fugit. Aspernatur aperiam perferendis ex. Lorem
                      ipsum dolor, sit amet consectetur adipisicing elit.
                      Exercitationem perspiciatis expedita omnis, itaque commodi
                      recusandae dolorem. Nihil, earum placeat! Asperiores quod
                      nam provident, voluptas doloribus fugit. Aspernatur
                      aperiam perferendis ex.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  className="primary-btn sticky bottom-0"
                  onClick={() => setIsOpen(false)}
                  disabled={load}
                >
                  Закрыть
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
