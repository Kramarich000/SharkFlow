import { FaChevronDown, FaPen, FaSave, FaTimes, FaTrash, FaEllipsisH, FaArrowUp, FaEquals, FaArrowDown, FaCheckCircle, FaPlayCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import useModalsStore from '@store/modalsStore';
import React from 'react';
import Select from '@components/main-components/Select';
import DropdownMenu from '@components/main-components/DropdownMenu';
import { priorityOptions, statusOptions } from '@data/taskOptions';

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
  const { setIsDeleteTaskModalOpen } = useModalsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const titleInputRef = useRef(null);

  const priorityLabel = priorityOptions.find(opt => opt.value === newPriority)?.label || 'Не указан';
  const statusLabel = statusOptions.find(opt => opt.value === newStatus)?.label || 'Не указан';

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

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

  // Подготавливаем опции с иконками для Select
  const prioritySelectOptions = priorityOptions.map(option => ({
    value: option.value,
    label: option.label,
    icon: priorityIcons[option.value] ? React.createElement(priorityIcons[option.value]) : null,
  }));

  const statusSelectOptions = statusOptions.map(option => ({
    value: option.value,
    label: option.label,
    icon: statusIcons[option.value] ? React.createElement(statusIcons[option.value]) : null,
  }));

  const triggerButton = (
    <button
      className={`p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 ${openTaskOptions ? 'bg-gray-200' : ''}`}
      title="Действия"
    >
      <FaEllipsisH size={20} className="text-gray-600" />
    </button>
  );

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
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 w-full border-b-2 border-transparent focus:border-black focus:outline-none !transition duration-200"
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
            className={`p-2 rounded-full hover:bg-gray-200 !transition-colors duration-200 ${openTaskOptions ? 'bg-gray-200' : ''}`}
            title="Действия"
          >
            <FaEllipsisH size={20} className="text-gray-600" />
          </button>
          
          <AnimatePresence>
            {openTaskOptions && (
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transform: 'translateY(-10px)'  }}
                ref={openTaskOptionsRef}
                className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-lg z-20 border border-gray-100 p-2"
              >
                {isEditing ? (
                  <>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-green-100 text-green-600 rounded-lg font-medium !transition flex items-center justify-between gap-4" 
                      onClick={handleUpdateTask}
                    >
                      Сохранить <FaSave />
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-lg font-medium !transition flex items-center justify-between gap-4" 
                      onClick={() => setIsEditing(false)}
                    >
                      Отмена <FaTimes />
                    </button>
                  </>
                ) : (
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 rounded-lg font-medium !transition flex items-center justify-between gap-4" 
                    onClick={() => setIsEditing(true)}
                  >
                    Редактировать <FaPen />
                  </button>
                )}
                <div className="border-t border-gray-100 my-2"></div>
                <button 
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg font-medium !transition flex items-center justify-between gap-4" 
                  onClick={() => { 
                    setIsDeleteTaskModalOpen(true); 
                    setOpenTaskOptions(false); 
                  }}
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
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2">
            <FaChevronDown size={10} /> Приоритет
          </p>
          {isEditing ? (
            <Select
              value={newPriority}
              onChange={setNewPriority}
              options={prioritySelectOptions}
              placeholder="Выберите приоритет"
              size="sm"
              variant="outlined"
              showCheckmark={true}
            />
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
            <Select
              value={newStatus}
              onChange={setNewStatus}
              options={statusSelectOptions}
              placeholder="Выберите статус"
              size="sm"
              variant="outlined"
              showCheckmark={true}
            />
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
