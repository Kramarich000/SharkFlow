import { motion } from 'framer-motion';
import { dateFormatter } from '@utils/date/dateFormatter';
import { FaRegClock, FaExclamationTriangle } from 'react-icons/fa';
import { baseOpts } from '@data/filterAndSortData';
import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { FaCalendarAlt } from 'react-icons/fa';

const TaskDeadline = ({ task, newDueDate, setNewDueDate }) => {
  const { isEditing } = useTaskStore(
    useShallow((state) => ({
      isEditing: state.isEditing,
    })),
  );

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const now = new Date();
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = due && now.getTime() > due.getTime();
  const diffMs = due ? due - now : null;
  const diffDays = diffMs ? diffMs / (1000 * 60 * 60 * 24) : null;

  let badgeClass =
    'bg-gradient-to-r from-yellow-100 to-yellow-300 border border-yellow-200 text-gray-700';
  let icon = <FaRegClock className="text-yellow-500 text-lg" />;
  let text = due ? dateFormatter(due.toISOString()) : '— Не задан —';

  if (isOverdue) {
    badgeClass =
      'bg-gradient-to-r from-red-100 to-red-200 border border-red-300 text-red-700';
    icon = <FaExclamationTriangle className="text-red-700 text-lg" />;
    text = 'Просрочено! ' + dateFormatter(due.toISOString());
  } else if (diffDays !== null && diffDays < 2) {
    badgeClass =
      'bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 text-yellow-700';
    icon = <FaExclamationTriangle className="text-yellow-700 text-lg" />;
    text = 'Скоро! ' + dateFormatter(due.toISOString());
  }

  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col gap-2"
    >
      <b className="text-lg">Дедлайн:</b>
      {isEditing ? (
        <div className="relative sm:col-span-2 md:col-span-1 w-full mt-1">
          <Flatpickr
            id="date"
            name="date"
            onChange={(selectedDates) => {
              setNewDueDate(selectedDates[0]);
            }}
            value={newDueDate ? [newDueDate] : []}
            options={{ ...baseOpts, minDate: todayStart }}
            className="calendar-styles !text-center"
            placeholder="Дата окончания"
          />
          <FaCalendarAlt className="absolute right-2 bottom-3.5 pointer-events-none" />
        </div>
      ) : (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`group flex items-center px-1 py-1 gap-1 md:gap-3 text-center text-sm sm:text-base rounded-2xl md:px-5 md:py-2 w-fit shadow-lg font-semibold ${due ? badgeClass : 'bg-gray-100 border border-gray-300 text-gray-600'}`}
        >
          {icon}
          {text}
        </motion.span>
      )}
    </motion.div>
  );
};

export default TaskDeadline;
