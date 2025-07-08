import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@common/ui/utilities/Button';
import { AiOutlineSync } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';

export const HeaderMenu = React.forwardRef(function HeaderMenu({
  mode = 'desktop',
  navLinks = [],
  user,
  token,
  avatarLoading,
  onLogout,
  onLinkClick,
  className = '',
}, ref) {
  const isDesktop = mode === 'desktop';
  const linkClasses = ({ isActive }) =>
    `!transition-colors px-3 py-1 rounded-full ${
      isActive ? '!text-[var(--main-primary)] !bg-[var(--main-bg)]' : ''
    }`;

  return (
    <nav
      ref={ref}
      className={
        isDesktop
          ? `items-center hidden sm:flex gap-4 text-[24px] ${className}`
          : `z-50 left-0 absolute w-full py-4 rounded-md shadow-md flex flex-col gap-3 text-lg items-center bg-[var(--main-header-bg)] sm:hidden ${className}`
      }
    >
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          end
          className={linkClasses}
          onClick={onLinkClick}
        >
          {link.label}
        </NavLink>
      ))}
      <Button
        title="Выйти из аккаунта"
        variant="tertiary"
        onClick={onLogout}
        className={`!w-fit !p-3 !bg-transparent hover:!bg-transparent !text-[24px] !font-normal !transition-colors !text-[var(--main-button-text)] hover:!text-[var(--main-text-hover)]  ${!token ? 'hidden pointer-events-none select-none' : null}`}
      >
        Выход
      </Button>
      {isDesktop && (
        <div className="relative">
          {user?.avatarUrl && token ? (
            <img
              key={user?.avatarUrl}
              src={user?.avatarUrl}
              alt=""
              className="w-10 h-10 object-cover border-2 !border-[var(--main-primary)] rounded-full"
            />
          ) : (
            <MdAccountCircle className="w-10 h-10 text-center select-none flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full" />
          )}
          {avatarLoading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
              <AiOutlineSync className="animate-spin text-white" size={20} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}); 