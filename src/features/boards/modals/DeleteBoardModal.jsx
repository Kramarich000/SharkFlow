import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useBoardStore from 'features/boards/store/boardStore';
import { showToast } from '@utils/toast/showToast';
import { AiOutlineSync } from 'react-icons/ai';
import useModalsStore from '@store/modalsStore';

export function DeleteBoardModal() {
  const { deleteBoard, selectedBoard } = useBoardStore(
    useShallow((state) => ({
      deleteBoard: state.deleteBoard,
      selectedBoard: state.selectedBoard,
    })),
  );
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
  const [load, setLoad] = useState(false);

  const handleDeleteBoard = async () => {
    if (load || !selectedBoard) return;
    setLoad(true);
    if (inputValue.trim() === selectedBoard?.title.trim()) {
      try {
        const result = await deleteBoard();
        if (result) {
          setInputValue('');
          setIsDeleteBoardModalOpen(false);
          setIsDetailsBoardModalOpen(false);
        }
      } catch (error) {
      } finally {
        setLoad(false);
      }
    } else {
      setLoad(false);
      showToast('Название доски неверно', 'error');
    }
  };

  const handleClose = () => {
    setInputValue('');
    setIsDeleteBoardModalOpen(false);
  };
  // console.log(selectedBoard);
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
              <DialogPanel className="w-full border-2 max-w-3xl h-full transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
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

                  <input
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleDeleteBoard();
                      }
                    }}
                    className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-[16px] !border-b-1 !pb-2 lg:!pb-0 lg:!border-b-0 !text-center sm:!text-left sm:!text-2xl"
                    placeholder="Введите название доски для удаления"
                    disabled={load}
                    maxLength={64}
                  />
                  <button
                    className={`primary-btn !bg-red-700 hover:!bg-red-800 flex justify-center items-center ${
                      load ? '!h-[50px]' : null
                    }`}
                    onClick={handleDeleteBoard}
                    disabled={load}
                    title="Удалить доску"
                  >
                    {load ? (
                      <AiOutlineSync size={25} className="animate-spin" />
                    ) : (
                      'Удалить'
                    )}
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
