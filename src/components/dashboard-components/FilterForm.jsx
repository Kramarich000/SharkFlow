import { Fragment, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import {
  DEFAULT_DATE_RANGE,
  DEFAULT_RECENT_DAYS,
  DEFAULT_ONLY_FAV,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  optsRange,
  recentDaysOptions,
  sortOptions,
} from '@data/filterAndSortData';
import { FaArrowDown, FaTrash } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';
import { FaFilter } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';

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
}) {
  const handleResetFilters = () => {
    onChangeDateRange(DEFAULT_DATE_RANGE);
    onChangeRecentDays(DEFAULT_RECENT_DAYS);
    onChangeOnlyFav(DEFAULT_ONLY_FAV);
    onChangeSortBy(DEFAULT_SORT_BY);
    onChangeSortOrder(DEFAULT_SORT_ORDER);
  };

  const toggleSortOrder = () => {
    onChangeSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

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
                onChange: (selectedDates, dateStr, instance) => {
                  const start = selectedDates[0] ?? null;
                  const end = selectedDates[1] ?? null;
                  onChangeDateRange([start, end]);
                },
                onValueUpdate: (selectedDates, dateStr, instance) => {
                  if (
                    dateStr &&
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
          <Listbox value={recentDays} onChange={onChangeRecentDays}>
            {({ open }) => (
              <div className="relative w-full">
                <ListboxButton className="secondary-btn">
                  {recentDaysOptions.find((o) => o.id === recentDays)?.name ||
                    'Период'}
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
                  <ListboxOptions className="options-styles">
                    {recentDaysOptions.map((opt) => (
                      <ListboxOption
                        key={opt.id}
                        value={opt.id}
                        className="option-styles"
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
              <div className="relative w-full">
                <ListboxButton className="secondary-btn">
                  {sortOptions.find((o) => o.id === sortBy)?.name || 'Тип'}
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
                  <ListboxOptions className="options-styles">
                    {sortOptions.map((opt) => (
                      <ListboxOption
                        key={opt.id}
                        value={opt.id}
                        className="option-styles"
                      >
                        {opt.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox>
          <div className="flex col-span-2 lg:col-span-1 gap-30 lg:gap-10 items-center">
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
