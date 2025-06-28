import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export function ToggleTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e) => {
      if (!window.localStorage.getItem('theme')) {
        setDark(e.matches);
      }
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="flex items-center p-2 rounded-full bg-[var(--main-surface)] shadow hover:shadow-md transition"
      aria-label={
        dark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'
      }
    >
      <div
        className={`
          relative w-10 h-6 flex items-center transition-colors duration-300
          ${dark ? 'bg-[var(--main-primary)]' : 'bg-gray-300'}
          rounded-full
        `}
      >
        <span
          className={`
            absolute left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300
            ${dark ? 'translate-x-4' : 'translate-x-0'}
          `}
        />
      </div>
      <span className="ml-2 text-xl">
        {dark ? <FaSun /> : <FaMoon color="black" />}
      </span>
    </button>
  );
}
