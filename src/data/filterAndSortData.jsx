import { Russian } from 'flatpickr/dist/l10n/ru.js';

export const baseOpts = {
  locale: Russian,
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'j F Y',
  allowInput: false,
  closeOnSelect: false,
  disableMobile: true,
  clickOpens: true,
};

export const optsRange = { mode: 'range', ...baseOpts };

export const recentDaysOptions = [
  { id: 999999, name: 'За все время' },
  { id: 1, name: '1 день' },
  { id: 7, name: '7 дней' },
  { id: 30, name: '30 дней' },
  { id: 180, name: 'Полгода' },
  { id: 360, name: 'Год' },
];

export const sortOptions = [
  { id: 'title', name: 'Название' },
  { id: 'createdAt', name: 'Дата создания' },
  { id: 'updatedAt', name: 'Дата обновления' },
  { id: 'taskCount', name: 'Число задач' },
];

export const taskSortOptions = [
  { id: 'manual', name: 'По порядку' },
  { id: 'createdAt', name: 'Дата создания' },
  { id: 'updatedAt', name: 'Дата обновления' },
  { id: 'priority', name: 'Приоритет' },
  { id: 'status', name: 'Статус' },
  { id: 'dueDate', name: 'Дедлайн' },
];

export const DEFAULT_DATE_RANGE = [null, null];
export const DEFAULT_RECENT_DAYS = null;
export const DEFAULT_SORT_BY = null;
export const DEFAULT_SORT_ORDER = null;
export const DEFAULT_ONLY_FAV = false;
