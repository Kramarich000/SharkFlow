import { Fragment, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { IoClose } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import { useTaskStore } from '@features/tasks';
import { useBoardStore } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';

export function DeleteTaskModal() {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { isDeleteTaskModalOpen, setIsDeleteTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      isDeleteTaskModalOpen: state.isDeleteTaskModalOpen,
      setIsDeleteTaskModalOpen: state.setIsDeleteTaskModalOpen,
    })),
  );

  const [load, setLoad] = useState(false);

  const handleDeleteTask = async () => {
    setLoad(true);
    try {
      const deletedTask = await deleteTask();
      if (deletedTask) {
        setIsDeleteTaskModalOpen(false);
        setLoad(false);
      }
    } finally {
      setLoad(false);
    }
  };
  console.log('sadadasd');

  return (
    <Transition appear show={isDeleteTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsDeleteTaskModalOpen(false)}
      >
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
                <h2 className="text-[31px] text-center mb-4">
                  Удаление задачи
                </h2>
                <p className="text-xl text-center mb-6">
                  Вы действительно хотите удалить задачу?
                </p>
                <div className="w-full flex gap-4">
                  <button
                    className="btn-primary !m-0 !p-2 !mt-auto"
                    title="Отмена"
                    onClick={() => setIsDeleteTaskModalOpen(false)}
                  >
                    Отмена
                  </button>
                  <button
                    className="btn-primary flex items-center justify-center !m-0 !p-2 !mt-auto"
                    onClick={handleDeleteTask}
                    title="Удалить задачу"
                  >
                    {load ? (
                      <AiOutlineSync
                        className="animate-spin !text-white"
                        size={24}
                      />
                    ) : (
                      <>Удалить</>
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
