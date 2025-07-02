import { FaPlus } from 'react-icons/fa';
import { FilterForm, SearchBar } from '@features/dashboard';
import { SimpleCheckbox } from '@common/ui';
import { Button } from '@common/ui/utilities/Button';

export const DashboardHeader = ({ params, setParams, onOpenCreateBoard }) => {
  return (
    <>
      <h2 className="mb-4 text-3xl font-semibold">Мои доски</h2>
      <div className="mb-6 flex flex-col gap-8">
        <SearchBar
          value={params.searchTerm}
          onChange={(v) => setParams((p) => ({ ...p, searchTerm: v }))}
        />
        <FilterForm
          dateRange={params.dateRange}
          onChangeDateRange={(range) =>
            setParams((p) => ({ ...p, dateRange: range }))
          }
          recentDays={params.recentDays}
          onChangeRecentDays={(v) =>
            setParams((p) => ({ ...p, recentDays: v }))
          }
          onChangeOnlyFav={(v) => setParams((p) => ({ ...p, onlyFav: v }))}
          sortBy={params.sortBy}
          onChangeSortBy={(v) => setParams((p) => ({ ...p, sortBy: v }))}
          sortOrder={params.sortOrder}
          onChangeSortOrder={(v) => setParams((p) => ({ ...p, sortOrder: v }))}
          taskCount={params.taskCount}
          onChangeTaskCount={(v) => setParams((p) => ({ ...p, taskCount: v }))}
        />
      </div>
      <div className="flex flex-wrap justify-center items-center mb-4">
        <div className="p-4">
          <SimpleCheckbox
            id="onlyFav"
            label="Избранные"
            checked={params.onlyFav}
            onChange={(v) => setParams((p) => ({ ...p, onlyFav: v }))}
          />
        </div>
        <Button
          variant="primary"
          className="!w-fit ml-0 sm:ml-auto"
          onClick={onOpenCreateBoard}
        >
          Создать доску <FaPlus size={20} />
        </Button>
      </div>
    </>
  );
};
