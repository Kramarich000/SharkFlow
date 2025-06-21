import { dateFormatter } from '@utils/date/dateFormatter';
import { FaRegClock, FaExclamationTriangle, FaCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { baseOpts } from '@data/filterAndSortData';
import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';


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

  let badgeClass, icon, text;
  
  if (isOverdue) {
    badgeClass = 'bg-red-100 border-red-300 text-red-700';
    icon = <FaExclamationTriangle className="text-red-700" />;
    text = `Просрочено: ${dateFormatter(due.toISOString())}`;
  } else if (diffDays !== null && diffDays < 2) {
    badgeClass = 'bg-yellow-100 border-yellow-300 text-yellow-700';
    icon = <FaExclamationTriangle className="text-yellow-700" />;
    text = `Истекает: ${dateFormatter(due.toISOString())}`;
  } else if (due) {
    badgeClass = 'bg-green-100 border-green-300 text-green-700';
    icon = <FaRegClock className="text-green-700" />;
    text = dateFormatter(due.toISOString());
  } else {
    badgeClass = 'bg-gray-100 border-gray-300 text-gray-600';
    icon = <FaRegClock className="text-gray-600" />;
    text = 'Не задан';
  }

  return (                    
    <div className="flex flex-col space-y-2">
    <p className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-2"><FaChevronDown size={10} /> Дедлайн</p>
      {isEditing ? (
        <div className="relative w-full md:w-1/2">
          <Flatpickr
            id="date"
            name="date"
            onChange={(selectedDates) => setNewDueDate(selectedDates[0])}
            value={newDueDate ? [newDueDate] : []}
            options={{ ...baseOpts, minDate: todayStart }}
            className="w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            placeholder="Выберите дату..."
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      ) : (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border w-fit ${badgeClass}`}>
          {icon}
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default TaskDeadline;
