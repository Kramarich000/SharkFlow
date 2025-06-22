import { Fragment } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useBoardStore from 'features/boards/store/boardStore';
import useModalsStore from '@store/modalsStore';
import useTaskStore from 'features/tasks/store/taskStore';
import BoardHeader from 'features/boards/components/BoardHeader';
import BoardContent from 'features/boards/components/BoardContent';
import BoardActions from 'features/boards/components/BoardActions';
import { useTaskSorter } from 'features/tasks/hooks/useTaskSorter';
import { useBoardUpdate } from 'features/boards/hooks/useBoardUpdate';

export function BoardDetailsModal() {
  const { selectedBoard } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
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

  const boardUuid = selectedBoard?.uuid;
  const emptyTasks = [];

  const tasks = useTaskStore(
    (state) => state.tasksByBoard[boardUuid] || emptyTasks,
  );

  const isLoading = useTaskStore((state) => state.loadingBoards[boardUuid]);

  // Используем кастомный хук для логики обновления доски
  const boardUpdate = useBoardUpdate(selectedBoard);

  // Используем хук для сортировки задач
  const taskSorter = useTaskSorter(tasks, boardUuid);

  const handleDeleteBoard = () => {
    setIsDeleteBoardModalOpen(true);
  };

  const handleClose = () => {
    setIsDetailsBoardModalOpen(false);
  };

  return (
    <Transition appear show={isDetailsBoardModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                className="w-full h-full md:h-[99%] border-4 border-b-0 z-9998 flex flex-col bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-3 sm:p-6 text-left align-middle shadow-xl !transition-all"
                style={{
                  borderColor: selectedBoard?.color?.startsWith('#')
                    ? selectedBoard?.color
                    : `#${selectedBoard?.color}`,
                }}
              >
                <div className="flex flex-col h-full">
                  <BoardHeader
                    isEditing={boardUpdate.isEditing}
                    newTitle={boardUpdate.newTitle}
                    setNewTitle={boardUpdate.setNewTitle}
                    saveUpdateBoard={boardUpdate.saveUpdateBoard}
                    setisEditing={boardUpdate.setIsEditing}
                    selectedBoard={selectedBoard}
                    load={boardUpdate.load}
                    saveDeleteBoard={handleDeleteBoard}
                    newColor={boardUpdate.newColor}
                    setNewColor={boardUpdate.setNewColor}
                    setIsCreateTaskModalOpen={setIsCreateTaskModalOpen}
                  />

                  <BoardContent
                    isLoading={isLoading}
                    taskSort={taskSorter.taskSort}
                    setTaskSort={taskSorter.setTaskSort}
                    sortOrder={taskSorter.sortOrder}
                    setSortOrder={taskSorter.setSortOrder}
                    activeId={taskSorter.activeId}
                    sortedTasks={taskSorter.sortedTasks}
                    handleDragStart={taskSorter.handleDragStart}
                    handleDragEnd={taskSorter.handleDragEnd}
                    handleDragCancel={taskSorter.handleDragCancel}
                  />

                  <BoardActions
                    load={boardUpdate.load}
                    onClose={handleClose}
                    onDelete={handleDeleteBoard}
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
