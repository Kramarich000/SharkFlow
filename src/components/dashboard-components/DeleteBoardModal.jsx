import { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useBoardStore from '@store/boardStore';
import { useAuthStore } from '@store/authStore';
import { showToast } from '@utils/toast';

export default function DeleteBoardModal() {
  const token = useAuthStore((state) => state.accessToken);
  const {
    deleteBoard,
    selectedBoard,
    isDeleteBoardModalOpen,
    setIsDeleteBoardModalOpen,
  } = useBoardStore();

  const [inputValue, setInputValue] = useState('');

  const handleDeleteBoard = async () => {
    if (inputValue.trim() === selectedBoard?.title.trim()) {
      const result = await deleteBoard(token);
      if (result) {
        setInputValue('');
      }
    } else {
      showToast('Название доски неверно!', 'error');
    }
  };

  const handleClose = () => {
    setInputValue('');
    setIsDeleteBoardModalOpen(false);
  };

  return (
    <Transition appear show={isDeleteBoardModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <div className="fixed inset-0 bg-transparent bg-opacity-25" />
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full border-2 max-w-6xl h-[37vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex flex-col items-center justify-between gap-10">
                  <h2 className="text-3xl">
                    Вы уверены? Это действие необратимо!
                  </h2>
                  <p className="text-xl text-center">
                    Введите название доски ниже для удаления:
                    <b className="max-w-3xl block overflow-x-auto">
                      "{selectedBoard?.title}"
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
                    className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                    placeholder="Введите название доски для удаления"
                  />
                  <button
                    className="primary-btn !bg-red-700 hover:!bg-red-800 !w-fit"
                    onClick={handleDeleteBoard}
                  >
                    Удалить
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
