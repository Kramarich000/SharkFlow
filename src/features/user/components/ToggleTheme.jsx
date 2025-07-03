import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaRegClock } from 'react-icons/fa';

import { DAY_NIGHT_RANGES } from '@utils/theme/toggleTheme';

import {
  MODES,
  isNight,
  getDarkByMode,
  getThemeMode,
  applyTheme,
} from '@utils/theme/toggleTheme';
import { Button } from '@common/ui/utilities/Button';

export function ToggleTheme({ className = '' }) {
  const [mode, setMode] = useState(() => getThemeMode());
  const [dark, setDark] = useState(() => getDarkByMode(mode));

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    applyTheme(mode);
    setDark(getDarkByMode(mode));

    if (mode === 'auto') {
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
      const timer = setTimeout(() => {
        const nextDark = isNight();
        setDark(nextDark);
        applyTheme(nextDark ? 'dark' : 'light');
      }, ms);

      return () => clearTimeout(timer);
    }
  }, [mode]);

  const handleClick = () => {
    const next = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
    setMode(next);
  };

  const idx = MODES.indexOf(mode);
  const translateClass =
    idx === 0 ? 'translate-x-0' : idx === 1 ? 'translate-x-4' : 'translate-x-8';
  const Icon = mode === 'light' ? FaSun : mode === 'dark' ? FaMoon : FaRegClock;

  let iconColorClass = '';
  if (mode === 'light') iconColorClass = 'text-yellow-500';
  else if (mode === 'dark') iconColorClass = 'text-slate-100';
  else iconColorClass = 'text-blue-400';

  return (
    <Button
      onClick={handleClick}
      className={`flex items-center space-x-2 p-2 rounded-full bg-[var(--main-surface)] shadow hover:shadow-md transition ${className}`}
      title={
        mode === 'auto'
          ? 'Авто: по времени суток'
          : mode === 'light'
            ? 'Светлая тема'
            : 'Тёмная тема'
      }
    >
      <div className="relative w-14 h-6 flex items-center bg-[var(--main-button-bg)] rounded-full transition-colors">
        <span
          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-[var(--main-button-text)] rounded-full shadow transform transition-transform ${translateClass}`}
        />
      </div>
      <Icon className={`text-xl !transition-all ${iconColorClass}`} />
    </Button>
  );
}
