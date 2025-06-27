import { FaArrowLeft } from 'react-icons/fa';

export function PaginationControl({
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
          className={`btn-tertiary ${page === 1 ? 'pointer-events-none' : ''}`}
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
          className={`btn-tertiary ${page === totalPages ? 'pointer-events-none' : ''}`}
          title="Вперед"
        >
          <FaArrowLeft className="rotate-180" />
        </button>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {sizes.map((size) => (
          <button
            key={size}
            className={`btn-tertiary !transition-all ${
              pageSize === size ? '!bg-white scale-110 !border-1 !border-[var(--main-primary)]' : ''
            }`}
            onClick={() => onPageSizeChange(size)}
            title={`Количество досок на странице: ${size}`}
          >
            <span
              className={pageSize === size ? 'text-[var(--main-primary)]' : ''}
            >
              {size}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
