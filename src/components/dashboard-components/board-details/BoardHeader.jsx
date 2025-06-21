import { FaPlus, FaTrash } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { AiOutlineSync } from 'react-icons/ai';
import { ColorSelector } from '@components/dashboard-components/ColorSelector';
import { DialogTitle } from '@headlessui/react';

const BoardHeader = ({
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
          className="text-center text-4xl overflow-y-hidden border-b-1 mb-4 pb-2 border-[#111111] focus:outline-none w-full"
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
            <button
              className={`!p-2 ${load ? '' : 'group'}`}
              onClick={saveDeleteBoard}
              disabled={load}
              title="Удалить доску"
            >
              <FaTrash
                size={40}
                className="group-hover:text-red-500 transition-colors"
              />
            </button>
            <div className="flex w-full items-center flex-col gap-4">
              <ColorSelector
                wrapperClassName={`absolute z-50 !w-full !p-0 ${
                  load ? 'pointer-events-none' : null
                }`}
                pickerClassName="!top-[50px] !p-2 !w-full !left-0 flex-wrap overflow-y-auto max-h-[500px] !absolute"
                color={newColor}
                setColor={setNewColor}
                disabled={load}
              />
            </div>
            <button
              className="!p-2"
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
                <AiOutlineSync size={40} className="animate-spin duration-75" />
              ) : (
                <IoCheckmark size={40} />
              )}
            </button>
          </>
        ) : (
          <>
            <button
              key="create-task"
              className="primary-btn !p-1 sm:!p-2 !w-fit !m-0"
              onClick={() => setIsCreateTaskModalOpen(true)}
              disabled={load}
              title="Создать задачу"
            >
              <div className="flex gap-4 items-center justify-center">
                <p className="sm:text-xl font-normal">Создать задачу</p>{' '}
                <FaPlus size={30} color="rgb(255, 255, 255)" />
              </div>
            </button>

            <button
              onClick={() => setisEditing(true)}
              title="Редактировать"
              disabled={load}
              className="!p-0 !py-2"
            >
              <IoMdSettings size={40} />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default BoardHeader;
