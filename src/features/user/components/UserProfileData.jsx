import { useState, useEffect, useRef } from 'react';
import { AiOutlineSync } from 'react-icons/ai';
import {
  FaCamera,
  FaRegEdit,
  FaTrash,
  FaCheckCircle,
  FaEllipsisH,
  FaTelegramPlane,
} from 'react-icons/fa';
import { Button } from '@common/ui/utilities/Button';
import { useUserStore } from '@features/user';
import { useModalsStore } from '@store/modalsStore';
import { AnimatePresence, motion } from 'framer-motion';
import { CgProfile } from 'react-icons/cg';
import { FaEnvelope, FaGoogle } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { FcRemoveImage } from 'react-icons/fc';
import { showToast } from '@utils/toast';

export function UserProfileData() {
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
  const [error, setError] = useState(false);

  const avatarRef = useRef(null);

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
    <div className="flex flex-col max-w-2xl mx-auto items-center gap-4 p-3 sm:p-6 rounded-[50px] lg:rounded-full bg-surface shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        <div
          className="relative group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={avatarRef}
        >
          <div className="relative">
            <div
              className={`
                absolute inset-0 rounded-full pointer-events-none
                !transition duration-300
                ${isImgOptionsVisible ? 'opacity-100 bg-[rgba(0,0,0,0.4)]' : 'opacity-0'}
              `}
            ></div>
            {user?.avatarUrl ? (
              <div className="relative">
                <>
                  {error && (
                    <FcRemoveImage className="w-28 h-28 sm:w-36 sm:h-36 absolute right-1/2 translate-y-1/3 translate-x-1/2" />
                  )}
                </>
                <img
                  src={user?.avatarUrl}
                  alt=""
                  className="w-48 h-48 sm:w-60 sm:h-60 object-cover border-2 !border-[var(--main-primary)] rounded-full"
                  onError={() => {
                    showToast(
                      'Не удалось загрузить фото профиля. Пожалуйста проверьте подключение к интернету',
                      'error',
                    );
                    setError(true);
                  }}
                />
              </div>
            ) : (
              <MdAccountCircle className="w-48 h-48 sm:w-60 sm:h-60 text-center select-none flex items-center justify-center border-2 !border-[var(--main-primary)] rounded-full" />
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
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                    flex items-center justify-center rounded-full !p-0"
                  title="Опции"
                >
                  <FaEllipsisH
                    size={70}
                    className="!transition !p-0 text-white hover:!text-[var(--main-button-bg)]"
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
                    title={user?.avatarUrl ? 'Изменить фото' : 'Загрузить фото'}
                  >
                    {user?.avatarUrl ? <FaRegEdit /> : <FaCamera />}
                    {user?.avatarUrl ? 'Изменить' : 'Загрузить'}
                  </Button>
                  {user?.avatarUrl && (
                    <Button
                      onClick={() => {
                        setIsDeleteAvatarModalOpen(true);
                      }}
                      variant="tertiary"
                      className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
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
        <div className="text-center flex flex-col items-start">
          {user?.login && (
            <p
              className="text-lg flex items-center gap-2 justify-center"
              title="Ваш логин"
            >
              <CgProfile />
              {user?.login}
            </p>
          )}

          {user?.email && (
            <p
              className="text-lg flex items-center gap-2 justify-center"
              title="Ваша основная почта"
            >
              <FaEnvelope /> {user.email}
            </p>
          )}
          {user?.googleOAuthEnabled &&
            user?.googleEmail &&
            user.googleEmail !== user.email && (
              <p
                className="text-lg flex items-center gap-2 justify-center"
                title="Google почта"
              >
                <FaGoogle /> {user.googleEmail}
              </p>
            )}
          {user?.googleOAuthEnabled && (
            <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
              <FaGoogle /> Google-аккаунт привязан
            </p>
          )}
          {user?.telegramEnabled && (
            <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
              <FaTelegramPlane /> Telegram-аккаунт привязан
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
