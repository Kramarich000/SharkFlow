import { Fragment } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
  Transition,
} from '@headlessui/react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { taskSortOptions } from '@data/filterAndSortData';

const TaskSortControl = ({ taskSort, setTaskSort, sortOrder, setSortOrder }) => {
  return (
    <Listbox
      value={taskSort}
      onChange={(value) => {
        setTaskSort(value);
        if (value === 'manual') setSortOrder('asc');
      }}
    >
      {({ open }) => (
        <div className="relative flex items-center justify-center gap-1 md:gap-4 max-w-[400px] m-1 md:m-4">
          <Label className="text-xl">Сортировка:</Label>
          <ListboxButton className="secondary-btn">
            {taskSortOptions.find((opt) => opt.id === taskSort)?.name ||
              'Выберите сортировку'}
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
            <ListboxOptions className="options-styles top-10 !text-center">
              {taskSortOptions.map((opt) => (
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
  );
};

export default TaskSortControl; 