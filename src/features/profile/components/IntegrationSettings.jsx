import { useState, useEffect } from 'react';
import { useModalsStore } from '@store/modalsStore';
import { TbAuth2Fa } from 'react-icons/tb';
import { useShallow } from 'zustand/shallow';
import { useUserStore } from '@features/user';
import { Button } from '@common/ui/utilities/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@common/ui/utilities/Accordion';
import { FaShieldAlt } from 'react-icons/fa';
import { MdManageAccounts } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { MdOutlineNearMeDisabled } from 'react-icons/md';
import { RiRobot2Line } from 'react-icons/ri';
import { GoUnlock } from 'react-icons/go';
import { GoogleAuthButton } from '@features/auth/components/GoogleAuthButton';
import { GitHubAuthButton } from '@features/auth/components/GitHubAuthButton';
import { AiOutlineSync } from 'react-icons/ai';
import { YandexAuthButton } from '@features/auth/components/YandexAuthButton';
import { GrIntegration } from 'react-icons/gr';

export const IntegrationSettings = () => {
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

  const user = useUserStore((state) => state.user);
  const twoFactorEnabled = user?.twoFactorEnabled;

  return (
    <AccordionItem value="integraion" className="border-0">
      <AccordionTrigger className="flex !px-1 items-center gap-4 bg-[var(--main-button-bg)] hover:no-underline hover:bg-[var(--main-button-hover)]">
        <GrIntegration size={30} className="!rotate-0" />
        <p>Интеграции</p>
      </AccordionTrigger>

      <AccordionContent>
        <h2 className="text-sm mt-1 text-[var(--main-text-muted)]">
          Здесь вы можете попробовать различные интеграции
        </h2>

        <div className="flex flex-col gap-4 mt-4">
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
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
