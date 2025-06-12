import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useBoards } from '@hooks/useBoards';
import { useTasks } from '@hooks/useTasks';
import CreateBoardModal from '@components/dashboard-components/CreateBoardModal';
import CreateTaskModal from '@components/dashboard-components/CreateTaskModal';
import BoardDetailsModal from '@components/dashboard-components/BoardDetailsModal';
import { showToast } from '@utils/toast';

export default function DashboardPage() {
  const {
    boards,
    selectedBoard,
    isOpen,
    isEditingTitle,
    title,
    newTitle,
    color,
    newColor,
    setSelectedBoard,
    setIsOpen,
    setIsEditingTitle,
    setTitle,
    setColor,
    setNewTitle,
    setNewColor,
    createBoard,
    updateBoard,
    handleBoardSelect,
  } = useBoards();

  const { taskState, setTaskState, createTask } = useTasks();

  const [modalState, setModalState] = useState({
    showCreateBoardModal: false,
    showCreateTaskModal: false,
  });

  const closeModal = () => {
    setIsOpen(false);
    setIsEditingTitle(false);
  };

  const handleCreateProject = async () => {
    const success = await createBoard(title, color);
    if (success) {
      setModalState((prev) => ({ ...prev, showCreateBoardModal: false }));
    }
  };

  const handleCreateTask = async () => {
    const newTask = await createTask(selectedBoard.uuid);
    if (newTask) {
      setModalState((prev) => ({ ...prev, showCreateTaskModal: false }));
      setSelectedBoard((prev) => ({
        ...prev,
        tasks: [...(prev?.tasks || []), newTask],
      }));
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Мои задачи</h2>
      <div className="max-w-full mx-auto max-h-150 overflow-auto grid grid-cols-2 gap-4 flex-wrap">
        {boards.map((board) => (
          <button
            key={`${board.uuid}-${board.createdAt}`}
            onClick={() => handleBoardSelect(board)}
            className="relative overflow-auto !border-0 !border-b-8 max-h-[269px] bg-white !transition-all box-content duration-200 p-4 min-w-[300px] group hover:brightness-80"
            style={{
              borderBottomColor: `#${board.color}`,
            }}
          >
            <p>
              Дата создания:{' '}
              {new Date(board.createdAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="text-3xl min-h-50 whitespace-nowrap overflow-x-auto overflow-ellipsis w-full grid place-items-center">
              {board.title}
            </div>
            <p>
              Последнее изменение:{' '}
              {new Date(board.updatedAt).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </button>
        ))}

        <button
          key="create-board"
          className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl min-h-[269px] relative"
          onClick={() =>
            setModalState((prev) => ({ ...prev, showCreateBoardModal: true }))
          }
        >
          <FaPlus
            className="absolute top-[32%] left-[42.5%]"
            size={100}
            color="rgba(0,0,0,.3)"
          />
        </button>
      </div>

      <CreateBoardModal
        isOpen={modalState.showCreateBoardModal}
        onClose={() =>
          setModalState((prev) => ({ ...prev, showCreateBoardModal: false }))
        }
        title={title}
        setTitle={setTitle}
        color={color}
        setColor={setColor}
        handleCreateProject={handleCreateProject}
      />

      <CreateTaskModal
        isOpen={modalState.showCreateTaskModal}
        onClose={() =>
          setModalState((prev) => ({ ...prev, showCreateTaskModal: false }))
        }
        taskTitle={taskState.title}
        setTaskTitle={(title) => setTaskState((prev) => ({ ...prev, title }))}
        taskDescription={taskState.description}
        setTaskDescription={(description) =>
          setTaskState((prev) => ({ ...prev, description }))
        }
        taskDeadline={taskState.deadline}
        setTaskDeadline={(deadline) =>
          setTaskState((prev) => ({ ...prev, deadline }))
        }
        handleCreateTask={handleCreateTask}
      />

      <BoardDetailsModal
        isOpen={isOpen}
        onClose={closeModal}
        selectedBoard={selectedBoard}
        isEditingTitle={isEditingTitle}
        newTitle={newTitle}
        newColor={newColor}
        setNewTitle={setNewTitle}
        setNewColor={setNewColor}
        saveUpdateBoard={() => {
          console.log(newColor);
          updateBoard(selectedBoard?.uuid, newTitle, newColor);
        }}
        editBoard={() => {
          if (!selectedBoard?.uuid) {
            showToast('Доска ещё не загружена', 'error');
            return;
          }
          setIsEditingTitle(true);
        }}
        tasks={selectedBoard?.tasks}
        openCreateTaskModal={() =>
          setModalState((prev) => ({ ...prev, showCreateTaskModal: true }))
        }
        setIsEditingTitle={setIsEditingTitle}
      />
    </div>
  );
}
