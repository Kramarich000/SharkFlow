import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineSync } from 'react-icons/ai';
import { DialogTitle } from '@headlessui/react';

import { ColorSelector } from '@common/ui';
import { Button } from '@common/ui/utilities/Button';

export const BoardHeader = ({
  isEditing,
  newTitle,
  setNewTitle,
  saveUpdateBoard,
  setisEditing,
  selectedBoard,
  load,
  saveDeleteBoard,
  newColor,
  setNewColor,
  setIsCreateTaskModalOpen,
}) => {
  return (
    <>
      {isEditing ? (
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveUpdateBoard();
            if (e.key === 'Escape') setisEditing(false);
          }}
          autoFocus
          className="text-center text-4xl overflow-y-hidden border-b-1 mb-4 pb-2 border-[var(--main-primary)] focus:outline-none w-full"
          disabled={load}
          maxLength={64}
        />
      ) : (
        <DialogTitle
          onClick={() => setisEditing(true)}
          className="text-center min-h-[50px] mb-0 sm:mb-4 text-4xl overflow-hidden overflow-ellipsis whitespace-nowrap pb-2 border-b-1 border-transparent"
        >
          {selectedBoard?.title}
        </DialogTitle>
      )}
      <div
        className={`relative flex items-center gap-2 md:my-2 ${
          isEditing ? 'justify-between' : 'justify-between'
        }`}
      >
        {isEditing ? (
          <>
            <Button
              variant="tertiary"
              onClick={saveDeleteBoard}
              disabled={load}
              title="Удалить доску"
            >
              <FaTrash
                size={28}
                className="group-hover:text-red-500 transition-colors"
              />
            </Button>
            <div className="flex w-full items-center flex-col gap-4">
              <ColorSelector
                wrapperClassName={`absolute z-50 !w-full !p-0 ${
                  load ? 'pointer-events-none' : null
                }`}
                pickerClassName="!top-[50px] !overflow-x-hidden !p-2 !w-full !left-0 flex-wrap overflow-y-auto max-h-[500px] !absolute"
                color={newColor}
                setColor={setNewColor}
                disabled={load}
              />
            </div>
            <Button
              variant="tertiary"
              onClick={saveUpdateBoard}
              title="Сохранить"
              disabled={load}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  saveUpdateBoard();
                }
              }}
            >
              {load ? (
                <AiOutlineSync size={28} className="animate-spin duration-75" />
              ) : (
                <IoCheckmark size={28} />
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              key="create-task"
              className="!w-fit !m-0"
              variant="primary"
              onClick={() => setIsCreateTaskModalOpen(true)}
              disabled={load}
              title="Создать задачу"
            >
              <div className="flex gap-4 items-center justify-center">
                <>Создать задачу</>
                <FaPlus />
              </div>
            </Button>

            <Button
              variant="tertiary"
              onClick={() => setisEditing(true)}
              title="Редактировать"
              disabled={load}
            >
              <IoMdSettings size={28} />
            </Button>
          </>
        )}
      </div>
    </>
  );
};
