import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { navLinks, legalLinks } from '@features/home/data';
import { useAuthStore } from '@features/auth';
import { ToggleTheme } from '@features/user/components/ToggleTheme';

export function Footer() {
  const token = useAuthStore((state) => state.accessToken);
  const linkClasses = ({ isActive }) =>
    `!transition-colors px-3 py-1 rounded-full ${
      isActive
        ? '!text-[var(--main-primary)] !bg-[var(--main-bg)]'
        : '!text-[var(--main-button-text)] hover:!text-[var(--main-text)]'
    }`;

  return (
    <footer className="flex-col sm:flex-row items-center flex py-6 px-5 text-base w-full">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center flex-col gap-8 sm:gap-4">
        <Link to="/" className="group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xlink="http://www.w3.org/1999/xlink"
            width="75"
            height="75"
            viewBox="4.409999847412109 -95.69999694824219 140.51998901367188 97.49000549316406"
          >
            <g
              fill="#fff"
              className="group-hover:!fill-[var(--main-text)] !transition-colors"
            >
              <path d="M19.37 -0.55C13.45 -2.11 8.83 -3.91 5.52 -5.93L11.72 -22.75C14.66 -21.19 18.32 -19.74 22.68 -18.41C27.05 -17.08 30.94 -16.41 34.34 -16.41C38.93 -16.41 42.47 -17.21 44.96 -18.82C47.44 -20.43 48.68 -22.57 48.68 -25.24C48.68 -26.98 47.74 -28.59 45.85 -30.06C43.97 -31.53 40.91 -33.51 36.68 -35.99C35.76 -36.45 34.38 -37.23 32.54 -38.34C26.29 -42.11 21.4 -45.23 17.86 -47.71C14.32 -50.2 11.19 -53.32 8.48 -57.09C5.77 -60.86 4.41 -65.09 4.41 -69.78C4.5 -74.74 5.91 -79.18 8.62 -83.08C11.33 -86.99 15.21 -90.07 20.27 -92.32C25.33 -94.58 31.26 -95.7 38.06 -95.7C42.66 -95.7 47.39 -95.04 52.26 -93.7C57.14 -92.37 61.41 -90.6 65.09 -88.39L58.47 -72.67C54.06 -74.51 50.42 -75.8 47.58 -76.53C44.73 -77.27 41.65 -77.64 38.34 -77.64C34.93 -77.64 32.15 -76.92 29.99 -75.5C27.83 -74.07 26.75 -72.12 26.75 -69.64C26.75 -67.62 27.65 -65.85 29.44 -64.33C31.23 -62.81 34.11 -61 38.06 -58.88C39.53 -58.24 41.05 -57.41 42.61 -56.4C49.23 -52.54 54.29 -49.39 57.78 -46.95C61.27 -44.52 64.35 -41.44 67.02 -37.72C69.68 -33.99 71.02 -29.74 71.02 -24.96C71.02 -19.81 69.57 -15.21 66.67 -11.17C63.78 -7.12 59.6 -3.95 54.13 -1.65C48.66 0.64 42.2 1.79 34.75 1.79C30.43 1.79 25.3 1.01 19.37 -0.55Z M135.97 -54.47L138.45 -37.51L106.87 -37.51L106.87 0L85.36 0L85.36 -93.63L142.45 -93.63L144.93 -76.81L106.87 -76.81L106.87 -54.47Z"></path>
            </g>
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
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end
                    className={linkClasses}
                  >
                    {link.label}
                  </NavLink>
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
                <NavLink key={path} to={path} end className={linkClasses}>
                  {label}
                </NavLink>
              </motion.div>
            ),
          )}
        </div>
        <ToggleTheme />
        <p className="text-center">© 2025 SharkFlow. Все права защищены.</p>
      </div>
    </footer>
  );
}
