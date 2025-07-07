import { Button } from '@common/ui/utilities/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@common/ui/utilities/Accordion';
import { IoMdSettings } from 'react-icons/io';
import { ToggleTheme } from '@features/user/components/ToggleTheme';

export const SiteSettings = () => {
  return (
    <AccordionItem value="settings" className="border-0">
      <AccordionTrigger className="flex !px-1 items-center gap-4 bg-[var(--main-button-bg)] hover:no-underline hover:bg-[var(--main-button-hover)]">
        <IoMdSettings size={30} className="!rotate-0" />
        <p className="">Настройки</p>
      </AccordionTrigger>
      <AccordionContent>
        <h2 className="text-sm mt-1 text-[var(--main-text-muted)]">
          Здесь вы можете настроить тему
        </h2>
        <div className="mt-4">
          <ToggleTheme className="mx-auto" />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
