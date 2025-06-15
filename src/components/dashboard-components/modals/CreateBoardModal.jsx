import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
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
import { AiOutlineSync } from 'react-icons/ai';

export default function CreateBoardModal() {
  const {
    title,
    color,
    setTitle,
    setColor,
    createBoard,
    isCreateBoardModalOpen,
    setIsCreateBoardModalOpen,
  } = useBoardStore(
    useShallow((state) => ({
      title: state.title,
      color: state.color,
      setTitle: state.setTitle,
      setColor: state.setColor,
      createBoard: state.createBoard,
      isCreateBoardModalOpen: state.isCreateBoardModalOpen,
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
    })),
  );

  const [load, setLoad] = useState(false);

  const handleCreateBoard = async () => {
    if (load) return;
    setLoad(true);
    try {
      await createBoard();
    } catch (err) {
      console.error('Ошибка при создании доски:', err);
    } finally {
      setLoad(false);
    }
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
              <DialogPanel className="w-full border-2 max-w-6xl h-[180px] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex items-center justify-between">
                  <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateBoard();
                      }
                    }}
                    className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                    placeholder="Введите название доски"
                    disabled={load}
                  />
                  <ColorSelector
                    wrapperClassName={`relative ${load ? 'pointer-events-none' : null}`}
                    pickerClassName="!top-[60px] !left-[-300px]"
                    color={color}
                    setColor={setColor}
                    disabled={load}
                  />
                  <button
                    className="!p-2 mx-20"
                    onClick={handleCreateBoard}
                    title="Сохранить"
                    disabled={load}
                    aria-disabled={load}
                    aria-busy={load}
                  >
                    {load ? (
                      <AiOutlineSync size={26} className="animate-spin" />
                    ) : (
                      <FaCheck size={26} />
                    )}
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
