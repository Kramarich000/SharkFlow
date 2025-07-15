export const MODES = ['light', 'auto', 'dark'];

export const DAY_NIGHT_RANGES = {
  0: { dayStart: 9, dayEnd: 16 }, // Январь
  1: { dayStart: 8, dayEnd: 17 }, // Февраль
  2: { dayStart: 7, dayEnd: 18 }, // Март
  3: { dayStart: 6, dayEnd: 19 }, // Апрель
  4: { dayStart: 5, dayEnd: 20 }, // Май
  5: { dayStart: 5, dayEnd: 21 }, // Июнь
  6: { dayStart: 5, dayEnd: 21 }, // Июль
  7: { dayStart: 6, dayEnd: 20 }, // Август
  8: { dayStart: 6, dayEnd: 19 }, // Сентябрь
  9: { dayStart: 7, dayEnd: 18 }, // Октябрь
  10: { dayStart: 8, dayEnd: 17 }, // Ноябрь
  11: { dayStart: 9, dayEnd: 16 }, // Декабрь
};

export function isNight() {
  const now = new Date();
  const hour = now.getHours();
  const month = now.getMonth();

  const { dayStart, dayEnd } = DAY_NIGHT_RANGES[month];
  return hour < dayStart || hour >= dayEnd;
}

export function getThemeMode() {
  if (typeof window === 'undefined') return 'auto';
  return localStorage.getItem('themeMode') || 'auto';
}

export function getDarkByMode(mode) {
  if (mode === 'light') return false;
  if (mode === 'dark') return true;
  return isNight();
}

export function applyTheme(mode) {
  const dark = getDarkByMode(mode);
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}
