import { useState, useEffect } from 'react';
import { useModalsStore } from '@store/modalsStore';
import { AiOutlineSync } from 'react-icons/ai';
import { TbAuth2Fa } from 'react-icons/tb';
import { useShallow } from 'zustand/shallow';
import { useUserStore } from '@features/user';
import { ToggleTheme } from '@features/user/components/ToggleTheme';
import { Button } from '@common/ui/utilities/Button';
import { UserProfileData } from '@features/user/components/UserProfileData';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [googleLoad, setGoogleLoad] = useState(false);
  const {
    setIsDeleteUserModalOpen,
    setIsUpdateUserModalOpen,
    setIsDisableGoogleModalOpen,
    setIsSetupTotpModalOpen,
    setIsDisableTotpModalOpen,
    setIsConnectTelegramModalOpen,
    setIsDisableTelegramModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDeleteUserModalOpen: state.setIsDeleteUserModalOpen,
      setIsUpdateUserModalOpen: state.setIsUpdateUserModalOpen,
      setIsDisableGoogleModalOpen: state.setIsDisableGoogleModalOpen,
      setIsSetupTotpModalOpen: state.setIsSetupTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
      setIsConnectTelegramModalOpen: state.setIsConnectTelegramModalOpen,
      setIsDisableTelegramModalOpen: state.setIsDisableTelegramModalOpen,
    })),
  );

  const user = useUserStore((state) => state.user);
  const role = user?.role;
  const twoFactorEnabled = user?.twoFactorEnabled;
  console.log(user);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-0 sm:p-10 lg:p-30 lg:px-50 h-full">
      {/* <p>роль: {role}</p> */}
      {loading ? (
        <div className="h-full flex-col flex items-center justify-center">
          <div
            key="loader"
            style={{ animation: 'spin 1.2s linear infinite' }}
            className="text-7xl flex gap-8 text-center"
          >
            <AiOutlineSync />
          </div>
          <p className="text-4xl mt-4 animate-pulse">Загрузка ваших данных</p>
        </div>
      ) : role === 'guest' ? (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <div>
            <p className="text-4xl mb-4">Гостевой аккаунт</p>
            <p className="text-xl">
              Это гостевой аккаунт, войдите или зарегистрируйтесь в течении 24
              часов чтобы сохранить данные
            </p>
          </div>
          <ToggleTheme />
        </div>
      ) : (
        <div className="flex gap-8 items-center justify-center flex-col p-4 rounded-3xl h-full">
          <UserProfileData />
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              onClick={() => setIsUpdateUserModalOpen(true)}
            >
              Изменить данные
            </Button>
            {user?.googleOAuthEnabled ? (
              <Button
                variant="primary"
                className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                onClick={() => setIsDisableGoogleModalOpen(true)}
              >
                Отключить авторизацию через Google
              </Button>
            ) : (
              <GoogleAuthButton
                btnText="Подключить авторизацию через Google"
                isNavigated={false}
                isAuth={false}
                googleLoad={googleLoad}
                setGoogleLoad={setGoogleLoad}
                disabled={googleLoad}
              />
            )}
            {user?.telegramEnabled ? (
              <Button
                variant="primary"
                className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                onClick={() => {
                  setIsDisableTelegramModalOpen(true);
                  console.log('asd');
                }}
              >
                Отвязать Telegram
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsConnectTelegramModalOpen(true)}
              >
                Попробуйте нашего бота в Telegram!
              </Button>
            )}

            {!twoFactorEnabled ? (
              <Button
                variant="primary"
                onClick={() => setIsSetupTotpModalOpen(true)}
              >
                <TbAuth2Fa size={24} /> Подключить двуфакторную аутентификацию
              </Button>
            ) : (
              <Button
                variant="primary"
                className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
                onClick={() => setIsDisableTotpModalOpen(true)}
              >
                <TbAuth2Fa size={24} /> Отключить двуфакторную аутентификацию
              </Button>
            )}
            <Button
              variant="primary"
              className="!bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDeleteUserModalOpen(true)}
            >
              Удалить аккаунт
            </Button>
          </div>
          <ToggleTheme />
        </div>
      )}
    </div>
  );
}
