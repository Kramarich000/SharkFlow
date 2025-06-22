import { Fragment } from 'react';
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa';
import { taskSortOptions } from 'common/data/filterAndSortData';
import { FaChevronDown } from 'react-icons/fa';
import Select from 'common/ui/Select';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
  Transition,
} from '@headlessui/react';

export const TaskSortControl = ({
  taskSort,
  setTaskSort,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Listbox
      value={taskSort}
      onChange={(value) => {
        setTaskSort(value);
        if (value === 'manual') setSortOrder('asc');
      }}
    >
      {({ open }) => (
        <div className="relative flex items-center justify-center gap-1 md:gap-4 max-w-[400px] m-1 md:m-2">
          <Label className="text-xl">Сортировка:</Label>
          <ListboxButton className="secondary-btn relative">
            {taskSortOptions.find((opt) => opt.id === taskSort)?.name ||
              'Выберите сортировку'}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <button
            type="button"
            className="md:ml-2 p-2 border rounded transition hover:bg-gray-100"
            title={sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            disabled={taskSort === 'manual'}
          >
            {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
          </button>
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
              {taskSortOptions.map((opt) => (
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
  );
};
