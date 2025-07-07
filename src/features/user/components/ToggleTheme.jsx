import { useThemeStore } from '@store/themeStore';
import { FaMoon, FaSun, FaRegClock } from 'react-icons/fa';
import { MODES } from '@utils/theme/toggleTheme';
import { Button } from '@common/ui/utilities/Button';
import { motion, AnimatePresence } from 'framer-motion';

export function ToggleTheme({ className = '' }) {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  const idx = MODES.indexOf(mode);
  const Icon = mode === 'light' ? FaSun : mode === 'dark' ? FaMoon : FaRegClock;

  const iconColorClass =
    mode === 'light'
      ? 'text-yellow-500'
      : mode === 'dark'
        ? 'text-slate-100'
        : 'text-blue-500';

  const xMap = [0, 16, 32];
  const ballX = xMap[idx];

  return (
    <motion.button
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
      <div className="relative w-14 h-6 flex items-center bg-[var(--main-button-bg)] rounded-full">
        <motion.span
          layout
          className="absolute left-0.5 top-0.5 w-5 h-5 bg-[var(--main-button-text)] rounded-full shadow"
          animate={{ x: ballX }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          className={`text-xl ${iconColorClass}`}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Icon />
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
