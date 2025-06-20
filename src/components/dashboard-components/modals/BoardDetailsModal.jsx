import { Fragment, useState, useMemo, useEffect } from 'react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useShallow } from 'zustand/react/shallow';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
} from '@headlessui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoCloseOutline, IoCheckmark } from 'react-icons/io5';
import { ColorSelector } from '@components/dashboard-components/ColorSelector';
import { IoMdSettings } from 'react-icons/io';
import useBoardStore from '@store/boardStore';
import { AiOutlineSync } from 'react-icons/ai';
import useModalsStore from '@store/modalsStore';
import useTaskStore from '@store/taskStore';
import TaskCard from '@components/task-components/TaskCard';
import SortableTaskCard from '@components/dashboard-components/dnd/SortableTaskCard';
import { motion } from 'framer-motion';
import { taskSortOptions } from '@data/filterAndSortData';

export default function BoardDetailsModal() {
  const {
    selectedBoard,
    isEditing,
    newTitle,
    newColor,
    newIsPinned,
    newIsFavorite,
    setNewTitle,
    setNewColor,
    setisEditing,
    updateBoard,
  } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
      isEditing: state.isEditing,
      newTitle: state.newTitle,
      newColor: state.newColor,
      newIsPinned: state.newIsPinned,
      newIsFavorite: state.newIsFavorite,
      setNewTitle: state.setNewTitle,
      setNewColor: state.setNewColor,
      setisEditing: state.setisEditing,
      updateBoard: state.updateBoard,
    })),
  );
  const {
    setIsDeleteBoardModalOpen,
    isDetailsBoardModalOpen,
    setIsDetailsBoardModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDeleteBoardModalOpen: state.setIsDeleteBoardModalOpen,
      isDetailsBoardModalOpen: state.isDetailsBoardModalOpen,
      setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
    })),
  );

  const { getCurrentBoardTasks } = useTaskStore();
  const tasks = getCurrentBoardTasks();

  const { setIsCreateTaskModalOpen } = useModalsStore();

  const boardUuid = selectedBoard?.uuid;
  const isLoading = useTaskStore((state) => state.loadingBoards[boardUuid]);

  const [load, setLoad] = useState(false);

  // Вспомогательная функция для восстановления порядка
  function getOrderedTasksFromStorage(boardUuid, tasks) {
    if (!boardUuid) return tasks;
    const saved = localStorage.getItem(`board_order_${boardUuid}`);
    if (!saved) return tasks;
    try {
      const order = JSON.parse(saved);
      // Сохраняем только те задачи, которые есть сейчас
      const taskMap = Object.fromEntries(tasks.map(t => [t.uuid, t]));
      const ordered = order.map(uuid => taskMap[uuid]).filter(Boolean);
      // Добавляем новые задачи в конец
      const missing = tasks.filter(t => !order.includes(t.uuid));
      return [...ordered, ...missing];
    } catch {
      return tasks;
    }
  }

  // orderedTasks инициализация
  const [orderedTasks, setOrderedTasks] = useState(() => getOrderedTasksFromStorage(selectedBoard?.uuid, tasks));
  const [taskSort, setTaskSort] = useState('manual');

  const sortedTasks = useMemo(() => {
    if (taskSort === 'manual') return [...orderedTasks];
    let arr = [...tasks];
    switch (taskSort) {
      case 'priority':
        return arr.sort((a, b) => (a.priority ?? '').localeCompare(b.priority ?? ''));
      case 'status':
        return arr.sort((a, b) => (a.status ?? '').localeCompare(b.status ?? ''));
      case 'dueDate':
        return arr.sort((a, b) => new Date(a.dueDate ?? 0) - new Date(b.dueDate ?? 0));
      case 'createdAt':
      default:
        return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }, [orderedTasks, tasks, taskSort]);

  useEffect(() => {
    if (taskSort !== 'manual') return;
    setOrderedTasks(getOrderedTasksFromStorage(selectedBoard?.uuid, tasks));
  }, [selectedBoard, tasks, taskSort]);
  const handleDragStart = () => {};
  const handleDragEnd = ({ active, over }) => {
    if (taskSort !== 'manual') return;
    if (!over || active.id === over.id) return;
    const oldIndex = orderedTasks.findIndex((t) => t.uuid === active.id);
    const newIndex = orderedTasks.findIndex((t) => t.uuid === over.id);
    const newOrder = arrayMove(orderedTasks, oldIndex, newIndex);
    setOrderedTasks(newOrder);
    if (selectedBoard?.uuid) {
      localStorage.setItem(
        `board_order_${selectedBoard.uuid}`,
        JSON.stringify(newOrder.map(t => t.uuid))
      );
    }
  };
  const handleDragCancel = () => {};
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
    <Transition appear show={isDetailsBoardModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsDetailsBoardModalOpen(false)}
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
                className="w-full h-[90%] border-4 border-b-0 z-9998 flex flex-col bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-3 sm:p-6 text-left align-middle shadow-xl !transition-all"
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
                    className="text-center mb-0 sm:mb-4 text-4xl overflow-hidden overflow-ellipsis whitespace-nowrap pb-2 border-b-1 border-transparent"
                  >
                    {selectedBoard?.title}
                  </DialogTitle>
                )}
                <div
                  className={`relative flex items-center gap-2 my-2 ${isEditing ? 'justify-between' : 'justify-between'}`}
                  // onKeyDown={(e) => {
                  //   if (e.key === 'Enter') saveUpdateBoard();
                  //   if (e.key === 'Escape') setisEditing(false);
                  // }}
                >
                  {isEditing ? (
                    <>
                      <button
                        className={`!p-2 ${load ? '' : 'group'}`}
                        onClick={saveDeleteBoard}
                        disabled={load}
                        title="Удалить доску"
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
                        className="!p-2"
                        onClick={saveUpdateBoard}
                        title="Сохранить"
                        disabled={load}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            saveUpdateBoard();
                          }
                        }}
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
                        className="primary-btn !p-1 sm:!p-2 !w-fit !m-0"
                        onClick={() => setIsCreateTaskModalOpen(true)}
                        disabled={load}
                        title="Создать задачу"
                      >
                        <div className="flex gap-4 items-center justify-center">
                          <p className="sm:text-xl font-normal">
                            Создать задачу
                          </p>{' '}
                          <FaPlus size={30} color="rgb(255, 255, 255)" />
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
                {!isLoading ? (
                  <>
                    <Listbox value={taskSort} onChange={setTaskSort}>
                      {({ open }) => (
                        <div className="relative flex items-center justify-center gap-8 max-w-[400px] mt-4">
                          <Label className="text-xl">Сортировка:</Label>
                          <ListboxButton className="secondary-btn">
                            {taskSortOptions.find((opt) => opt.id === taskSort)
                              ?.name || 'Выберите сортировку'}
                          </ListboxButton>
                          <Transition
                            as={Fragment}
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-50"
                          >
                            <ListboxOptions className="options-styles top-10 !text-center">
                              {taskSortOptions.map((opt) => (
                                <ListboxOption
                                  key={opt.id}
                                  value={opt.id}
                                  className="option-styles"
                                >
                                  {opt.name}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      )}
                    </Listbox>

                    {taskSort === 'manual' ? (
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
                          <div className="mt-1 h-full sm:mt-4 mb-4 pr-1 sm:pr-4 text-center
                                grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
                                gap-[40px] overflow-y-auto overflow-x-hidden">
                            {sortedTasks.length ? (
                              sortedTasks.map((task) => (
                                <SortableTaskCard key={task.uuid} task={task} />
                              ))
                            ) : (
                              <p className="text-gray-700 col-span-3">Задачи отсутствуют</p>
                            )}
                          </div>
                        </SortableContext>
                        <DragOverlay />
                      </DndContext>
                    ) : (
                      <div className="mt-1 h-full sm:mt-4 mb-4 pr-1 sm:pr-4 text-center
                                grid justify-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
                                gap-[40px] overflow-y-auto overflow-x-hidden">
                        {sortedTasks.length ? (
                          sortedTasks.map((task) => (
                            <SortableTaskCard key={task.uuid} task={task} />
                          ))
                        ) : (
                          <p className="text-gray-700 col-span-3">Задачи отсутствуют</p>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full mt-4 mb-4 flex-col flex items-center justify-center">
                    <motion.div
                      key="loader"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: 'linear',
                      }}
                      className="text-7xl flex gap-8 text-center"
                    >
                      <AiOutlineSync />
                    </motion.div>
                    <p className="text-4xl mt-4 animate-pulse text-center">
                      Загрузка ваших задач
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className="primary-btn !mt-auto !p-1 sm:!p-4"
                  onClick={() => setIsDetailsBoardModalOpen(false)}
                  disabled={load}
                  title="Закрыть доску"
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
