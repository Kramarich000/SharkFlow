import { Fragment } from 'react';
import { useShallow } from 'zustand/shallow';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import useTaskStore from '@store/taskStore';
import useBoardStore from '@store/boardStore';
import useModalsStore from '@store/modalsStore';
import { baseOpts } from '@data/filterAndSortData';
import { FaCalendarAlt } from 'react-icons/fa';
import { priorityOptions, statusOptions } from '@data/taskOptions';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
  Dialog,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';

export default function CreateTaskModal() {
  const { selectedBoard } = useBoardStore();
  const {
    title,
    dueDate,
    description,
    priority,
    status,
    setTitle,
    setDueDate,
    setDescription,
    setPriority,
    setStatus,
    createTask,
  } = useTaskStore(
    useShallow((state) => ({
      title: state.title,
      dueDate: state.dueDate,
      description: state.description,
      priority: state.priority,
      status: state.status,
      setTitle: state.setTitle,
      setDueDate: state.setDueDate,
      setDescription: state.setDescription,
      setPriority: state.setPriority,
      setStatus: state.setStatus,
      createTask: state.createTask,
    })),
  );

  const { isCreateTaskModalOpen, setIsCreateTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      isCreateTaskModalOpen: state.isCreateTaskModalOpen,
      setIsCreateTaskModalOpen: state.setIsCreateTaskModalOpen,
    })),
  );

  const handleCreateTask = async () => {
    const newTask = await createTask(selectedBoard.uuid);
    if (newTask) {
      setTitle('');
      setDescription(null);
      setPriority(null);
      setStatus('PENDING');
      setDueDate(null);
      setIsCreateTaskModalOpen(false);
    }
  };

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    <Transition appear show={isCreateTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsCreateTaskModalOpen(false)}
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
              <DialogPanel className="w-full border-2 max-w-6xl h-full transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                <h2 className="text-[31px] text-center mb-4">
                  Создание задачи
                </h2>

                <div className="w-full flex flex-col  gap-8">
                  <div className="relative">
                    <input
                      autoFocus
                      value={title ?? ''}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateTask();
                      }}
                      className="peer input-styles"
                      placeholder=" "
                      required
                    />
                    <label className="label-styles">
                      Введите название задачи
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      value={description ?? ''}
                      onChange={(e) => setDescription(e.target.value)}
                      className="peer input-styles resize-none"
                      placeholder=" "
                      required
                      rows={4}
                    />
                    <label className="label-styles">
                      Введите описание задачи
                    </label>
                  </div>
                  <div className="grid gap-4 w-full h-full grid-cols-1 sm:grid-cols-2 justify-items-center md:grid-cols-3">
                    <Listbox value={priority} onChange={setPriority}>
                      {({ open }) => (
                        <div className="relative w-full mt-4">
                          <ListboxButton className="secondary-btn w-full">
                            {priorityOptions.find(
                              (opt) => opt.value === priority,
                            )?.label || 'Выберите приоритет'}
                          </ListboxButton>
                          <Transition
                            as={Fragment}
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-50"
                          >
                            <ListboxOptions className="options-styles !top-[-180px] !text-center">
                              {priorityOptions.map((opt) => (
                                <ListboxOption
                                  key={opt.value}
                                  value={opt.value}
                                  className="option-styles"
                                >
                                  {opt.label}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      )}
                    </Listbox>

                    <Listbox value={status} onChange={setStatus}>
                      {({ open }) => (
                        <div className="relative w-full mt-4">
                          <ListboxButton className="secondary-btn w-full">
                            {statusOptions.find((opt) => opt.value === status)
                              ?.label || 'Выберите статус'}
                          </ListboxButton>
                          <Transition
                            as={Fragment}
                            show={open}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-50"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-50"
                          >
                            <ListboxOptions className="options-styles !top-[-235px] !text-center">
                              {statusOptions.map((opt) => (
                                <ListboxOption
                                  key={opt.value}
                                  value={opt.value}
                                  className="option-styles"
                                >
                                  {opt.label}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Transition>
                        </div>
                      )}
                    </Listbox>

                    <div className="relative sm:col-span-2 md:col-span-1 w-full mt-4">
                      <Flatpickr
                        id="date"
                        name="date"
                        onChange={(selectedDates) => {
                          setDueDate(selectedDates[0]);
                        }}
                        value={dueDate ? [dueDate] : []}
                        options={{ ...baseOpts, minDate: todayStart }}
                        className="calendar-styles !text-center"
                        placeholder="Дата окончания"
                      />
                      <FaCalendarAlt className="absolute right-2 bottom-3.5 pointer-events-none" />
                    </div>
                  </div>
                  <button
                    className="primary-btn !m-0 !p-2 !mt-auto"
                    onClick={handleCreateTask}
                    title="Создать задачу"
                  >
                    Создать
                  </button>
                </div>
                <button
                  type="button"
                  title="Закрыть"
                  className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                  onClick={() => setIsCreateTaskModalOpen(false)}
                >
                  <IoClose size={40} />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
