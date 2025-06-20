import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPlayCircle,
  FaFlag,
} from 'react-icons/fa';
import {
  statusOptions,
  priorityOptions,
  statusStyles,
  priorityStyles,
} from '@data/taskOptions';

const TaskDetailsHeader = ({ task }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="grid grid-cols-1 gap-2 border-b pb-4 md:min-h-[129px] lg:grid-cols-2  sm:items-center"
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
    </motion.div>
  );
};

export default TaskDetailsHeader; 