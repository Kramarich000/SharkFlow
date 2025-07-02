import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useBoardStore, useDeleteBoard } from '@features/boards';
import { AiOutlineSync } from 'react-icons/ai';
import { useModalsStore } from '@store/modalsStore';
import { Button } from '@common/ui/utilities/Button';

export function DeleteBoardModal() {
  const { selectedBoard } = useBoardStore(
    useShallow((state) => ({
      selectedBoard: state.selectedBoard,
    })),
  );
  const { mutate: deleteBoard, isPending } = useDeleteBoard();

  const {
    isDeleteBoardModalOpen,
    setIsDeleteBoardModalOpen,
    setIsDetailsBoardModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      isDeleteBoardModalOpen: state.isDeleteBoardModalOpen,
      setIsDeleteBoardModalOpen: state.setIsDeleteBoardModalOpen,
      setIsDetailsBoardModalOpen: state.setIsDetailsBoardModalOpen,
    })),
  );

  const [inputValue, setInputValue] = useState('');

  const handleDeleteBoard = async () => {
    if (isPending || !selectedBoard) return;

    if (inputValue.trim() === selectedBoard?.title.trim()) {
      deleteBoard(selectedBoard.uuid, {
        onSuccess: () => {
          setInputValue('');
          setIsDeleteBoardModalOpen(false);
          setIsDetailsBoardModalOpen(false);
        },
      });
    }
  };

  const handleClose = () => {
    setInputValue('');
    setIsDeleteBoardModalOpen(false);
  };
  return (
    <Transition appear show={isDeleteBoardModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="modal-base w-full border-2 max-w-3xl h-full transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all">
                <h2 className="text-3xl text-center mb-8">Удаление доски</h2>
                <div className="flex flex-col items-center justify-between gap-4 sm:gap-10">
                  <h2 className="text-2xl text-center">
                    Вы уверены? Это действие{' '}
                    <span className="text-red-700">необратимо</span>
                  </h2>
                  <p className="text-xl w-full flex flex-col gap-4 text-center break-words whitespace-normal">
                    Введите название доски ниже для удаления:
                    <br />
                    <b className="max-w-3xl break-words whitespace-normal block">
                      '{selectedBoard?.title}'
                    </b>
                  </p>
                  <div className="relative w-full">
                    <input
                      autoFocus
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleDeleteBoard();
                        }
                      }}
                      className="peer input-styles input-primary"
                      placeholder=" "
                      required
                      disabled={isPending}
                      maxLength={64}
                    />
                    <label className="label-styles !bg-[var(--main-modal-bg)]">
                      Введите название доски для удаления
                    </label>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleDeleteBoard}
                    disabled={isPending}
                    title="Удалить доску"
                  >
                    {isPending ? (
                      <AiOutlineSync size={23} className="animate-spin" />
                    ) : (
                      'Удалить'
                    )}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
