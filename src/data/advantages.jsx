import {
  MdOutlineMoneyOffCsred,
  MdOutlineTouchApp,
  MdFileDownloadOff,
  MdOutlineSecurity,
} from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

export const advantages = [
  {
    id: 1,
    title: '1. Бесплатное использование',
    icon: <MdOutlineMoneyOffCsred size={28} className="flex-shrink-0 " />,
    description: 'Полный доступ ко всем функциям без оплаты.',
  },
  {
    id: 2,
    title: '2. Открытый исходный код',
    icon: <FaGithub size={28} className="flex-shrink-0" />,
    description: (
      <>
        Проект полностью{' '}
        <a
          href="https://github.com/Kramarich000/TaskFlow"
          target="_blank"
          rel="noopener noreferrer"
          className="!underline text-blue-600"
        >
          open-source
        </a>{' '}
        и легко модифицируем.
      </>
    ),
  },
  {
    id: 3,
    title: '3. Простота',
    icon: <MdOutlineTouchApp size={28} className="flex-shrink-0" />,
    description: 'Интерфейс, понятный даже без обучения.',
  },
  {
    id: 4,
    title: '4. Безопасность',
    icon: <MdOutlineSecurity size={28} className="flex-shrink-0" />,
    description: 'Никакой внешней аналитики — ваши данные под контролем.',
  },
  {
    id: 5,
    title: '5. Работа без установки',
    icon: <MdFileDownloadOff size={28} className="flex-shrink-0" />,
    description: 'Запускается прямо в браузере, даже на мобильных.',
  },
];
