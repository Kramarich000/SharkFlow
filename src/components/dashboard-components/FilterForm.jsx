import { Fragment } from 'react';
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
  DEFAULT_DATE_FROM,
  DEFAULT_DATE_TO,
  DEFAULT_RECENT_DAYS,
  DEFAULT_ONLY_FAV,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  optsFrom,
  optsTo,
  recentDaysOptions,
  sortOptions,
} from '@data/filterAndSortData';
import { FaArrowDown, FaTrash } from 'react-icons/fa';
import { GiBroom } from 'react-icons/gi';

export default function FilterForm({
  dateFrom,
  dateTo,
  recentDays,
  sortBy,
  sortOrder,
  onChangeDateFrom,
  onChangeDateTo,
  onChangeRecentDays,
  onChangeOnlyFav,
  onChangeSortBy,
  onChangeSortOrder,
}) {
  const handleResetFilters = () => {
    onChangeDateFrom(DEFAULT_DATE_FROM);
    onChangeDateTo(DEFAULT_DATE_TO);
    onChangeRecentDays(DEFAULT_RECENT_DAYS);
    onChangeOnlyFav(DEFAULT_ONLY_FAV);
    onChangeSortBy(DEFAULT_SORT_BY);
    onChangeSortOrder(DEFAULT_SORT_ORDER);
  };

  const toggleSortOrder = () => {
    onChangeSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <form>
      <div className="flex flex-col w-full gap-10 items-center">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 w-full justify-items-center">
          <div className="relative w-full">
            <Flatpickr
              id="dateFrom"
              name="dateFrom"
              value={dateFrom}
              onChange={(dates) => onChangeDateFrom(dates[0] ?? null)}
              options={optsFrom}
              className="calendar-styles"
              placeholder="Дата с"
            />
          </div>
          <div className="relative w-full">
            <Flatpickr
              id="dateTo"
              name="dateTo"
              value={dateTo}
              onChange={(dates) => onChangeDateTo(dates[0] ?? null)}
              options={optsTo}
              className="calendar-styles"
              placeholder="Дата по"
            />
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
          {/* <Listbox value={sortOrder} onChange={onChangeSortOrder}>
            {({ open }) => (
              <div className="relative w-full">
                <ListboxButton className="secondary-btn">
                  {sortOrder === 'asc'
                    ? 'По возрастанию'
                    : sortOrder === 'desc'
                      ? 'По убыванию'
                      : 'Направление'}
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
                    {['asc', 'desc'].map((o) => (
                      <ListboxOption
                        key={o}
                        value={o}
                        className="option-styles"
                      >
                        {o === 'asc' ? 'По возрастанию' : 'По убыванию'}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </div>
            )}
          </Listbox> */}
          <div className="col-span-2 lg:col-span-1 flex gap-40 lg:gap-10 items-center">
            <div className="relative flex items-center justify-center">
              <button
                type="button"
                className="secondary-btn !border-0 group"
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
