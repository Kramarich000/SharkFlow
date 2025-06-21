import { AnimatePresence, motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPlayCircle,
  FaFlag,
  FaEllipsisH,
  FaTrash,
  FaPen,
} from 'react-icons/fa';
import {
  statusOptions,
  priorityOptions,
  statusStyles,
  priorityStyles,
} from '@data/taskOptions';
import { useRef, useState, useEffect } from 'react';
import { deleteTask } from '@api/http/tasks/deleteTask';

const TaskDetailsHeader = ({ task }) => {
  const [openTaskOptions, setOpenTaskOptions] = useState(false);
  const openTaskOptionsRef = useRef(null);
  const openTaskButtonRef = useRef(null);

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
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid grid-cols-1 gap-2 border-b pb-4 md:min-h-[129px] lg:grid-cols-2 relative  sm:items-center"
    >
      <div className="min-w-0">
        <h2 className="text-2xl sm:text-4xl overflow-y-auto xl:overflow-y-hidden max-h-[80px] font-extrabold break-words w-full text-left mb-1 tracking-tight">
          {task.title}
        </h2>

        <p className="text-gray-500 text-md sm:text-lg font-medium">
          Сведения о задаче
        </p>
      </div>
      <div className="flex h-full sm:gap-3 mt-0 justify-end items-end">
        {' '}
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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
          {statusOptions.find((opt) => opt.value === task.status)?.label || (
            <p className="text-gray-700">— Не задано —</p>
          )}
        </motion.span>
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
      <div className="absolute top-0 right-0 flex flex-col">
        <motion.button
          ref={openTaskButtonRef}
          onClick={() => setOpenTaskOptions(!openTaskOptions)}
          className={`hover:scale-110 !transition-transform duration-200 ${openTaskOptions ? 'text-black scale-110  rotate-90' : 'text-gray-400 scale-100'} hover:text-black`}
        >
          <FaEllipsisH size={28} />
        </motion.button>
      </div>
      <AnimatePresence>
        {openTaskOptions && (
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(-10px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-10px)' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            ref={openTaskOptionsRef}
            className="flex gap-1 absolute top-10 bg-white right-0 flex-col"
          >
            <button className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg !transition flex items-center justify-between gap-4">
              Изменить <FaPen />
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded-lg !transition flex items-center justify-between gap-4" onClick={()=>deleteTask()}>
              Удалить <FaTrash />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskDetailsHeader;
