import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { useState, useRef, useEffect } from 'react';
import { navLinks } from 'features/home/data/navLinks';
import { useAuthStore } from 'features/auth/store/authStore';
import useModalsStore from '@store/modalsStore';

export function Header() {
  const token = useAuthStore((state) => state.accessToken);
  const setIsLogoutUserModalOpen = useModalsStore(
    (state) => state.setIsLogoutUserModalOpen,
  );
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#111111] text-white py-4 px-5 w-full shadow-md">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center">
        <Link to="/" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
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
          className="hidden items-center sm:flex gap-4 text-[24px]"
          initial={{ opacity: 0, transform: 'translateY(10px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.3 }}
        >
          {navLinks(token).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            title="Выйти из аккаунта"
            onClick={() => setIsLogoutUserModalOpen(true)}
            className={`!w-fit !p-3 !text-[24px] hover:!text-[#808080] !transition-colors ${!token ? 'hidden pointer-events-none select-none' : null}`}
          >
            Выход
          </button>
        </motion.nav>

        <button
          className="sm:hidden z-50"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          title={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isOpen ? <IoMdClose size={28} /> : <GiHamburgerMenu size={28} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.nav
              key="mobile-nav"
              ref={navRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden bg-[#111111] z-50 left-0 absolute w-full py-4 rounded-md shadow-md flex flex-col gap-3 text-lg items-center"
            >
              {navLinks(token).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => setIsLogoutUserModalOpen(true)}
                title="Выйти из аккаунта"
                className={`block sm:hidden !w-fit !p-3 !text-[18px] hover:!text-[#808080] !transition-colors ${!token ? 'hidden pointer-events-none select-none' : null}`}
              >
                Выход
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
