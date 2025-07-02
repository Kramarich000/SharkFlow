import { Button } from '@common/ui/utilities/Button';
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
        <Button
          variant="tertiary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`${page === 1 ? 'pointer-events-none' : ''}`}
          title="Назад"
        >
          <FaArrowLeft />
        </Button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <Button
          variant="tertiary"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`${page === totalPages ? 'pointer-events-none' : ''}`}
          title="Вперед"
        >
          <FaArrowLeft className="rotate-180" />
        </Button>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {sizes.map((size) => (
          <Button
            key={size}
            variant="tertiary"
            className={`!transition-all ${
              pageSize === size
                ? '!bg-white hover:!bg-white scale-110 !border-1 !border-[var(--main-primary)]'
                : ''
            }`}
            onClick={() => onPageSizeChange(size)}
            title={`Количество досок на странице: ${size}`}
          >
            <span
              className={pageSize === size ? 'text-[var(--main-primary)]' : ''}
            >
              {size}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
