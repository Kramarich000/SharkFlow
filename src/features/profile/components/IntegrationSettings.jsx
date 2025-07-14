import { useState } from 'react';
import { useModalsStore } from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import { useUserStore } from '@features/user';
import { Button } from '@common/ui/utilities/Button';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import { GitHubAuthButton } from '@features/auth/components/GitHubAuthButton';
import { YandexAuthButton } from '@features/auth/components/YandexAuthButton';
import { GrIntegration } from 'react-icons/gr';
import { GoUnlock } from 'react-icons/go';
import { MdOutlineNearMeDisabled } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import { FaTelegramPlane, FaYandex } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

export const IntegrationSettings = () => {
  const user = useUserStore((state) => state.user);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [githubLoad, setGithubLoad] = useState(false);
  const [yandexLoad, setYandexLoad] = useState(false);

  const {
    setIsDisableGoogleModalOpen,
    setIsSetupTotpModalOpen,
    setIsDisableTotpModalOpen,
    setIsConnectTelegramModalOpen,
    isConnectTelegramModalOpen,
    setIsDisableTelegramModalOpen,
    setIsDisableGithubModalOpen,
    setIsDisableYandexModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDisableGoogleModalOpen: state.setIsDisableGoogleModalOpen,
      setIsSetupTotpModalOpen: state.setIsSetupTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
      setIsConnectTelegramModalOpen: state.setIsConnectTelegramModalOpen,
      isConnectTelegramModalOpen: state.isConnectTelegramModalOpen,
      setIsDisableTelegramModalOpen: state.setIsDisableTelegramModalOpen,
      setIsDisableGithubModalOpen: state.setIsDisableGithubModalOpen,
      setIsDisableYandexModalOpen: state.setIsDisableYandexModalOpen,
    })),
  );

  return (
    <div className="rounded-2xl p-8">
      <div className="flex items-center gap-5 mb-4">
        <GrIntegration size={36} />
        <h2 className="text-2xl font-bold">Интеграции</h2>
      </div>
      <p className="text-base mb-6 text-[var(--main-text-muted)]">
        Здесь вы можете попробовать различные интеграции
      </p>
      <div className="flex flex-col items-center justify-center gap-3">
        <div>
          <p>Статус</p>
          {user?.googleOAuthEnabled && user?.role === 'user' && (
            <>
              <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
                <FaGoogle /> Google-аккаунт привязан
              </p>
              <>
                {user?.googleEmail && (
                  <p
                    className="text-lg flex items-center gap-2 justify-center"
                    title="Google почта"
                  >
                    <FaGoogle /> {user.googleEmail}
                  </p>
                )}
              </>
            </>
          )}
          {user?.telegramEnabled && user?.role === 'user' && (
            <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
              <FaTelegramPlane /> Telegram-аккаунт привязан
            </p>
          )}

          {user?.githubOAuthEnabled && user?.role === 'user' && (
            <>
              <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
                <AiFillGithub /> GitHub-аккаунт привязан
              </p>
              {user?.githubEmail && (
                <p
                  className="text-lg flex items-center gap-2 justify-center"
                  title="Google почта"
                >
                  <AiFillGithub /> {user.githubEmail}
                </p>
              )}
            </>
          )}
          {user?.yandexOAuthEnabled && user?.role === 'user' && (
            <>
              <p className="text-green-600 text-left text-lg flex items-center gap-2 justify-center rounded-2xl ">
                <FaYandex /> Yandex-аккаунт привязан
              </p>
              <>
                {user?.yandexEmail && user.yandexEmail !== user.email && (
                  <p
                    className="text-lg flex items-center gap-2 justify-center"
                    title="Google почта"
                  >
                    <FaYandex /> {user.yandexEmail}
                  </p>
                )}
              </>
            </>
          )}
        </div>
        <div className="grid sm:grid-cols-2 xl:flex gap-4 pb-4 mt-auto">
          {user?.googleOAuthEnabled ? (
            <Button
              variant="primary"
              className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDisableGoogleModalOpen(true)}
            >
              <GoUnlock size={20} /> Отвязать Google
            </Button>
          ) : (
            <GoogleAuthButton
              btnText="Привязать Google"
              className="!flex !flex-col"
              isNavigated={false}
              isAuth={false}
              googleLoad={googleLoad}
              setGoogleLoad={setGoogleLoad}
              disabled={googleLoad}
            />
          )}
          {user?.yandexOAuthEnabled ? (
            <Button
              variant="primary"
              className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDisableYandexModalOpen(true)}
            >
              <GoUnlock size={20} /> Отвязать Yandex
            </Button>
          ) : (
            <YandexAuthButton
              btnText="Привязать Yandex"
              className="!flex !flex-col"
              mode="connect"
              isNavigated={false}
              isAuth={false}
              yandexLoad={yandexLoad}
              setYandexLoad={setYandexLoad}
              disabled={yandexLoad}
            />
          )}
          {user?.githubOAuthEnabled ? (
            <Button
              variant="primary"
              className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDisableGithubModalOpen(true)}
            >
              <GoUnlock size={20} /> Отвязать Github
            </Button>
          ) : (
            <GitHubAuthButton
              btnText="Привязать Github"
              mode="connect"
              nextPath="/profile"
              githubLoad={githubLoad}
              setGithubLoad={setGithubLoad}
              captchaToken={null}
              disabled={githubLoad}
            />
          )}
          {user?.telegramEnabled ? (
            <Button
              variant="primary"
              className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDisableTelegramModalOpen(true)}
            >
              <MdOutlineNearMeDisabled size={20} /> Отвязать Telegram
            </Button>
          ) : (
            <Button
              variant="primary"
              className="!flex !flex-col"
              onClick={() => setIsConnectTelegramModalOpen(true)}
              disabled={isConnectTelegramModalOpen}
            >
              <RiRobot2Line size={20} /> Наш бот в Telegram!
            </Button>
          )}{' '}
        </div>
      </div>
    </div>
  );
};
