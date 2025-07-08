import { useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { IoClose } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';
import { useTaskStore } from '@features/tasks';
import { useBoardStore } from '@features/boards';
import { useModalsStore } from '@store/modalsStore';
import { Button } from '@common/ui/utilities/Button';
import { ModalBase } from '@common/ui/layout/ModalBase';

export function DeleteTaskModal() {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const { isDeleteTaskModalOpen, setIsDeleteTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      isDeleteTaskModalOpen: state.isDeleteTaskModalOpen,
      setIsDeleteTaskModalOpen: state.setIsDeleteTaskModalOpen,
    })),
  );

  const [load, setLoad] = useState(false);

  const handleDeleteTask = async () => {
    setLoad(true);
    try {
      const deletedTask = await deleteTask();
      if (deletedTask) {
        setIsDeleteTaskModalOpen(false);
        setLoad(false);
      }
    } finally {
      setLoad(false);
    }
  };

  const handleClose = () => setIsDeleteTaskModalOpen(false);

  return (
    <ModalBase
      open={isDeleteTaskModalOpen}
      onClose={handleClose}
      maxWidth="max-w-3xl h-full"
    >
      <h2 className="text-[31px] text-center mb-4">Удаление задачи</h2>
      <p className="text-xl text-center mb-6">
        Вы действительно хотите удалить задачу?
      </p>
      <div className="w-full flex gap-4">
        <Button
          variant="primary"
          className="!m-0 !mt-auto"
          title="Отмена"
          onClick={handleClose}
          disabled={load}
        >
          Отмена
        </Button>
        <Button
          variant="primary"
          className="!m-0 !mt-auto"
          onClick={handleDeleteTask}
          title="Удалить задачу"
          disabled={load}
        >
          {load ? (
            <AiOutlineSync className="animate-spin !text-white" size={23} />
          ) : (
            <>Удалить</>
          )}
        </Button>
      </div>
    </ModalBase>
  );
}
