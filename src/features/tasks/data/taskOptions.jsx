export const priorityOptions = [
  { value: 'LOW', label: 'Низкий' },
  { value: 'MEDIUM', label: 'Средний' },
  { value: 'HIGH', label: 'Высокий' },
];

export const statusOptions = [
  { value: 'PENDING', label: 'Ожидает' },
  { value: 'IN_PROGRESS', label: 'В процессе' },
  { value: 'COMPLETED', label: 'Завершена' },
  { value: 'CANCELLED', label: 'Отменена' },
];

export const priorityStyles = {
  LOW: 'border-[2px] bg-green-100 hover:bg-green-100/70 !transition-all border-green-500 shadow-[0_6px_20px_rgba(41,221,107,0.35)] hover:shadow-[0_10px_30px_rgba(41,221,107,0.5)]',
  MEDIUM:
    'border-[2px] bg-yellow-100 hover:bg-yellow-100/70 !transition-all border-yellow-400 shadow-[0_6px_20px_rgba(255,201,39,0.35)] hover:shadow-[0_10px_30px_rgba(255,201,39,0.5)]',
  HIGH: 'border-[2px] bg-red-100 hover:bg-red-100/70 !transition-all border-red-500 shadow-[0_6px_20px_rgba(255,47,47,0.35)] hover:shadow-[0_10px_30px_rgba(255,47,47,0.5)]',
  DEFAULT:
    'border-[2px] bg-white !transition-all border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)]',
};

export const statusStyles = {
  PENDING: 'bg-gradient-to-b from-yellow-100 to-yellow-300',
  IN_PROGRESS: 'bg-gradient-to-b from-blue-100 to-blue-300',
  COMPLETED: 'bg-gradient-to-b from-green-200 to-green-400',
  CANCELLED: 'bg-gradient-to-b from-red-200 to-red-400',
  DEFAULT: 'bg-gradient-to-b from-gray-200 to-gray-400',
};

export const statusCardStyles = {
  IN_PROGRESS:
    'border-[2px] bg-blue-100 !transition-all border-blue-500 shadow-[0_6px_20px_rgba(68, 41, 221, 0.35)] hover:shadow-[0_10px_30px_rgba(68, 41, 221, 0.5)]',
  PENDING:
    'border-[2px] bg-yellow-100 !transition-all border-yellow-400 shadow-[0_6px_20px_rgba(255,201,39,0.35)] hover:shadow-[0_10px_30px_rgba(255,201,39,0.5)]',
  COMPLETED:
    'border-[2px] bg-green-100 !transition-all border-green-500 shadow-[0_6px_20px_rgba(47, 255, 75, 0.35)] hover:shadow-[0_10px_30px_rgba(47, 255, 75, 0.5)]',
  CANCELLED:
    'border-[2px] bg-red-100 !transition-all border-red-500 shadow-[0_6px_20px_rgba(255,47,47,0.35)] hover:shadow-[0_10px_30px_rgba(255,47,47,0.5)]',
  DEFAULT:
    'border-[2px] bg-white !transition-all border-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)]',
};

export const statusIconBg = {
  COMPLETED: 'from-green-400 to-green-600 shadow-green-400/40',
  CANCELLED: 'from-red-400 to-red-600 shadow-red-400/40',
  PENDING: 'from-yellow-300 to-yellow-500 shadow-yellow-300/40',
  IN_PROGRESS: 'from-blue-400 to-blue-600 shadow-blue-400/40',
  DEFAULT: 'from-gray-300 to-gray-500 shadow-gray-300/40',
};

export function getPriorityColor(priority) {
  switch (priority) {
    case 'LOW':
      return '#29dd6b';
    case 'MEDIUM':
      return '#ffc927';
    case 'HIGH':
      return '#ff2f2f';
    default:
      return '#d1d5db';
  }
}

export function getPriorityShadow(priority) {
  switch (priority) {
    case 'LOW':
      return '0px 4px 10px rgba(41, 221, 107, 0.4)';
    case 'MEDIUM':
      return '0px 4px 10px rgba(255, 201, 39, 0.4)';
    case 'HIGH':
      return '0px 4px 10px rgba(255, 47, 47, 0.4)';
    default:
      return '0px 4px 10px rgba(0, 0, 0, 0.1)';
  }
}
