import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer({ isAuthenticated }) {
  return (
    <footer className="bg-[#111111] text-white p-4 px-8 text-xl w-full mt-4">
      <div className="max-w-[1240px] mx-auto px-5">
        <motion.nav
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
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
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/register">Регистрация</Link>
                </li>
                |
                <li>
                  <Link to="/login">Вход</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard">Мои задачи</Link>
                </li>
                |
                <li>
                  <Link to="/settings">Настройки</Link>
                </li>
                |
                {/* <li>
                <Link to="/">Выход</Link>
              </li> */}
              </>
            )}
          </ul>
        </motion.nav>
        <div className="flex gap-4 justify-center items-center mt-4">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/privacy">Политика конфиденциальности</Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/terms">Условия пользования</Link>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            href="https://github.com/Kramarich000/TaskFlow"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </motion.a>
        </div>
        <motion.p
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0)' }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-4"
        >
          © 2025 TaskFlow. Все права защищены.
        </motion.p>
      </div>
    </footer>
  );
}
