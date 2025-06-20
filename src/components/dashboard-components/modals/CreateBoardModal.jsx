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
import useModalsStore from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';

export default function CreateBoardModal() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('transparent');
  const { createBoard } = useBoardStore(
    useShallow((state) => ({
      createBoard: state.createBoard,
    })),
  );

  const { isCreateBoardModalOpen, setIsCreateBoardModalOpen } = useModalsStore(
    useShallow((state) => ({
      isCreateBoardModalOpen: state.isCreateBoardModalOpen,
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
    })),
  );

  const [load, setLoad] = useState(false);

  const handleCreateBoard = async () => {
    if (load) return;
    setLoad(true);
    try {
      const success = await createBoard({ title, color });
      if (success) {
        setIsCreateBoardModalOpen(false);
        setTitle('');
        setColor('transparent');
      }
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
        onClose={() => {
          setIsCreateBoardModalOpen(false);
          setColor('transparent');
        }}
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
              <DialogPanel className="w-full border-2 max-w-2xl transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <h2 className="text-[31px] text-center mb-4">Создание доски</h2>
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="relative w-full">
                    <input
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateBoard();
                        }
                      }}
                      className="peer input-styles w-full"
                      placeholder=" "
                      required
                      disabled={load}
                      maxLength={64}
                    />
                    <label className="label-styles">
                      Введите название доски
                    </label>
                  </div>

                  <ColorSelector
                    wrapperClassName={`relative ${load ? 'pointer-events-none' : ''}`}
                    pickerClassName="!w-full !relative lg:!absolute !flex-row !flex-wrap"
                    color={color}
                    setColor={setColor}
                    disabled={load}
                  />

                  <button
                    className="primary-btn !p-2 hidden lg:flex items-center justify-center"
                    onClick={handleCreateBoard}
                    title="Сохранить"
                    disabled={load}
                    aria-disabled={load}
                    aria-busy={load}
                  >
                    {load ? (
                      <AiOutlineSync size={24} className="animate-spin" />
                    ) : (
                      'Создать'
                    )}
                  </button>
                  <div className="flex flex-col gap-2 w-full lg:hidden">
                    <button
                      className="block primary-btn lg:hidden"
                      onClick={handleCreateBoard}
                      title="Сохранить"
                      disabled={load}
                      aria-disabled={load}
                      aria-busy={load}
                    >
                      {load ? (
                        <AiOutlineSync size={26} className="animate-spin" />
                      ) : (
                        <>Создать</>
                      )}
                    </button>
                    <button
                      type="button"
                      title="Закрыть"
                      className=" primary-btn !block lg:!hidden"
                      onClick={() => {
                        setIsCreateBoardModalOpen(false);
                        setColor('transparent');
                      }}
                    >
                      Закрыть
                    </button>
                  </div>
                  <div className="mt-6 hidden lg:inline-flex">
                    <button
                      type="button"
                      title="Закрыть"
                      className="!transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                      onClick={() => {
                        setIsCreateBoardModalOpen(false);
                        setColor('transparent');
                      }}
                    >
                      <IoClose size={40} />
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
