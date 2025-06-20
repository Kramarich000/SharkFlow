import { Fragment, useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useBoardStore from '@store/boardStore';
import useModalsStore from '@store/modalsStore';
import useTaskStore from '@store/taskStore';
import BoardHeader from '@components/dashboard-components/board-details/BoardHeader';
import BoardLoader from '@components/dashboard-components/board-details/BoardLoader';
import TaskList from '@components/dashboard-components/board-details/TaskList';
import TaskSortControl from '@components/dashboard-components/board-details/TaskSortControl';
import { useTaskSorter } from '@hooks/useTaskSorter';

export default function BoardDetailsModal() {
  const { selectedBoard, updateBoard } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
      updateBoard: state.updateBoard,
    })),
  );
  const {
    setIsDeleteBoardModalOpen,
    isDetailsBoardModalOpen,
    setIsDetailsBoardModalOpen,
    setIsCreateTaskModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDeleteBoardModalOpen: state.setIsDeleteBoardModalOpen,
      isDetailsBoardModalOpen: state.isDetailsBoardModalOpen,
      setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
      setIsCreateTaskModalOpen: state.setIsCreateTaskModalOpen,
    })),
  );

  const { getCurrentBoardTasks } = useTaskStore();
  const tasks = getCurrentBoardTasks();

  const boardUuid = selectedBoard?.uuid;
  const isLoading = useTaskStore((state) => state.loadingBoards[boardUuid]);

  const [isEditing, setisEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newColor, setNewColor] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);
  const [newIsFavorite, setNewIsFavorite] = useState(false);

  useEffect(() => {
    if (selectedBoard) {
      setNewTitle(selectedBoard.title);
      setNewColor(selectedBoard.color);
      setNewIsPinned(selectedBoard.isPinned ?? false);
      setNewIsFavorite(selectedBoard.isFavorite ?? false);
      setisEditing(false);
    }
  }, [selectedBoard]);

  const [load, setLoad] = useState(false);

  const {
    taskSort,
    setTaskSort,
    sortOrder,
    setSortOrder,
    activeId,
    sortedTasks,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  } = useTaskSorter(tasks, boardUuid);

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
      setisEditing(false);
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
                className="w-full h-full md:h-[93%] border-4 border-b-0 z-9998 flex flex-col bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-3 sm:p-6 text-left align-middle shadow-xl !transition-all"
                style={{
                  borderColor: selectedBoard?.color?.startsWith('#')
                    ? selectedBoard?.color
                    : `#${selectedBoard?.color}`,
                }}
              >
                <BoardHeader
                  isEditing={isEditing}
                  newTitle={newTitle}
                  setNewTitle={setNewTitle}
                  saveUpdateBoard={saveUpdateBoard}
                  setisEditing={setisEditing}
                  selectedBoard={selectedBoard}
                  load={load}
                  saveDeleteBoard={saveDeleteBoard}
                  newColor={newColor}
                  setNewColor={setNewColor}
                  setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
                />

                {!isLoading ? (
                  <>
                    <TaskSortControl
                      taskSort={taskSort}
                      setTaskSort={setTaskSort}
                      sortOrder={sortOrder}
                      setSortOrder={setSortOrder}
                    />

                    <TaskList
                      taskSort={taskSort}
                      sortedTasks={sortedTasks}
                      activeId={activeId}
                      handleDragStart={handleDragStart}
                      handleDragEnd={handleDragEnd}
                      handleDragCancel={handleDragCancel}
                    />
                  </>
                ) : (
                  <BoardLoader />
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
