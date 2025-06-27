import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { navLinks, legalLinks } from '@features/home/data';
import { useAuthStore } from '@features/auth';

export function Footer() {
  const token = useAuthStore((state) => state.accessToken);

  return (
    <footer className="flex-col sm:flex-row items-center flex py-6 px-5 text-base w-full">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center flex-col gap-8 sm:gap-4">
        <Link to="/" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 -123.34 220.2 123.34"
          >
            <path
              d="M31.58 -88.22L31.58 0L73.4 0L73.4 -88.22L104.98 -88.22L104.98 -123.34L0 -123.34L0 -88.22Z M128.8 -123.34L128.8 0L170.62 0L170.62 -45.88L205.73 -45.88L205.73 -77.46L170.62 -77.46L170.62 -88.22L220.2 -88.22L220.2 -123.34Z"
              className="fill-white group-hover:fill-gray-400 transition-colors"
            />
          </svg>
        </Link>
        <motion.nav
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          key={token ? 'auth-footer-nav' : 'anon-footer-nav'}
        >
          <ul className="flex flex-wrap items-center justify-center gap-4 text-[20px]">
            <AnimatePresence>
              {navLinks(token).map((link) => (
                <motion.li
                  key={`${token ? 'auth' : 'anon'}-${link.path}`}
                  initial={{ opacity: 0, transform: 'translateY(-10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                >
                  <Link to={link.path}>{link.label}</Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.nav>
        <div className="flex flex-wrap justify-center gap-6 text-[18px]">
          {legalLinks.map(({ path, label, external }) =>
            external ? (
              <motion.a
                key={label}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                {label}
              </motion.a>
            ) : (
              <motion.div
                key={label}
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Link to={path} className="transition">
                  {label}
                </Link>
              </motion.div>
            ),
          )}
        </div>
        <p className="text-center">© 2025 SharkFlow. Все права защищены.</p>
      </div>
    </footer>
  );
}
