import { IoMdSettings } from 'react-icons/io';
import { ToggleTheme } from '@features/user/components/ToggleTheme';

export const SiteSettings = () => {
  return (
    <div className="rounded-2xl p-8">
      <div className="flex items-center gap-5 mb-4">
        <IoMdSettings size={36} />
        <h2 className="text-2xl font-bold">Настройки</h2>
      </div>
      <p className="text-base mb-6 text-[var(--main-text-muted)]">
        Здесь вы можете настроить тему
      </p>
      <div className="mt-4">
        <ToggleTheme className="mx-auto" />
      </div>
    </div>
  );
};
