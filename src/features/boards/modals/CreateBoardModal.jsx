import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';

import { ColorSelector } from '@common/ui';
import { useCreateBoard } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';

export function CreateBoardModal() {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('transparent');
  const { mutate: createBoard, isPending } = useCreateBoard();

  const { isCreateBoardModalOpen, setIsCreateBoardModalOpen } = useModalsStore(
    useShallow((state) => ({
      isCreateBoardModalOpen: state.isCreateBoardModalOpen,
      setIsCreateBoardModalOpen: state.setIsCreateBoardModalOpen,
    })),
  );

  const handleCreateBoard = async () => {
    if (isPending) return;

    createBoard(
      { title, color },
      {
        onSuccess: () => {
          setIsCreateBoardModalOpen(false);
          setTitle('');
          setColor('transparent');
        },
      },
    );
  };

  const handleClose = () => {
    setIsCreateBoardModalOpen(false);
    setColor('transparent');
  };

  return (
    <ModalBase
      open={isCreateBoardModalOpen}
      onClose={handleClose}
      maxWidth="max-w-2xl"
    >
      <h2 className="text-[31px] text-center mb-4">Создание доски</h2>
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="relative w-full">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCreateBoard();
              }
            }}
            className="peer input-styles w-full input-primary"
            placeholder=" "
            required
            disabled={isPending}
            maxLength={64}
          />
          <label className="label-styles !bg-[var(--main-modal-bg)]">
            Введите название доски
          </label>
        </div>

        <ColorSelector
          wrapperClassName={`relative ${isPending ? 'pointer-events-none' : ''}`}
          pickerClassName="!w-full !relative lg:!absolute !flex-row !flex-wrap"
          color={color}
          setColor={setColor}
          disabled={isPending}
        />

        <Button
          title="Создать"
          variant="primary"
          onClick={handleCreateBoard}
          disabled={isPending}
        >
          {isPending ? (
            <AiOutlineSync size={23} className="animate-spin" />
          ) : (
            <>Создать</>
          )}
        </Button>
        <Button
          className="flex lg:hidden"
          title="Закрыть"
          variant="primary"
          onClick={handleClose}
          disabled={isPending}
        >
          Закрыть
        </Button>
        <div className="mt-6 hidden lg:inline-flex">
          <button
            title="Закрыть"
            className="!transition !text-[var(--main-text)] absolute top-0 right-0 justify-center px-4 py-2 text-sm hover:!text-[var(--main-primary-hover)]"
            onClick={handleClose}
            disabled={isPending}
          >
            <IoClose size={40} />
          </button>
        </div>
      </div>
    </ModalBase>
  );
}
