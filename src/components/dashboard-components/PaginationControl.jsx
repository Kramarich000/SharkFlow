import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export default function PaginationControl({
  page,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const sizes = [10, 20, 30, 50, 100];

  return (
    <div className="flex flex-col items-center gap-4 mt-auto ">
      <div className="flex items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="tertiary-btn"
          title="Назад"
        >
          <FaArrowLeft />
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="tertiary-btn"
          title="Вперед"
        >
          <FaArrowLeft className="rotate-180" />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 rounded-full text-white
                        !transition-colors hover:bg-gray-800
                        ${pageSize === size ? 'bg-gray-900' : 'bg-gray-400'}`}
            onClick={() => onPageSizeChange(size)}
            title={`Количество досок на странице: ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
