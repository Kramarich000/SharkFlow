import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function Header() {
  const token = useAuthStore((state) => state.accessToken);

  return (
    <header className="bg-[#111111] text-white p-4 px-8 text-xl w-full">
      <div className="max-w-[1240px] mx-auto px-5">
        <motion.nav
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex items-center max-w-[1280px] mx-auto justify-between flex-wrap">
            <li className="group w-14">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 -123.33999633789062 220.1999969482422 123.33999633789062"
                >
                  <g>
                    <path
                      d="M31.58 -88.22L31.58 0L73.4 0L73.4 -88.22L104.98 -88.22L104.98 -123.34L0 -123.34L0 -88.22Z M128.8 -123.34L128.8 0L170.62 0L170.62 -45.88L205.73 -45.88L205.73 -77.46L170.62 -77.46L170.62 -88.22L220.2 -88.22L220.2 -123.34Z"
                      className="fill-white group-hover:fill-gray-400 transition-colors duration-300"
                    />
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/">Главная</Link>
            </li>
            |
            <AnimatePresence>
              {!token ? (
                <>
                  <motion.li
                    key="register"
                    initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  >
                    <Link to="/register">Регистрация</Link>
                  </motion.li>
                  |
                  <motion.li
                    key="login"
                    initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  >
                    <Link to="/login">Вход</Link>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li
                    key="dashboard"
                    initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  >
                    <Link to="/dashboard">Мои задачи</Link>
                  </motion.li>
                  |
                  <motion.li
                    key="settings"
                    initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  >
                    <Link to="/settings">Настройки</Link>
                  </motion.li>
                  |
                </>
              )}
            </AnimatePresence>
          </ul>
        </motion.nav>
      </div>
    </header>
  );
}
