import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { useAuthStore } from '@store/authStore';

export default function Header() {
  const token = useAuthStore((state) => state.accessToken);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = token
    ? [
        { path: '/', label: 'Главная' },
        { path: '/dashboard', label: 'Мои задачи' },
        { path: '/settings', label: 'Настройки' },
      ]
    : [
        { path: '/', label: 'Главная' },
        { path: '/register', label: 'Регистрация' },
        { path: '/login', label: 'Вход' },
      ];

  return (
    <header className="bg-[#111111] text-white py-4 px-5 w-full shadow-md">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center">
        <Link to="/" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 -123.34 220.2 123.34"
          >
            <path
              d="M31.58 -88.22L31.58 0L73.4 0L73.4 -88.22L104.98 -88.22L104.98 -123.34L0 -123.34L0 -88.22Z M128.8 -123.34L128.8 0L170.62 0L170.62 -45.88L205.73 -45.88L205.73 -77.46L170.62 -77.46L170.62 -88.22L220.2 -88.22L220.2 -123.34Z"
              className="fill-white group-hover:fill-gray-400 transition-colors duration-300"
            />
          </svg>
        </Link>

        <motion.nav
          key="desktop-nav"
          className="hidden sm:flex space-x-6 text-lg"
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.nav>

        <button
          className="sm:hidden z-50"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
        >
          {isOpen ? <IoMdClose size={28} /> : <GiHamburgerMenu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden bg-[#111111] left-0 absolute w-full py-4 rounded-md shadow-md flex flex-col gap-3 text-lg"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
