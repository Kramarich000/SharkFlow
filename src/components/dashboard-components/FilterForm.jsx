import { Fragment } from 'react';
import { FaFilter, FaCalendarAlt, FaArrowDown } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Select from '@components/main-components/Select';
import {
  DEFAULT_DATE_RANGE,
  DEFAULT_RECENT_DAYS,
  DEFAULT_ONLY_FAV,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  DEFAULT_TASK_COUNT,
  recentDaysOptions,
  taskCountOptions,
  sortOptions,
  optsRange,
} from '@data/filterAndSortData';

export default function FilterForm({
  dateRange,
  onChangeDateRange,
  recentDays,
  sortBy,
  sortOrder,
  onChangeRecentDays,
  onChangeOnlyFav,
  onChangeSortBy,
  onChangeSortOrder,
  taskCount,
  onChangeTaskCount,
}) {
  const handleResetFilters = () => {
    onChangeDateRange(DEFAULT_DATE_RANGE);
    onChangeRecentDays(DEFAULT_RECENT_DAYS);
    onChangeOnlyFav(DEFAULT_ONLY_FAV);
    onChangeSortBy(DEFAULT_SORT_BY);
    onChangeSortOrder(DEFAULT_SORT_ORDER);
    onChangeTaskCount(DEFAULT_TASK_COUNT);
  };

  const toggleSortOrder = () => {
    onChangeSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const recentDaysSelectOptions = recentDaysOptions.map(opt => ({
    value: opt.id,
    label: opt.name,
  }));

  const taskCountSelectOptions = taskCountOptions.map(opt => ({
    value: opt.id,
    label: opt.name,
  }));

  const sortBySelectOptions = sortOptions.map(opt => ({
    value: opt.id,
    label: opt.name,
  }));

  return (
    <form className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl flex items-center justify-center gap-6 font-semibold mb-4">
        Фильтры <FaFilter />
      </h3>
      <div className="flex flex-col w-full gap-10 items-center">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 w-full justify-items-center">
          <div className="relative w-full col-span-2">
            <Flatpickr
              id="dateRange"
              name="dateRange"
              value={(() => {
                if (
                  dateRange[0] instanceof Date &&
                  dateRange[1] instanceof Date
                ) {
                  return dateRange;
                }
                if (dateRange[0] instanceof Date) {
                  return [dateRange[0]];
                }
                return [];
              })()}
              options={{
                ...optsRange,
                onChange: (selectedDates) => {
                  const start = selectedDates[0] ?? null;
                  const end = selectedDates[1] ?? null;
                  onChangeDateRange([start, end]);
                },
                onValueUpdate: (selectedDates, _dateStr, instance) => {
                  if (
                    selectedDates.length === 1 &&
                    selectedDates[0] instanceof Date
                  ) {
                    instance.open();
                  }
                },
              }}
              className="calendar-styles"
              placeholder="Период дат"
            />
            <FaCalendarAlt className="absolute right-2 bottom-3.5 pointer-events-none" />
          </div>
          
          <div className="relative w-full col-span-2 sm:col-span-1">
            <Select
              value={recentDays}
              onChange={onChangeRecentDays}
              options={recentDaysSelectOptions}
              placeholder="Период"
              size="sm"
              variant="outlined"
              icon={<FaCalendarAlt className="h-4 w-4" />}
              showCheckmark={false}
            />
          </div>
          
          <div className="relative w-full col-span-2 sm:col-span-1">
            <Select
              value={taskCount}
              onChange={onChangeTaskCount}
              options={taskCountSelectOptions}
              placeholder="Число задач"
              size="sm"
              variant="outlined"
              icon={<FaFilter className="h-4 w-4" />}
              showCheckmark={false}
            />
          </div>
          
          <div className="relative w-full col-span-2 lg:col-span-1">
            <Select
              value={sortBy}
              onChange={onChangeSortBy}
              options={sortBySelectOptions}
              placeholder="Тип"
              size="sm"
              variant="outlined"
              icon={<FaArrowDown className="h-4 w-4" />}
              showCheckmark={false}
            />
          </div>
          
          <div className="flex col-span-2 lg:col-span-5 gap-30 lg:gap-10 items-center">
            <div className="relative flex items-center justify-center">
              <button
                type="button"
                className="secondary-btn !border-0 group"
                title="Направление сортировки"
                onClick={toggleSortOrder}
              >
                <FaArrowDown
                  size={26}
                  className={`group-hover:text-[#808080] text-black !transition-all ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`}
                />
              </button>
            </div>
            <div className="flex !w-fit items-center justify-end gap-100">
              <button
                type="button"
                title="Очистить фильтры"
                onClick={handleResetFilters}
                className="primary-btn group !bg-transparent !p-0 !m-0"
              >
                <GiBroom
                  size={26}
                  className="group-hover:text-[#808080] text-black !transition-all"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
