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

export default function CreateBoardModal({
  isOpen,
  onClose,
  title,
  setTitle,
  color,
  setColor,
  handleCreateProject,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-transparent bg-opacity-25" />
        <div className="fixed inset-0">
          <div className="flex min-h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-1"
              leave="ease-in duration-200"
              leaveFrom="translate-y-1"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full border-2 max-w-6xl h-[50vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex items-center justify-between">
                  <div className="">
                    <input
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateProject();
                      }}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите название доски"
                    />
                    <ColorSelector
                      wrapperClassName="relative"
                      pickerClassName="top-[-50px] left-75"
                      color={color}
                      setColor={setColor}
                    />
                  </div>
                  <button
                    className="!p-2 mr-20"
                    onClick={handleCreateProject}
                    title="Сохранить"
                  >
                    <FaCheck size={26} />
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                    onClick={onClose}
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
