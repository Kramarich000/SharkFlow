import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import { priorityOptions, statusOptions } from '@data/taskOptions';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown, FaPen, FaSave, FaTimes, FaTrash, FaEllipsisH, FaArrowUp, FaEquals, FaArrowDown, FaCheckCircle, FaPlayCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { Fragment, useRef, useState, useEffect } from 'react';
import {motion, AnimatePresence } from 'framer-motion';
import useModalsStore from '@store/modalsStore';
import React from 'react';

export default React.memo(function TaskDetailsHeader({
  task,
  newTitle,
  setNewTitle,
  newPriority,
  setNewPriority,
  newStatus,
  setNewStatus,
  handleUpdateTask,
}) {
  const { isEditing, setIsEditing } = useTaskStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
      setIsEditing: state.setIsEditing,
    })),
  );
  
  const setIsDeleteTaskModalOpen = useModalsStore(
    (state) => state.setIsDeleteTaskModalOpen,
  );

  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const openTaskOptionsRef = useRef(null);
  const openTaskButtonRef = useRef(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openTaskOptionsRef.current &&
        !openTaskOptionsRef.current.contains(event.target) &&
        openTaskButtonRef.current &&
        !openTaskButtonRef.current.contains(event.target)
      ) {
        setOpenTaskOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

  const priorityLabel =
    priorityOptions.find((opt) => opt.value === newPriority)?.label || 'Не задано';
  const statusLabel =
    statusOptions.find((opt) => opt.value === newStatus)?.label || 'Не задано';

  const priorityIcons = {
    LOW: FaArrowDown,
    MEDIUM: FaEquals,
    HIGH: FaArrowUp,
  };
  
  const statusIcons = {
    PENDING: FaHourglassHalf,
    IN_PROGRESS: FaPlayCircle,
    COMPLETED: FaCheckCircle,
    CANCELLED: FaTimesCircle,
  };

  const priorityClasses = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
    DEFAULT: 'bg-gray-100 text-gray-800',
  };

  const statusClasses = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    DEFAULT: 'bg-gray-100 text-gray-800',
  };

  const currentPriorityClass = priorityClasses[newPriority] || priorityClasses.DEFAULT;
  const currentStatusClass = statusClasses[newStatus] || statusClasses.DEFAULT;
  const PriorityIcon = priorityIcons[newPriority];
  const StatusIcon = statusIcons[newStatus];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={titleInputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 w-full border-b-2 border-transparent focus:border-black focus:outline-none transition duration-200"
              placeholder="Введите название задачи"
            />
          ) : (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 break-words">
              {task.title}
            </h2>
          )}
        </div>
        
        <div className="flex-shrink-0 relative">
          <button
            ref={openTaskButtonRef}
            onClick={() => setOpenTaskOptions(!openTaskOptions)}
            className={`p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 ${openTaskOptions ? 'bg-gray-200' : ''}`}
            title="Действия"
          >
            <FaEllipsisH size={20} className="text-gray-600" />
          </button>
          
          <AnimatePresence>
            {openTaskOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                ref={openTaskOptionsRef}
                className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-20 border border-gray-100 p-2"
              >
                {isEditing ? (
                  <>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-green-100 text-green-600 rounded-lg font-medium transition flex items-center justify-between gap-4" 
                      onClick={handleUpdateTask}
                    >
                      Сохранить <FaSave />
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition flex items-center justify-between gap-4" 
                      onClick={() => setIsEditing(false)}
                    >
                      Отмена <FaTimes />
                    </button>
                  </>
                ) : (
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition flex items-center justify-between gap-4" 
                    onClick={() => setIsEditing(true)}
                  >
                    Редактировать <FaPen />
                  </button>
                )}
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg font-medium transition flex items-center justify-between gap-4" 
                  onClick={() => { 
                    setIsDeleteTaskModalOpen(true); 
                    setOpenTaskOptions(false); 
                  }}
                >
                  Удалить <FaTrash />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <FaChevronDown size={10} /> Приоритет
          </p>
          {isEditing ? (
            <Listbox value={newPriority} onChange={setNewPriority}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="flex items-center gap-2">
                    {PriorityIcon && <PriorityIcon/>}
                    {priorityLabel}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {priorityOptions.map((option) => {
                      const Icon = priorityIcons[option.value];
                      return (
                        <Listbox.Option key={option.value} className={({ active }) => `relative cursor-default select-none py-2 pl-4 pr-4 ${ active ? 'bg-blue-100 text-blue-900' : 'text-gray-900' }`} value={option.value}>
                          {({ selected }) => (
                            <span className={`flex items-center gap-2 truncate ${ selected ? 'font-medium' : 'font-normal' }`}>
                              {Icon && <Icon />}
                              {option.label}
                            </span>
                          )}
                        </Listbox.Option>
                      )
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          ) : (
            <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-sm font-medium ${currentPriorityClass}`}>
              {PriorityIcon && <PriorityIcon size={12} />}
              {priorityLabel}
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <FaChevronDown size={10} /> Статус
          </p>
          {isEditing ? (
            <Listbox value={newStatus} onChange={setNewStatus}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                   <span className="flex items-center gap-2">
                    {StatusIcon && <StatusIcon/>}
                    {statusLabel}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {statusOptions.map((option) => {
                       const Icon = statusIcons[option.value];
                       return (
                         <Listbox.Option key={option.value} className={({ active }) => `relative cursor-default select-none py-2 pl-4 pr-4 ${ active ? 'bg-blue-100 text-blue-900' : 'text-gray-900' }`} value={option.value}>
                          {({ selected }) => (
                            <span className={`flex items-center gap-2 truncate ${ selected ? 'font-medium' : 'font-normal' }`}>
                              {Icon && <Icon />}
                              {option.label}
                            </span>
                          )}
                        </Listbox.Option>
                       )
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          ) : (
            <span className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-sm font-medium ${currentStatusClass}`}>
              {StatusIcon && <StatusIcon size={12} />}
              {statusLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
