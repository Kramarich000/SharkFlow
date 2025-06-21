import { AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPlayCircle,
  FaFlag,
  FaEllipsisH,
  FaTrash,
  FaPen,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import {
  statusOptions,
  priorityOptions,
  statusStyles,
  priorityStyles,
} from '@data/taskOptions';
import AttributeSelector from '@components/dashboard-components/create-task-components/AttributeSelector';
import { useRef, useState, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import useTaskStore from '@store/taskStore';
import useModalsStore from '@store/modalsStore';

const TaskDetailsHeader = ({
  task,
  newTitle,
  setNewTitle,
  newPriority,
  setNewPriority,
  newStatus,
  setNewStatus,
  handleUpdateTask,
}) => {
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const openTaskOptionsRef = useRef(null);
  const openTaskButtonRef = useRef(null);

  const setIsDeleteTaskModalOpen = useModalsStore(
    (state) => state.setIsDeleteTaskModalOpen,
  );

  const { setIsEditing, isEditing } = useTaskStore(
    useShallow((state) => ({
      setIsEditing: state.setIsEditing,
      isEditing: state.isEditing,
    })),
  );

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

  return (
    <div
      className="grid grid-cols-1 gap-2 border-b pb-4 md:min-h-[129px] lg:grid-cols-2 relative  sm:items-center"
    >
      <div className="min-w-0">
        {isEditing ? (
          <>
            <div className="relative">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder=" "
                required
                className="peer input-styles !text-2xl sm:!text-4xl !max-h-[80px] !font-extrabold !break-words !w-full !text-left !mb-1 !tracking-tight"
              />
              <label className="label-styles !text-[16px]">
                Введите новое название
              </label>
            </div>
            <p className="text-gray-500 text-md sm:text-lg font-medium">
              Режим редактирования
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-4xl overflow-y-auto xl:overflow-y-hidden max-h-[80px] font-extrabold break-words w-full text-left mb-1 tracking-tight">
              {task.title}
            </h2>
            <p className="text-gray-500 text-md sm:text-lg font-medium">
              Сведения о задаче
            </p>
          </>
        )}
      </div>
      {isEditing ? (
        <>
          <div className="flex h-full sm:gap-3 mt-0 justify-end items-end">
            <AttributeSelector
              value={newPriority}
              onChange={setNewPriority}
              options={priorityOptions}
              placeholder="Выберите приоритет"
              optionsClassName="!top-[50px]"
            />
            <AttributeSelector
              value={newStatus}
              onChange={setNewStatus}
              options={statusOptions}
              placeholder="Выберите статус"
              optionsClassName="!top-[50px]"
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex h-full sm:gap-3 mt-0 justify-end items-end">
            <span
              className={`px-3 sm:px-5 py-1 inline-flex items-center gap-2 rounded-2xl font-semibold text-sm sm:text-base shadow-lg bg-gradient-to-r from-white/80 to-white/40 border-2 border-white/60 ${
                statusStyles[task.status] || statusStyles.DEFAULT
              }`}
              title="Статус"
            >
              {task.status === 'COMPLETED' && (
                <FaCheckCircle
                  className="inline-block text-green-500 opacity-70"
                  size={18}
                />
              )}
              {task.status === 'CANCELLED' && (
                <FaTimesCircle
                  className="inline-block text-red-500 opacity-70"
                  size={18}
                />
              )}
              {task.status === 'PENDING' && (
                <FaHourglassHalf
                  className="inline-block text-black opacity-70"
                  size={18}
                />
              )}
              {task.status === 'IN_PROGRESS' && (
                <FaPlayCircle
                  className="inline-block text-blue-500 opacity-70"
                  size={18}
                />
              )}
              {statusOptions.find((opt) => opt.value === task.status)
                ?.label || <p className="text-gray-700">— Не задано —</p>}
            </span>
            <span
              className={`px-3 sm:px-5 py-1 inline-flex items-center gap-2 rounded-2xl font-semibold text-sm sm:text-base !shadow-none  ${
                priorityStyles[task.priority] || priorityStyles.DEFAULT
              }`}
              title="Приоритет"
            >
              <FaFlag className="inline-block opacity-70" size={16} />
              {priorityOptions.find((opt) => opt.value === task.priority)
                ?.label || <p className="text-gray-700">— Не задано —</p>}
            </span>
          </div>
        </>
      )}

      <div className="absolute top-0 right-0 flex flex-col">
        <button
          ref={openTaskButtonRef}
          onClick={() => setOpenTaskOptions(!openTaskOptions)}
          className={`hover:scale-110 !transition-transform duration-200 ${openTaskOptions ? 'text-black scale-110  rotate-90' : 'text-gray-400 scale-100'} hover:text-black`}
        >
          <FaEllipsisH size={28} />
        </button>
      </div>

      <AnimatePresence>
        {openTaskOptions && (
          <div
            initial={{
              opacity: 0,
              transform: 'translateY(-10px)',
            }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-10px)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            ref={openTaskOptionsRef}
            className="flex gap-1 absolute top-10 bg-white right-0 flex-col"
          >
            {isEditing ? (
              <>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-green-100 text-green-600 rounded-lg !transition flex items-center justify-between gap-4"
                  onClick={handleUpdateTask}
                >
                  Сохранить <FaSave />
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg !transition flex items-center justify-between gap-4"
                  onClick={() => setIsEditing(false)}
                >
                  Отмена <FaTimes />
                </button>
              </>
            ) : (
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg !transition flex items-center justify-between gap-4"
                onClick={() => setIsEditing(true)}
              >
                Изменить <FaPen />
              </button>
            )}

            <button
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg !transition flex items-center justify-between gap-4"
              onClick={() => {
                setIsDeleteTaskModalOpen(true);
              }}
            >
              Удалить <FaTrash />
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskDetailsHeader;
