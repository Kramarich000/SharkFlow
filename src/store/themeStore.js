import { create } from 'zustand';
import {
  MODES,
  isNight,
  getDarkByMode,
  applyTheme,
  DAY_NIGHT_RANGES,
} from '@utils/theme/themeConfig';
export const useThemeStore = create((set, get) => {
  let autoThemeTimer = null;

  return {
    mode: localStorage.getItem('themeMode') || 'auto',
    dark: getDarkByMode(localStorage.getItem('themeMode') || 'auto'),

    setMode: (mode) => {
      localStorage.setItem('themeMode', mode);
      const newDark = getDarkByMode(mode);
      applyTheme(mode);
      return { mode, dark: newDark };
    },

    toggleMode: () => {
      const currentMode = get().mode;
      const nextIndex = (MODES.indexOf(currentMode) + 1) % MODES.length;
      const nextMode = MODES[nextIndex];
      set(get().setMode(nextMode));
    },

    initAutoMode: () => {
      if (autoThemeTimer) {
        clearTimeout(autoThemeTimer);
      }

      const updateAutoMode = () => {
        const now = new Date();
        const hour = now.getHours();
        const month = now.getMonth();
        const { dayStart, dayEnd } = DAY_NIGHT_RANGES[month];

        const next = new Date(now);
        if (hour < dayStart) {
          next.setHours(dayStart, 0, 0, 0);
        } else if (hour < dayEnd) {
          next.setHours(dayEnd, 0, 0, 0);
        } else {
          next.setDate(next.getDate() + 1);
          next.setHours(0, 0, 0, 0);
          const nextMonth = next.getMonth();
          const { dayStart: nextStart } = DAY_NIGHT_RANGES[nextMonth];
          next.setHours(nextStart, 0, 0, 0);
        }

        const ms = next.getTime() - now.getTime();
        autoThemeTimer = setTimeout(() => {
          const nextDark = isNight();
          const newMode = nextDark ? 'dark' : 'light';
          if (get().mode === 'auto') {
            set({ dark: nextDark });
            applyTheme(newMode);
          }
          updateAutoMode();
        }, ms);
      };

      updateAutoMode();
    },
  };
});
