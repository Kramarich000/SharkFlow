import { Fragment } from 'react';
import { FaFilter, FaCalendarAlt, FaArrowDown } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import Flatpickr from 'react-flatpickr';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

import 'flatpickr/dist/themes/dark.css';
import Select from 'common/ui/Select';
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
} from 'common/data/filterAndSortData';

export function FilterForm({
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

  const recentDaysSelectOptions = recentDaysOptions.map((opt) => ({
    value: opt.id,
    label: opt.name,
  }));

  const taskCountSelectOptions = taskCountOptions.map((opt) => ({
    value: opt.id,
    label: opt.name,
  }));

  const sortBySelectOptions = sortOptions.map((opt) => ({
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
          <div className="relative w-full col-span-2 ">
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
              className="calendar-styles !border-0 !bg-gray-100"
              placeholder="Период дат"
            />
            <FaCalendarAlt className="absolute right-2 bottom-3.5 pointer-events-none" />
          </div>
          <Listbox value={recentDays} onChange={onChangeRecentDays}>
            {({ open }) => (
              <div className="relative w-full col-span-2 sm:col-span-1">
                <ListboxButton className="secondary-btn !border-0 !bg-gray-100">
                  {recentDaysOptions.find((o) => o.id === recentDays)?.name ||
                    'Период'}
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-50"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-50"
                >
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white top-10 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {recentDaysOptions.map((opt) => (
                      <ListboxOption
                        key={opt.id}
                        value={opt.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                        }
                      >
                        {opt.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
          <Listbox value={taskCount} onChange={onChangeTaskCount}>
            {({ open }) => (
              <div className="relative w-full col-span-2 sm:col-span-1">
                <ListboxButton className="secondary-btn !bg-gray-100 !border-0">
                  {taskCountOptions.find((o) => o.id === taskCount)?.name ||
                    'Число задач'}
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-50"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-50"
                >
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white top-10 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {taskCountOptions.map((opt) => (
                      <ListboxOption
                        key={opt.id}
                        value={opt.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                        }
                      >
                        {opt.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
          <Listbox value={sortBy} onChange={onChangeSortBy}>
            {({ open }) => (
              <div className="relative w-full col-span-2 lg:col-span-1">
                <ListboxButton className="secondary-btn !bg-gray-100 !border-0">
                  {sortOptions.find((o) => o.id === sortBy)?.name || 'Тип'}
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaChevronDown
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>
                <Transition
                  as={Fragment}
                  show={open}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-50"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-50"
                >
                  <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white top-10 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {sortOptions.map((opt) => (
                      <ListboxOption
                        key={opt.id}
                        value={opt.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                        }
                      >
                        {opt.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
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
