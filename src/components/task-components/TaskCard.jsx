import {
  priorityOptions,
  statusOptions,
  priorityStyles,
} from '@data/taskOptions';

export default function TaskCard({ task }) {
  // console.log(task);
  const priorityClass = priorityStyles[task.priority] || priorityStyles.DEFAULT;

  return (
    <div
      className={`w-full !h-fit text-center flex flex-col justify-around relative p-4 border-l-8 rounded-xl transition ${priorityClass}`}
    >
      <h3
        title={task.title}
        className="text-xl truncate sm:whitespace-normal sm:break-words font-semibold line-clamp-1 sm:line-clamp-2 min-h-[56px]"
      >
        {task.title}
      </h3>
      {task.description ? (
        <p
          title={task.description}
          className="mt-1  truncate sm:whitespace-normal sm:break-words sm:line-clamp-3 min-h-[72px]"
        >
          {task.description}
        </p>
      ) : (
        <p className="min-h-[72px] flex justify-center" title="Описание задачи">
          — без описания —
        </p>
      )}
      <div className="flex mt-10 flex-col gap-2 justify-center">
        {/* <div className="items-center flex-wrap flex justify-center gap-2 sm:justify-between sm:gap-0">
          <p className="rounded-xl" title="Дата создания">
            {new Date(task.createdAt).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <p className="rounded-xl" title="Дата обновления">
            {new Date(task.updatedAt).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div> */}
        <div className="items-center flex justify-center gap-2">
          <p
            className={`rounded-xl ${priorityClass} p-1`}
            title="Статус задачи"
          >
            Статус:{' '}
            {statusOptions.find((opt) => opt.value === task.status)?.label ||
              'Не задано'}
          </p>
          {/* <p className="rounded-xl">
          {new Date(task.createdAt).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p> */}
          <p
            className={`rounded-xl ${priorityClass} p-1`}
            title="Дата окончания"
          >
            Дедлайн:{' '}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : 'Не задано'}
          </p>

          <p
            className={`rounded-xl ${priorityClass} p-1`}
            title="Приоритет задачи"
          >
            Приоритет:{' '}
            {priorityOptions.find((opt) => opt.value === task.priority)
              ?.label || 'Не задано'}
          </p>
        </div>
      </div>
    </div>
  );
}
