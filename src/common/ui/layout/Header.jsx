import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

import { navLinks } from '@features/home/data';
import { useAuthStore } from '@features/auth';
import { useModalsStore } from '@store/modalsStore';
import { useUserStore } from '@features/user';
import { Button } from '@common/ui/utilities/Button';
import { HeaderMenu } from './HeaderMenu';

export function Header() {
  const token = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.userRole);

  const [avatarLoading, setAvatarLoading] = useState(false);

  const user = useUserStore((state) => state.user);

  const navRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!user?.avatarUrl) return;
    setAvatarLoading(true);
    const img = new Image();
    img.src = user?.avatarUrl;
    const handleDone = () => setAvatarLoading(false);
    img.onload = handleDone;
    img.onerror = handleDone;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [user?.avatarUrl]);

  return (
    <header className="py-4 px-5 w-full shadow-md">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center flex-col gap-y-4 lg:flex-row">
        <Link to="/" className="group flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xlink="http://www.w3.org/1999/xlink"
            width="75"
            height="75"
            className="flex"
            viewBox="9.20199966430664 17.94099998474121 81.58900451660156 64.12199401855469"
          >
            <g
              fill="#fff"
              className="group-hover:!fill-[var(--main-text)] !transition-colors"
            >
              <path d="M31.73 17.941c-1.395 0-2.871.055-4.43.18 0 0 10.406 5.375 9.625 11.688a55.617 55.617 0 0 0-5.285 2.234c-5.715.414-13.922 2.469-22.438 9.516 0 0 6.117-1.196 11.871-1.578-1.316 1.687-2.273 3.515-2.805 5.492-5.457 20.37 19.762 28.059 31.504 28.059 0 0 4.754 7.054 11.484 8.531-4.195-6.836 2.325-22.145 29.203-31.832 0 0-18.582-2.77-38.719 17.391-3.328 3.332-10.066.98-11.55-4.55-1.184-4.419 2.785-8.419 6.796-9.49 1.504-.401 3.297-.972 5.282-1.675 2.847 2.094 3.402 6.668 3.73 7.898 4.313-2.875 5.426-9.011 5.707-11.64 13.523-5.856 29.086-14.599 29.086-20.087-6.531-3.769-22.203-4.714-37.359-2.378-.969-1.235-6.793-7.75-21.707-7.758zm41.348 9.723v-.004c.77.004 1.395.715 1.395 1.59 0 .879-.626 1.59-1.395 1.593-.367 0-.723-.168-.984-.464a1.72 1.72 0 0 1-.41-1.13c0-.421.148-.824.41-1.124.261-.297.617-.465.984-.465zm-15.449 1.218s-.879 1.239-.879 4.004.879 4.004.879 4.004-1.969-1.36-1.969-4.004c0-2.64 1.969-4.004 1.969-4.004zm-4.504 1.055s-.879 1.238-.879 4.004.88 4.004.88 4.004-1.97-1.36-1.97-4.004c0-2.64 1.97-4.004 1.97-4.004zm-4.504 1.125s-.879 1.238-.879 4.004.88 4.004.88 4.004-1.973-1.36-1.973-4.004c0-2.64 1.972-4.004 1.972-4.004z"></path>
            </g>
          </svg>
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

        <HeaderMenu
          mode="desktop"
          navLinks={navLinks(token)}
          user={user}
          token={token}
          avatarLoading={avatarLoading}
          onLogout={() => {
            setIsLogoutUserModalOpen(true);
          }}
        />

        {role === 'guest' && <p className="text-2xl">Гостевой аккаунт</p>}
      </div>

      <div className="sm:hidden">
        <AnimatePresence>
          <HeaderMenu
            mode="mobile"
            navLinks={navLinks(token)}
            user={user}
            token={token}
            avatarLoading={avatarLoading}
            onLogout={() => setIsLogoutUserModalOpen(true)}
            onLinkClick={() => {}}
            ref={navRef}
          />
        </AnimatePresence>
      </div>
    </header>
  );
}
