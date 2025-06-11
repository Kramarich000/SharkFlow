import { useState, useEffect, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import createBoard from '@api/http/createBoard';
import { useAuthStore } from '/src/store/authStore.js';
import { FaPlus, FaPencilAlt } from 'react-icons/fa';

import api from '@api/http/http';
import { showToast } from '@utils/toast';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';

export default function DashboardPage() {
  const token = useAuthStore((state) => state.accessToken);
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const editBoard = () => {
    setNewTitle(selectedBoard?.title || '');
    setIsEditingTitle(true);
  };

  const saveTitle = async () => {
    if (!newTitle) {
      showToast('Название доски не может быть пустым!', 'error');
      return false;
    }
    try {
      const response = await api.put(
        `/todo/editBoard/${selectedBoard.uuid}`,
        {
          title: newTitle,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        showToast('Название доски успешно обновлено', 'success');
        setIsOpen(false);
        setBoards((prevBoards) =>
          prevBoards.map((board) =>
            board.uuid === selectedBoard.uuid
              ? { ...board, title: newTitle }
              : board,
          ),
        );
        setSelectedBoard((prev) =>
          prev ? { ...prev, title: newTitle } : prev,
        );
      }
    } catch (err) {
      showToast('Ошибка при обновлении названия доски', 'error');
    }

    setIsEditingTitle(false);
  };

  const openModal = (board) => {
    setSelectedBoard(board);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditingTitle(false);
  };

  const openCreateBoardModal = () => {
    setShowCreateBoardModal(true);
  };

  const openCreateTaskModal = () => {
    setShowCreateTaskModal(true);
  };

  const closeCreateTaskModal = () => {
    setShowCreateTaskModal(false);
  };

  const closeCreateBoardModal = () => {
    setShowCreateBoardModal(false);
  };

  useEffect(() => {
    if (!token) return;

    async function fetchBoards() {
      try {
        const response = await api.get('/todo/boards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setBoards(response.data.boards);
        }
      } catch (error) {
        console.error('Ошибка при загрузке досок', error);
      }
    }

    fetchBoards();
  }, [token]);

  const handleCreateProject = async () => {
    if (!title.trim()) {
      showToast('Название не может быть пустым', 'error');
      return;
    }
    if (!token) {
      showToast('Ошибка: отсутствует токен', 'error');
      return;
    }

    try {
      const data = await createBoard(token, title);
      if (data && data.title) {
        setBoards((prev) => [...prev, data]);

        setTitle('');
        closeCreateBoardModal();
        showToast('Доска успешно создана', 'success');
      } else {
        showToast('Ошибка при создании доски', 'error');
      }
    } catch (err) {
      console.error('Ошибка при создании доски:', err);
      showToast('Серверная ошибка', 'error');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Мои задачи</h2>
      <div className="max-w-full mx-auto max-h-150 overflow-auto grid grid-cols-2 gap-4 flex-wrap">
        {boards.map((board) => (
          <button
            key={`${board.uuid}-${board.createdAt}`}
            onClick={() => openModal(board)}
            className="hover:bg-[#999999] overflow-auto max-h-[269px] !transition-colors bg-white p-4 relative rounded-3xl min-w-[300px]"
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
          onClick={openCreateBoardModal}
        >
          <FaPlus
            className="absolute top-[32%] left-[42.5%]"
            size={100}
            color="rgba(0,0,0,.3)"
          />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <div className="fixed inset-0 bg-transparent bg-opacity-25" />

          <div className="fixed inset-0">
            <div className="flex min-h-full items-end justify-center p-4 pb-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-1"
                leave="ease-in duration-200"
                leaveFrom="translate-y-1"
                leaveTo="translate-y-full"
                afterLeave={() => setSelectedBoard(null)}
              >
                <DialogPanel className="w-full border-2 max-w-6xl h-[80vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                  <div className="relative flex items-center justify-center px-[40px]">
                    {isEditingTitle ? (
                      <>
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveTitle();
                            if (e.key === 'Escape') setIsEditingTitle(false);
                          }}
                          autoFocus
                          className="text-center text-4xl border-b-2 border-[#111111] focus:outline-none w-full"
                        />
                        <button
                          className="!p-2"
                          onClick={saveTitle}
                          title="Сохранить"
                        >
                          <FaCheck size={26} />
                        </button>
                        <button
                          className="!p-2"
                          onClick={() => setIsEditingTitle(false)}
                          title="Отмена"
                        >
                          <IoClose size={32} />
                        </button>
                      </>
                    ) : (
                      <>
                        <DialogTitle
                          onClick={editBoard}
                          className="text-center text-4xl whitespace-nowrap overflow-x-auto overflow-y-hidden border-b-2 border-transparent"
                        >
                          {selectedBoard?.title}
                        </DialogTitle>{' '}
                        <button onClick={editBoard} title="Редактировать">
                          <FaPencilAlt size={25} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mt-4 pb-20 text-center grid justify-items-center max-h-full grid-cols-2 gap-[40px] overflow-y-auto">
                    {selectedBoard?.tasks?.length ? (
                      selectedBoard.tasks.map((task) => (
                        <div
                          key={task.uuid}
                          className="border-2 relative max-h-[300px] w-full rounded-3xl py-2 flex flex-col gap-2"
                        >
                          <p className="font-semibold">{task.title}</p>

                          <div className="text-sm text-gray-900 list-decimal list-inside">
                            {Array.isArray(task.description) ? (
                              task.description.map((line, index) => (
                                <p key={index}>{line}</p>
                              ))
                            ) : typeof task.description === 'string' &&
                              task.description.trim() ? (
                              task.description
                                .split('\n')
                                .map((line, index) => <p key={index}>{line}</p>)
                            ) : (
                              <p>Без описания</p>
                            )}
                          </div>

                          <p className="text-sm">
                            <span
                              className={`${
                                task.completed
                                  ? 'text-green-600 bg-green-200'
                                  : 'text-red-600 bg-red-200'
                              } absolute top-2 right-4 rounded-2xl p-1.5
                            `}
                            >
                              {task.completed ? 'Выполнено' : 'В процессе'}
                            </span>
                          </p>
                        </div>
                      ))
                    ) : (
                      <>
                        {' '}
                        <p className="text-gray-700 text-center col-span-2">
                          Задачи отсутствуют
                        </p>
                      </>
                    )}{' '}
                    <button
                      key="create-task"
                      className="bg-white hover:bg-[#e6e5e5] !transition-colors rounded-3xl relative col-span-2"
                      onClick={openCreateTaskModal}
                    >
                      <FaPlus className="" size={30} color="rgba(0,0,0,.3)" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                    onClick={closeModal}
                  >
                    <IoClose size={40} />
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={showCreateBoardModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeCreateBoardModal}
        >
          <div className="fixed inset-0 bg-transparent bg-opacity-25" />
          <div className="fixed inset-0">
            <div className="flex min-h-full items-end justify-center p-4 pb-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-1"
                leave="ease-in duration-200"
                leaveFrom="translate-y-1"
                leaveTo="translate-y-full"
                afterLeave={() => setSelectedBoard(null)}
              >
                <DialogPanel className="w-full border-2 max-w-6xl h-[20vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                  <div className="flex justify-center items-center">
                    <input
                      autoFocus
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateProject();
                      }}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите название доски"
                    />
                    <button
                      className="!p-2 !pr-20"
                      onClick={handleCreateProject}
                      title="Сохранить"
                    >
                      <FaCheck size={26} />
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                      onClick={closeCreateBoardModal}
                    >
                      <IoClose size={40} />
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={showCreateTaskModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeCreateTaskModal}
        >
          <div className="fixed inset-0 bg-transparent bg-opacity-25" />
          <div className="fixed inset-0">
            <div className="flex min-h-full items-end justify-center p-4 pb-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="translate-y-full"
                enterTo="translate-y-1"
                leave="ease-in duration-200"
                leaveFrom="translate-y-1"
                leaveTo="translate-y-full"
                afterLeave={() => setSelectedBoard(null)}
              >
                <DialogPanel className="w-full border-2 max-w-6xl h-[20vh] transform overflow-hidden relative rounded-2xl rounded-b-none bg-white p-6 text-left align-middle shadow-xl !transition-all">
                  <div className="flex justify-center items-center">
                    <input
                      autoFocus
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите название задачи"
                    />
                    <input
                      autoFocus
                      value={taskTitle}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите описание задачи"
                    />
                    <input
                      autoFocus
                      value={taskDeadline}
                      onChange={(e) => setTaskDeadline(e.target.value)}
                      className="focus-within:outline-0 w-full p-1 pr-4 focus:outline-0 text-2xl"
                      placeholder="Введите дедлайн задачи"
                    />
                    <button
                      className="!p-2 !pr-20"
                      onClick={handleCreateTask}
                      title="Сохранить"
                    >
                      <FaCheck size={26} />
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex !transition-transform absolute top-0 right-0 justify-center px-4 py-2 text-sm"
                      onClick={closeCreateTaskModal}
                    >
                      <IoClose size={40} />
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
