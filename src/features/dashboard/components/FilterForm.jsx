import { Fragment } from 'react';
import {
  FaFilter,
  FaCalendarAlt,
  FaArrowDown,
  FaChevronDown,
} from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import Flatpickr from 'react-flatpickr';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import 'flatpickr/dist/themes/dark.css';

import { Select } from '@common/ui';
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
} from '@common/data';

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
    <details className="border-b-1 border-[var(--main-primary)] group/filter">
      <summary className="cursor-pointer pb-8 flex justify-center relative gap-4 items-center text-lg font-semibold hover:text-[var(--main-primary)] transition-colors">
        <span>Фильтры</span>
        <FaFilter />
        <FaChevronDown className="absolute right-4 group-open/filter:rotate-180 transition" />
      </summary>

      <form className="py-4">
        <h3 className="text-xl flex items-center justify-center gap-6 font-semibold mb-4"></h3>
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
                className="calendar-styles !border-0 !bg-[var(--main-button-bg)] !opacity-100 !text-[var(--main-button-text)] placeholder:!text-[var(--main-button-text)]"
                placeholder="Период дат"
              />
              <FaCalendarAlt
                color="var(--main-button-text)"
                className="absolute right-2 bottom-3.5 pointer-events-none"
              />
            </div>
            <Listbox value={recentDays} onChange={onChangeRecentDays}>
              {({ open }) => (
                <div className="relative w-full col-span-2 sm:col-span-1">
                  <ListboxButton className="secondary-btn w-full !border-0 !bg-[var(--main-button-bg)]">
                    {recentDaysOptions.find((o) => o.id === recentDays)?.name ||
                      'Период'}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FaChevronDown
                        className="h-4 w-4 text-[var(--main-button-text)]"
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
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md top-10 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[var(--main-bg)]">
                      {recentDaysOptions.map((opt) => (
                        <ListboxOption
                          key={opt.id}
                          value={opt.id}
                          className={({ active }) =>
                            `relative cursor-default select-none !transition hover:!text-[var(--main-button-text)] py-2 pl-4 pr-4 ${active ? 'bg-[var(--main-primary-hover)] !text-[var(--main-button-text)]' : ''}`
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
                  <ListboxButton className="secondary-btn !bg-[var(--main-button-bg)] !border-0 w-full">
                    {taskCountOptions.find((o) => o.id === taskCount)?.name ||
                      'Число задач'}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FaChevronDown
                        className="h-4 w-4 text-[var(--main-button-text)] "
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
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md top-10 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[var(--main-bg)]">
                      {taskCountOptions.map((opt) => (
                        <ListboxOption
                          key={opt.id}
                          value={opt.id}
                          className={({ active }) =>
                            `relative cursor-default select-none !transition hover:!text-[var(--main-button-text)] py-2 pl-4 pr-4 ${active ? 'bg-[var(--main-primary-hover)] !text-[var(--main-button-text)]' : ''}`
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
                  <ListboxButton className="secondary-btn !bg-[var(--main-button-bg)] !border-0 w-full">
                    {sortOptions.find((o) => o.id === sortBy)?.name || 'Тип'}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FaChevronDown
                        className="h-4 w-4 text-[var(--main-button-text)]"
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
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md top-10 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-[var(--main-bg)]">
                      {sortOptions.map((opt) => (
                        <ListboxOption
                          key={opt.id}
                          value={opt.id}
                          className={({ active }) =>
                            `relative cursor-default select-none !transition hover:!text-[var(--main-button-text)] py-2 pl-4 pr-4 ${active ? 'bg-[var(--main-primary-hover)] !text-[var(--main-button-text)]' : ''}`
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
                  className="secondary-btn !border-0 !p-2 !m-0 group"
                  title="Направление сортировки"
                  onClick={toggleSortOrder}
                >
                  <FaArrowDown
                    size={26}
                    className={`group-hover:text-[var(--main-button-bg)] text-[var(--main-text)] !transition-all ${sortOrder === 'asc' ? 'rotate-0' : 'rotate-180'}`}
                  />
                </button>
              </div>
              <div className="flex !w-fit items-center justify-end gap-10">
                <button
                  type="button"
                  title="Очистить фильтры"
                  onClick={handleResetFilters}
                  className="secondary-btn !border-0 !p-2 !m-0 group"
                >
                  <GiBroom
                    size={26}
                    className="group-hover:text-[var(--main-button-bg)] text-[var(--main-text)] !transition-all"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </details>
  );
}
