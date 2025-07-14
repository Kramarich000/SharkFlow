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
import { AiOutlineSync } from 'react-icons/ai';

export const SecuritySettings = () => {
  const { setIsSetupTotpModalOpen, setIsDisableTotpModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsSetupTotpModalOpen: state.setIsSetupTotpModalOpen,
      setIsDisableTotpModalOpen: state.setIsDisableTotpModalOpen,
    })),
  );

  const user = useUserStore((state) => state.user);
  const twoFactorEnabled = user?.twoFactorEnabled;

  return (
    <AccordionItem value="security" className="border-0">
      <AccordionTrigger className="flex !px-1 items-center gap-4 bg-[var(--main-button-bg)] hover:no-underline hover:bg-[var(--main-button-hover)]">
        <FaShieldAlt size={30} className="!rotate-0" />
        <p>Безопасность</p>
      </AccordionTrigger>

      <AccordionContent>
        <h2 className="text-sm mt-1 text-[var(--main-text-muted)]">
          Здесь вы можете изменить параметры безопасности
        </h2>

        <div className="flex flex-col gap-4 mt-4">
          {!twoFactorEnabled ? (
            <Button
              variant="primary"
              className="!flex !flex-col"
              onClick={() => setIsSetupTotpModalOpen(true)}
            >
              <TbAuth2Fa size={20} /> Подключить 2FA
            </Button>
          ) : (
            <Button
              variant="primary"
              className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
              onClick={() => setIsDisableTotpModalOpen(true)}
            >
              <TbAuth2Fa size={20} /> Отключить 2FA
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
