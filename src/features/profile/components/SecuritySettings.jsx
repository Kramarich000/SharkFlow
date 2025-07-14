import { useModalsStore } from '@store/modalsStore';
import { TbAuth2Fa } from 'react-icons/tb';
import { useShallow } from 'zustand/shallow';
import { useUserStore } from '@features/user';
import { Button } from '@common/ui/utilities/Button';
import { FaShieldAlt } from 'react-icons/fa';

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
    <div className="rounded-2xl p-8">
      <div className="flex items-center gap-5 mb-4">
        <FaShieldAlt size={36} />
        <h2 className="text-2xl font-bold">Безопасность</h2>
      </div>
      <p className="text-base mb-6 text-[var(--main-text-muted)]">
        Здесь вы можете изменить параметры безопасности
      </p>
      <div className="flex flex-col gap-4">
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
            className="!flex !flex-col !w-fit !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
            onClick={() => setIsDisableTotpModalOpen(true)}
          >
            <TbAuth2Fa size={20} /> Отключить 2FA
          </Button>
        )}
      </div>
    </div>
  );
};
