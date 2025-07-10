import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { BiExit, BiSolidUpArrow } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { RiRobot2Line } from 'react-icons/ri';
import { useModalsStore } from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import { FaTelegram } from 'react-icons/fa';
import { Avatar } from '@common/ui/layout/Avatar';
import { GiHamburgerMenu } from 'react-icons/gi';

export const HeaderMenu = React.forwardRef(function HeaderMenu(
  {
    mode = 'desktop',
    navLinks = [],
    user,
    token,
    avatarLoading,
    onLinkClick,
    className = '',
  },
  ref,
) {
  const isDesktop = mode === 'desktop';
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const divRef = useRef(null);

  const setIsConnectTelegramModalOpen = useModalsStore(
    (state) => state.setIsConnectTelegramModalOpen,
  );

  const setIsLogoutUserModalOpen = useModalsStore(
    (state) => state.setIsLogoutUserModalOpen,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        divRef.current &&
        !divRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    if (onLinkClick) onLinkClick();
    if (!isDesktop) setIsOpen(false);
  };

  const linkClasses = ({ isActive }) =>
    `!transition-colors px-4 py-2 hover:!bg-black/60 hover:!text-[var(--main-header-text)] ${
      isActive ? '!bg-black/60' : ''
    }`;

  return (
    <nav
      ref={ref}
      className={
        isDesktop
          ? `items-center hidden sm:flex gap-4 text-[24px] relative ${className}`
          : `relative w-full flex justify-center ${className}`
      }
    >
      <div
        ref={divRef}
        className="cursor-pointer relative hover:bg-black/60 p-2 rounded-4xl transition-colors"
        onClick={() => {
          if (!avatarLoading) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {user?.avatarUrl && token ? (
          <div className="flex gap-2 items-center justify-center">
            {mode === 'desktop' ? (
              <>
                <Avatar src={user?.avatarUrl} size={50} />
                <IoMdArrowDropdown
                  size={30}
                  className={`!transition-all duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </>
            ) : (
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="primary"
                className="relative !bg-transparent !gap-[5px] !flex-col hover:!bg-transparent group"
              >
                <span
                  className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out
                  ${isOpen ? 'rotate-45 translate-y-1' : ''}`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-in-out
                  ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out
                  ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}
                />
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <MdAccountCircle className="w-10 h-10 flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full text-[var(--main-button-text)]" />
            <IoMdArrowDropdown
              size={30}
              className={`${isOpen ? 'rotate-180 !transition-all' : 'rotate-0'}`}
            />
          </div>
        )}
        {avatarLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
            <AiOutlineSync className="animate-spin text-white" size={20} />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {isDesktop && (
              <motion.div
                key="desktop-menu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                ref={menuRef}
                className="absolute top-24 right-[-20px] mt-2 w-52 bg-[var(--main-header-bg)] shadow-lg rounded-md z-50 border-1 border-[var(--main-heading)]"
              >
                <BiSolidUpArrow
                  size={40}
                  className="absolute top-[-20px] right-5 text-[var(--main-header-bg)] "
                />
                <div className="flex flex-col pt-2">
                  {user?.avatarUrl && user?.role === 'user' && token ? (
                    <Avatar
                      src={user?.avatarUrl}
                      size={100}
                      className="mx-auto"
                    />
                  ) : (
                    <MdAccountCircle className="w-20 h-20 mx-auto flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full text-[var(--main-button-text)]" />
                  )}

                  {user?.role === 'user' && (
                    <>
                      <p className="text-center">{user?.login}</p>
                      <p className="text-sm mx-auto border-b-2 border-white w-[80%] py-1 pb-4 mb-4">
                        {user?.email}
                      </p>
                    </>
                  )}

                  {user?.role === 'guest' && (
                    <>
                      <p className="mx-auto border-b-2 border-white w-[80%] py-1 pb-4 mb-4">
                        Гость
                      </p>
                    </>
                  )}

                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end
                      className={({ isActive }) =>
                        `${linkClasses({ isActive })}`
                      }
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon} {link.label}
                      </div>
                    </NavLink>
                  ))}
                  {token && (
                    <Button
                      variant="tertiary"
                      onClick={() => {
                        setIsOpen(false);
                        setIsLogoutUserModalOpen(true);
                      }}
                      className="!w-full flex justify-start !py-2 !px-4 !bg-[var(--main-header-bg)] !rounded-none !rounded-b-[5px] hover:!bg-black/60 hover:!text-[var(--main-header-text)]"
                    >
                      <div className="flex items-center gap-2">
                        <BiExit /> Выход
                      </div>
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {!isDesktop && (
              <motion.div
                key="mobile-menu"
                initial={{ transform: 'translateX(350px)' }}
                animate={{ transform: 'translateX(0px)' }}
                exit={{ transform: 'translateX(350px)' }}
                ref={menuRef}
                transition={{ duration: 0.4 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-xs h-full bg-[var(--main-header-bg)] shadow-lg p-3 flex flex-col overflow-hidden z-9999"
              >
                <div className="flex items-center justify-center mb-8 pb-8 border-b-1 border-b-white">
                  <div className="flex justify-between items-center w-full bg-black/20 p-2 rounded-full">
                    <div className="flex items-center gap-3">
                      {user?.avatarUrl && token ? (
                        <Avatar
                          src={user?.avatarUrl}
                          size={40}
                          className="mx-auto"
                        />
                      ) : (
                        <>
                          <MdAccountCircle className="w-12 h-12 text-[var(--main-button-text)]" />
                          <div>
                            <p className="text-left font-semibold">Логин</p>
                            <p className="text-left text-sm text-gray-200">
                              Почта
                            </p>
                          </div>
                        </>
                      )}
                      {user?.role === 'user' && token && (
                        <div>
                          <p className="font-semibold">{user?.login}</p>
                          <p className="text-sm text-gray-200">{user?.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    className="!bg-transparent !w-fit hover:!bg-black/20 !m-0 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoClose size={30} />
                  </Button>
                </div>
                <div className="flex-grow flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      end
                      className={({ isActive }) =>
                        `${linkClasses({ isActive })} !text-[var(--main-header-text)] px-4 py-3 !bg-black/20 rounded-full`
                      }
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center gap-2">
                        {link.icon} {link.label}
                      </div>
                    </NavLink>
                  ))}
                </div>
                {!user?.telegramEnabled && user?.role === 'user' && token && (
                  <Button
                    variant="primary"
                    className="!flex items-center !mb-4 !bg-black/20 hover:!bg-black/60 !rounded-full"
                    onClick={() => {
                      setIsOpen(false);
                      setIsConnectTelegramModalOpen(true);
                    }}
                  >
                    <FaTelegram size={20} />
                    Наш бот в Telegram!
                  </Button>
                )}
                {token && (
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsOpen(false);
                      setIsLogoutUserModalOpen(true);
                    }}
                    className="mt-auto !py-3 !px-4 !bg-black/20 hover:!bg-black/60 !rounded-full"
                  >
                    <div className="flex items-center gap-2">
                      <BiExit /> Выход
                    </div>
                  </Button>
                )}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </nav>
  );
});
