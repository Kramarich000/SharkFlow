import { Button } from '@common/ui/utilities/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@common/ui/utilities/Accordion';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useModalsStore } from '@store/modalsStore';
import { useShallow } from 'zustand/shallow';
import { MdManageAccounts } from 'react-icons/md';
import { MdPhonelink } from 'react-icons/md';

export const AccountSettings = () => {
  const {
    setIsDeleteUserModalOpen,
    setIsUpdateUserModalOpen,
    setIsUserSessionsModalOpen,
  } = useModalsStore(
    useShallow((state) => ({
      setIsDeleteUserModalOpen: state.setIsDeleteUserModalOpen,
      setIsUpdateUserModalOpen: state.setIsUpdateUserModalOpen,
      setIsUserSessionsModalOpen: state.setIsUserSessionsModalOpen,
    })),
  );

  return (
    <AccordionItem value="account" className="border-0">
      <AccordionTrigger className="flex !px-1 items-center gap-4 bg-[var(--main-button-bg)] hover:no-underline hover:bg-[var(--main-button-hover)]">
        <MdManageAccounts size={30} className="!rotate-0" />
        <p>Управление аккаунтом</p>
      </AccordionTrigger>

      <AccordionContent>
        <h2 className="text-sm mt-1 text-[var(--main-text-muted)]">
          Здесь вы можете изменить имя, email или удалить аккаунт
        </h2>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 mt-4 items-center justify-between">
          <Button
            variant="primary"
            onClick={() => setIsUpdateUserModalOpen(true)}
            className="!flex !flex-col"
          >
            <FaPen size={20} /> Изменить данные
          </Button>
          <Button
            variant="primary"
            className="!flex !flex-col !bg-[var(--main-btn-delete-bg)] hover:!bg-[var(--main-btn-delete-hover-bg)]"
            onClick={() => setIsDeleteUserModalOpen(true)}
          >
            <FaTrash size={20} /> Удалить аккаунт
          </Button>
        </div>
        <Button
          variant="primary"
          className="!flex !flex-col"
          onClick={() => setIsUserSessionsModalOpen(true)}
        >
          <MdPhonelink size={20} /> Просмотреть активные сессии
        </Button>
      </AccordionContent>
    </AccordionItem>
  );
};
