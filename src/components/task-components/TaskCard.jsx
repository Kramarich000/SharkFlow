import React from 'react';
import {
  priorityOptions,
  statusOptions,
  statusCardStyles,
} from '@data/taskOptions';
import { FaEye } from 'react-icons/fa';
import { HiOutlineBars3 } from 'react-icons/hi2';
import useModalsStore from '@store/modalsStore';
import useTaskStore from '@store/taskStore';

export default React.memo(function TaskCard({ task, dragHandleProps }) {
  const { setIsDetailsTaskModalOpen } = useModalsStore();
  const handleTaskSelect = useTaskStore((state) => state.handleTaskSelect);

  const descriptionAsText = (html) => {
    if (!html) return '— без описания —';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const plainDescription = descriptionAsText(task.description);

  const statusClass =
    statusCardStyles[task.status] || statusCardStyles.DEFAULT;

  return (
    <div
      className={`w-full relative !h-fit text-center flex flex-col justify-around p-4 border-l-8 rounded-xl transition ${statusClass}`}
    >
      <div className="flex !items-start justify-between">
        <button {...dragHandleProps} className="!p-1" title="Перетащить задачу">
          <HiOutlineBars3 size={27} />
        </button>
        <h3
          title={task.title}
          className="text-xl text-left truncate sm:whitespace-normal sm:break-words font-semibold line-clamp-1 sm:line-clamp-2 min-h-[56px]"
        >
          {task.title}
        </h3>
        <button
          onClick={() => {
            handleTaskSelect(task);
            setIsDetailsTaskModalOpen(true);
          }}
          className="!p-1"
        >
          <FaEye size={27} />
        </button>
      </div>
      {/* <p
        title={plainDescription}
        className="mt-1 text-center sm:whitespace-normal sm:break-words sm:line-clamp-3 min-h-[72px]"
      >
        {plainDescription}
      </p> */}
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
        <div className="items-center flex justify-center gap-2 flex-wrap">
          <p className={`rounded-xl ${statusClass} p-1`} title="Статус задачи">
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
          <p className={`rounded-xl ${statusClass} p-1`} title="Дата окончания">
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
            className={`rounded-xl ${statusClass} p-1`}
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
});
