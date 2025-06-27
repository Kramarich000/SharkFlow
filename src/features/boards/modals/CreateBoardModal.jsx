import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';

import { ColorSelector } from '@common/ui';
import { useCreateBoard } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';

export function CreateBoardModal() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('transparent');
  const { mutate: createBoard, isPending } = useCreateBoard();

  const { isCreateBoardModalOpen, setIsCreateBoardModalOpen } = useModalsStore(
    useShallow((state) => ({
      isCreateBoardModalOpen: state.isCreateBoardModalOpen,
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
    })),
  );

  const handleCreateBoard = async () => {
    if (isPending) return;

    createBoard(
      { title, color },
      {
        onSuccess: () => {
          setIsCreateBoardModalOpen(false);
          setTitle('');
          setColor('transparent');
        },
      },
    );
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
              <DialogPanel className="modal-base w-full border-2 max-w-2xl transform overflow-hidden relative rounded-2xl rounded-b-none p-6 text-left align-middle shadow-xl !transition-all">
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
                      className="peer input-styles w-full input-primary"
                      placeholder=" "
                      required
                      disabled={isPending}
                      maxLength={64}
                    />
                    <label className="label-styles">
                      Введите название доски
                    </label>
                  </div>

                  <ColorSelector
                    wrapperClassName={`relative ${isPending ? 'pointer-events-none' : ''}`}
                    pickerClassName="!w-full !relative lg:!absolute !flex-row !flex-wrap"
                    color={color}
                    setColor={setColor}
                    disabled={isPending}
                  />

                  <button
                    className={`btn-primary !p-2 hidden lg:flex ${isPending ? ' btn-loading' : ''}`}
                    onClick={handleCreateBoard}
                    title="Сохранить"
                    disabled={isPending}
                    aria-disabled={isPending}
                    aria-busy={isPending}
                  >
                    {isPending ? (
                      <AiOutlineSync size={24} className="animate-spin" />
                    ) : (
                      'Создать'
                    )}
                  </button>
                  <button
                    type="button"
                    title="Закрыть"
                    className="btn-primary !p-2 w-full flex lg:hidden"
                    onClick={() => {
                      setIsCreateBoardModalOpen(false);
                      setColor('transparent');
                    }}
                  >
                    Закрыть
                  </button>
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
