import React from 'react';
import { FaArrowDown, FaArrowUp, FaSort } from 'react-icons/fa';
import { taskSortOptions } from '@data/filterAndSortData';
import Select from '@components/main-components/Select';

const TaskSortControl = ({ taskSort, setTaskSort, sortOrder, setSortOrder }) => {
  const handleSortChange = (value) => {
    setTaskSort(value);
    if (value === 'manual') setSortOrder('asc');
  };

  const options = taskSortOptions.map(opt => ({
    value: opt.id,
    label: opt.name,
  }));

  return (
    <div className="relative flex items-center justify-center gap-1 md:gap-4 max-w-[400px] m-1 md:m-2">
      <span className="text-xl">Сортировка:</span>
      <Select
        value={taskSort}
        onChange={handleSortChange}
        options={options}
        placeholder="Выберите сортировку"
        size="sm"
        variant="outlined"
        icon={<FaSort className="h-4 w-4" />}
        className="min-w-[200px]"
        showCheckmark={false}
      />
      <button
        type="button"
        className="md:ml-2 p-2 border rounded transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        title={sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        disabled={taskSort === 'manual'}
      >
        {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
};

export default TaskSortControl; 