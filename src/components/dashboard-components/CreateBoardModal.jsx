import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { ColorSelector } from '@components/dashboard-components/ColorSelector';
import useBoardStore from '@store/boardStore';

export default function CreateBoardModal() {
  const {
    title,
    color,
    setTitle,
    setColor,
    createBoard,
    isCreateBoardModalOpen,
    setIsCreateBoardModalOpen,
  } = useBoardStore();

  const handleCreateBoard = async () => {
    await createBoard();
  };

  return (
    <Transition appear show={isCreateBoardModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-9999"
        onClose={() => setIsCreateBoardModalOpen(false)}
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
              <DialogPanel className="w-full border-2 max-w-6xl h-[280px] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex items-center justify-between">
                  <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateBoard();
                    }}
                    className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                    placeholder="Введите название доски"
                  />
                  <ColorSelector
                    wrapperClassName="relative"
                    pickerClassName="top-[-22px] left-[-270px]"
                    color={color}
                    setColor={setColor}
                  />
                  <button
                    className="!p-2 mx-20"
                    onClick={handleCreateBoard}
                    title="Сохранить"
                  >
                    <FaCheck size={26} />
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                    onClick={() => setIsCreateBoardModalOpen(false)}
                  >
                    <IoClose size={40} />
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
