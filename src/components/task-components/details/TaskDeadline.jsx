import { motion } from 'framer-motion';
import { dateFormatter } from '@utils/date/dateFormatter';
import { FaRegClock, FaExclamationTriangle } from 'react-icons/fa';

const TaskDeadline = ({ task }) => {
  if (!task.dueDate) {
    return (
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex flex-col gap-2"
      >
        <b className="text-lg">Дедлайн:</b>
        <p className="text-gray-700">— Не задан —</p>
      </motion.div>
    );
  }

  const now = new Date();
  const due = new Date(task.dueDate);
  const isOverdue = now.getTime() > due.getTime();
  const diffMs = due - now;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  let badgeClass =
    'bg-gradient-to-r from-yellow-100 to-yellow-300 border border-yellow-200 text-gray-700';
  let icon = <FaRegClock className="text-yellow-500 text-lg" />;
  let text = dateFormatter(task.dueDate);
  if (isOverdue) {
    badgeClass =
      'bg-gradient-to-r from-red-200 to-red-400 border border-red-300 text-red-700';
    icon = <FaExclamationTriangle className="text-red-700 text-lg" />;
    text = 'Просрочено! ' + dateFormatter(task.dueDate);
  } else if (diffDays < 2) {
    badgeClass =
      'bg-gradient-to-r from-yellow-300 to-yellow-500 border border-yellow-400 text-yellow-900';
    icon = <FaExclamationTriangle className="text-yellow-700 text-lg" />;
    text = 'Скоро! ' + dateFormatter(task.dueDate);
  }

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col gap-2"
    >
      <b className="text-lg">Дедлайн:</b>
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`group flex items-center px-1 py-1 gap-1 md:gap-3 text-center text-sm sm:text-base rounded-2xl md:px-5 md:py-2 w-fit shadow-lg font-semibold ${badgeClass}`}
      >
        {icon}
        {text}
      </motion.span>
    </motion.div>
  );
};

export default TaskDeadline; 