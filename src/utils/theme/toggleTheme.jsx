export const MODES = ['light', 'auto', 'dark'];

export function isNight() {
  const h = new Date().getHours();
  return h < 7 || h >= 19;
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
