import { Fragment, useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import {
  useBoardStore,
  BoardHeader,
  BoardActions,
  useBoardUpdate,
} from '@features/boards';
import { BoardContent } from '@features/boards/components/BoardContent';
import { useModalsStore } from '@store/modalsStore';
import { useTaskStore, useTaskSorter } from '@features/tasks';

export function BoardDetailsModal() {
  const { selectedBoard } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
    })),
  );

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(selectedBoard?.title || '');
  const [newColor, setNewColor] = useState(selectedBoard?.color || 'transparent');

  useEffect(() => {
    if (selectedBoard) {
      setNewTitle(selectedBoard.title);
      setNewColor(selectedBoard.color);
    }
  }, [selectedBoard]);

  const { mutate: updateBoard, isPending } = useBoardUpdate();

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

  const taskSorter = useTaskSorter(tasks, boardUuid);

  const handleSaveBoard = () => {
    if (!selectedBoard) return;
    const updatedFields = {};
    if (newTitle !== selectedBoard.title) {
      updatedFields.title = newTitle;
    }
    if (newColor !== selectedBoard.color) {
      updatedFields.color = newColor;
    }

    if (Object.keys(updatedFields).length > 0) {
      updateBoard({ uuid: selectedBoard.uuid, data: updatedFields });
    }
    setIsEditing(false);
  };

  const handleDeleteBoard = () => {
    setIsDeleteBoardModalOpen(true);
  };

  const handleClose = () => {
    setIsDetailsBoardModalOpen(false);
    setIsEditing(false);
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
                className="modal-base w-full h-full md:h-[99%] border-4 border-b-0 z-9998 flex flex-col transform overflow-hidden relative rounded-2xl rounded-b-none p-3 sm:p-6 text-left align-middle shadow-xl !transition-all"
                style={{
                  borderColor: selectedBoard?.color?.startsWith('#')
                    ? selectedBoard?.color
                    : `#${selectedBoard?.color}`,
                }}
              >
                <div className="flex flex-col h-full">
                  <BoardHeader
                    isEditing={isEditing}
                    newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    saveUpdateBoard={handleSaveBoard}
                    setisEditing={setIsEditing}
                    selectedBoard={selectedBoard}
                    load={isPending}
                    saveDeleteBoard={handleDeleteBoard}
                    newColor={newColor}
                    setNewColor={setNewColor}
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

                  <BoardActions load={isPending} onClose={handleClose} />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
