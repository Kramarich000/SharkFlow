import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function Footer() {
  const token = useAuthStore((state) => state.accessToken);

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

  const legalLinks = [
    { path: '/privacy', label: 'Политика конфиденциальности' },
    { path: '/terms', label: 'Условия пользования' },
    {
      path: 'https://github.com/Kramarich000/TaskFlow',
      label: 'GitHub',
      external: true,
    },
  ];

  return (
    <footer className="bg-[#111111] flex-col sm:flex-row items-center flex text-white py-6 px-5 text-base w-full mt-6">
      <Link to="/" className="mb-4 sm:mb-0">
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
      <div className="max-w-[1240px] mx-auto space-y-6">
        <motion.nav
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <ul className="flex flex-wrap gap-4 items-center justify-center sm:justify-between text-lg">
            <AnimatePresence>
              {navLinks.map((link) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Link to={link.path} className="hover:text-gray-300">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.nav>
        <div className="flex flex-wrap justify-center gap-6">
          {legalLinks.map(({ path, label, external }) =>
            external ? (
              <motion.a
                key={label}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                {label}
              </motion.a>
            ) : (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Link to={path} className="hover:text-white transition">
                  {label}
                </Link>
              </motion.div>
            ),
          )}
        </div>
        <p className="text-center">© 2025 TaskFlow. Все права защищены.</p>
      </div>
    </footer>
  );
}
