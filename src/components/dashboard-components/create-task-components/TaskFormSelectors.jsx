import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { priorityOptions, statusOptions } from '@data/taskOptions';
import { baseOpts } from '@data/filterAndSortData';
import AttributeSelector from './AttributeSelector';

const TaskFormSelectors = ({
  priority,
  setPriority,
  status,
  setStatus,
  dueDate,
  setDueDate,
}) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return (
    <div className="grid gap-4 w-full h-full grid-cols-1 sm:grid-cols-2 justify-items-center md:grid-cols-3">
      <AttributeSelector
        value={priority}
        onChange={setPriority}
        options={priorityOptions}
        placeholder="Выберите приоритет"
        optionsClassName="!top-[-180px]"
      />
      <AttributeSelector
        value={status}
        onChange={setStatus}
        options={statusOptions}
        placeholder="Выберите статус"
        optionsClassName="!top-[-235px]"
      />
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
  );
};

export default TaskFormSelectors;
