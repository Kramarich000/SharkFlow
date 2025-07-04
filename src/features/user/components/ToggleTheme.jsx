import { useThemeStore } from '@store/themeStore';
import { FaMoon, FaSun, FaRegClock } from 'react-icons/fa';
import { MODES } from '@utils/theme/toggleTheme';
import { Button } from '@common/ui/utilities/Button';

export function ToggleTheme({ className = '' }) {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const idx = MODES.indexOf(mode);
  const translateClass =
    idx === 0 ? 'translate-x-0' : idx === 1 ? 'translate-x-4' : 'translate-x-8';
  const Icon = mode === 'light' ? FaSun : mode === 'dark' ? FaMoon : FaRegClock;

  let iconColorClass = '';
  if (mode === 'light') iconColorClass = 'text-yellow-500';
  else if (mode === 'dark') iconColorClass = 'text-slate-100';
  else iconColorClass = 'text-blue-500';

  return (
    <Button
      onClick={toggleMode}
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
