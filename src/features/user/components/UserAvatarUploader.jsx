import { useState, useEffect, useRef } from 'react';
import { AiOutlineSync } from 'react-icons/ai';
import { FaCamera, FaRegEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { Button } from '@common/ui/utilities/Button';
import { useUserStore } from '@features/user';
import { useModalsStore } from '@store/modalsStore';
import { AnimatePresence, motion } from 'framer-motion';

export function UserAvatarUploader() {
  const user = useUserStore((state) => state.user);
  const setIsAvatarCropModalOpen = useModalsStore(
    (state) => state.setIsAvatarCropModalOpen,
  );
  const setIsDeleteAvatarModalOpen = useModalsStore(
    (state) => state.setIsDeleteAvatarModalOpen,
  );
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [isImgOptionsVisible, setIsImgOptionsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (user.avatarUrl) setAvatarLoading(true);
  }, [user.avatarUrl]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClick(e) {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen]);

  function handleButtonClick() {
    setIsAvatarCropModalOpen(true);
    setIsMenuOpen(false);
  }

  function handleMenuToggle(e) {
    e.stopPropagation();
    setIsMenuOpen((v) => !v);
  }

  function handleMouseEnter() {
    setIsImgOptionsVisible(true);
  }
  function handleMouseLeave() {
    setIsImgOptionsVisible(false);
    setIsMenuOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-full bg-surface shadow-lg overflow-hidden">
      <div className="flex items-center justify-center gap-6">
        <div
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={avatarRef}
        >
          <div className="relative">
            {user.avatarUrl ? (
              <img
                src={user?.avatarUrl}
                alt=""
                className="w-48 h-48 sm:w-60 sm:h-60 object-cover border-2 !border-[var(--main-primary)] rounded-full"
                onLoad={() => setAvatarLoading(false)}
                onError={() => setAvatarLoading(false)}
              />
            ) : (
              <p className="w-48 h-48 sm:w-60 sm:h-60 text-center select-none flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full">
                Фото профиля
              </p>
            )}
            {avatarLoading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                <AiOutlineSync className="animate-spin text-white" size={40} />
              </div>
            )}
            <AnimatePresence>
              {isImgOptionsVisible && !isMenuOpen && (
                <motion.button
                  key="avatar-ellipsis"
                  initial={{ opacity: 0, transform: 'translateY(10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  onClick={handleMenuToggle}
                  className="absolute top-4 right-4 rounded-full p-2 group/avatarbtn !transition"
                  title="Опции"
                >
                  <FaEllipsisH
                    size={28}
                    className="group-hover/avatarbtn:text-[var(--main-button-bg)] !transition"
                  />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  key="avatar-menu"
                  initial={{ opacity: 0, transform: 'translateY(10px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-10px)' }}
                  className="absolute bottom-14 right-2 flex flex-col gap-2 bg-[var(--main-modal-bg)] border border-[var(--main-modal-border)] rounded-xl shadow-lg p-2 z-30 animate-fade-in"
                >
                  <Button
                    onClick={handleButtonClick}
                    variant="tertiary"
                    className="flex items-center gap-2 text-[var(--main-primary)] hover:text-[var(--main-hover)]"
                    title={user.avatarUrl ? 'Изменить фото' : 'Загрузить фото'}
                  >
                    {user.avatarUrl ? <FaRegEdit /> : <FaCamera />}
                    {user.avatarUrl ? 'Изменить' : 'Загрузить'}
                  </Button>
                  {user.avatarUrl && (
                    <Button
                      onClick={() => {
                        setIsDeleteAvatarModalOpen(true);
                      }}
                      variant="tertiary"
                      className="flex items-center gap-2 text-red-500 hover:text-red-700"
                      title="Удалить фото"
                    >
                      <FaTrash /> Удалить
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">{user?.login}</p>
          <p className="text-lg">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}
