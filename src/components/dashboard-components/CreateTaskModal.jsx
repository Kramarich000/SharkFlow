import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

export default function CreateTaskModal({
  isOpen,
  onClose,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  taskDeadline,
  setTaskDeadline,
  handleCreateTask,
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
              <DialogPanel className="w-full border-2 max-w-6xl transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <div className="flex flex-col gap-4 p-4">
                  <input
                    autoFocus
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="focus-within:outline-0 w-full focus:outline-0 text-2xl"
                    placeholder="Введите название задачи"
                  />
                  <Flatpickr
                    placeholder="Выберите дедлайн"
                    value={taskDeadline}
                    onChange={([date]) => setTaskDeadline(date.toISOString())}
                    options={{
                      enableTime: true,
                      dateFormat: 'd.m.Y H:i',
                      time_24hr: true,
                      locale: Russian,
                      minDate: new Date(),
                    }}
                    className="w-full pr-5 text-xl focus:outline-none"
                  />
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="focus-within:outline-0 w-full focus:outline-0 text-xl resize-none"
                    placeholder="Введите описание задачи"
                    rows={4}
                  />
                  <button
                    className="!p-2 self-end"
                    onClick={handleCreateTask}
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
