import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import useModalsStore from '@store/modalsStore';
import useTaskStore from '@store/taskStore';
import { useShallow } from 'zustand/shallow';
import {
  priorityOptions,
  statusOptions,
  priorityStyles,
  statusStyles,
} from '@data/taskOptions';
import { dateFormatter } from '@utils/date/dateFormatter';
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaFlag,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPlayCircle,
  FaExclamationTriangle,
  FaCalendarDay,
} from 'react-icons/fa';
import { MdAssignment } from 'react-icons/md';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { motion, AnimatePresence } from 'framer-motion';
import { PiEmpty } from 'react-icons/pi';

export default function TaskDetailsModal() {
  const { isDetailsTaskModalOpen, setIsDetailsTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsDetailsTaskModalOpen: state.setIsDetailsTaskModalOpen,
      isDetailsTaskModalOpen: state.isDetailsTaskModalOpen,
    })),
  );

  const selectedTask = useTaskStore((state) => state.selectedTask);

  //   const saveUpdateBoard = async () => {
  //     if (!selectedBoard || load) return;
  //     setLoad(true);

  //     const updatedFields = {};
  //     if (newTitle !== selectedBoard.title) {
  //       updatedFields.title = newTitle;
  //     }
  //     const cleanNewColor = newColor.startsWith('#')
  //       ? newColor.slice(1)
  //       : newColor;
  //     if (cleanNewColor !== selectedBoard.color) {
  //       updatedFields.color = cleanNewColor;
  //     }
  //     if (newIsPinned !== selectedBoard.isPinned) {
  //       updatedFields.isPinned = newIsPinned;
  //     }
  //     if (newIsFavorite !== selectedBoard.isFavorite) {
  //       updatedFields.isFavorite = newIsFavorite;
  //     }

  //     try {
  //       await updateBoard({ uuid: selectedBoard.uuid, ...updatedFields });
  //     } catch (err) {
  //       console.error('Ошибка при обновлении доски:', err);
  //     } finally {
  //       setLoad(false);
  //     }
  //   };

  //   const saveDeleteBoard = () => {
  //     setIsDeleteBoardModalOpen(true);
  //   };

  if (!selectedTask) return null;

  const showDeadline =
    selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'CANCELLED';

  const statusIconBg = {
    COMPLETED: 'from-green-400 to-green-600 shadow-green-400/40',
    CANCELLED: 'from-red-400 to-red-600 shadow-red-400/40',
    PENDING: 'from-yellow-300 to-yellow-500 shadow-yellow-300/40',
    IN_PROGRESS: 'from-blue-400 to-blue-600 shadow-blue-400/40',
    DEFAULT: 'from-gray-300 to-gray-500 shadow-gray-300/40',
  };

  return (
    <Transition appear show={isDetailsTaskModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsDetailsTaskModalOpen(false)}
      >
        <div className="fixed inset-0">
          <div className="flex h-full items-end justify-center p-4 pb-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full"
              leave="ease-in duration-200"
              leaveTo="translate-y-full"
            >
              <DialogPanel className="w-full md:w-[75%] h-full border-4 border-b-0 z-9998 flex flex-col bg-white transform overflow-hidden relative rounded-2xl rounded-b-none p-0 text-left align-middle shadow-2xl !transition-all">
                <div className="flex h-full overflow-hidden min-h-0">
                  <motion.div
                    initial={{ opacity: 0, transform: 'translateX(-200px)' }}
                    animate={{ opacity: 1, transform: 'translateX(0px)' }}
                    transition={{ duration: 1 }}
                    className={`hidden lg:flex flex-col items-center justify-center min-w-[140px] ${statusStyles[selectedTask.status] || statusStyles.DEFAULT} border-0 relative`}
                  >
                    <div className="flex flex-col items-center gap-10 mt-10">
                      <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          boxShadow: '0 0 32px 0 rgba(0,0,0,0.12)',
                        }}
                        className={`bg-gradient-to-br ${statusIconBg[selectedTask.status] || statusIconBg.DEFAULT} rounded-full p-5 shadow-lg`}
                      >
                        {selectedTask.status === 'COMPLETED' && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <FaCheckCircle
                              size={38}
                              className="text-white drop-shadow-lg"
                            />
                          </motion.span>
                        )}
                        {selectedTask.status === 'CANCELLED' && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <FaTimesCircle
                              size={38}
                              className="text-white drop-shadow-lg"
                            />
                          </motion.span>
                        )}
                        {selectedTask.status === 'PENDING' && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <FaHourglassHalf
                              size={38}
                              className="text-white drop-shadow-lg"
                            />
                          </motion.span>
                        )}
                        {selectedTask.status === 'IN_PROGRESS' && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <FaPlayCircle
                              size={38}
                              className="text-white drop-shadow-lg"
                            />
                          </motion.span>
                        )}
                        {selectedTask.status === null && (
                          <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <PiEmpty size={38} className="drop-shadow-lg" />
                          </motion.span>
                        )}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.7, y: 0 }}
                      >
                        <MdAssignment size={28} color="black" />
                      </motion.div>
                    </div>
                  </motion.div>{' '}
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col p-4 md:p-10 gap-2 md:gap-8 md:min-h-0 min-w-0 w-full overflow-y-auto"
                  >
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="grid grid-cols-1 gap-2 border-b pb-4 md:min-h-[129px] lg:grid-cols-2  sm:items-center"
                    >
                      <div className="min-w-0">
                        <h2 className="text-2xl sm:text-4xl overflow-y-auto xl:overflow-y-hidden max-h-[80px] font-extrabold break-words w-full text-left mb-1 tracking-tight">
                          {selectedTask.title}
                        </h2>
                        <p className="text-gray-500 text-md sm:text-lg font-medium">
                          Сведения о задаче
                        </p>
                      </div>
                      <div className="flex h-full sm:gap-3 mt-0 justify-end items-end">
                        {' '}
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`px-3 sm:px-5 py-1 inline-flex items-center gap-2 rounded-2xl font-semibold text-sm sm:text-base shadow-lg bg-gradient-to-r from-white/80 to-white/40 border-2 border-white/60 ${statusStyles[selectedTask.status] || statusStyles.DEFAULT}`}
                          title="Статус"
                        >
                          {selectedTask.status === 'COMPLETED' && (
                            <FaCheckCircle
                              className="inline-block text-green-500 opacity-70"
                              size={18}
                            />
                          )}
                          {selectedTask.status === 'CANCELLED' && (
                            <FaTimesCircle
                              className="inline-block text-red-500 opacity-70"
                              size={18}
                            />
                          )}
                          {selectedTask.status === 'PENDING' && (
                            <FaHourglassHalf
                              className="inline-block text-black opacity-70"
                              size={18}
                            />
                          )}
                          {selectedTask.status === 'IN_PROGRESS' && (
                            <FaPlayCircle
                              className="inline-block text-blue-500 opacity-70"
                              size={18}
                            />
                          )}
                          {statusOptions.find(
                            (opt) => opt.value === selectedTask.status,
                          )?.label || (
                            <p className="text-gray-700">— Не задано —</p>
                          )}
                        </motion.span>
                        <p
                          className={`px-3 sm:px-5 py-1 inline-flex items-center gap-2 rounded-2xl font-semibold text-sm sm:text-base !shadow-none  ${priorityStyles[selectedTask.priority] || priorityStyles.DEFAULT}`}
                          title="Приоритет"
                        >
                          <FaFlag
                            className="inline-block opacity-70"
                            size={16}
                          />
                          {priorityOptions.find(
                            (opt) => opt.value === selectedTask.priority,
                          )?.label || (
                            <p className="text-gray-700">— Не задано —</p>
                          )}
                        </p>
                      </div>
                    </motion.div>
                    {showDeadline ? (
                      <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex flex-col gap-2"
                      >
                        <b className="text-lg">Дедлайн:</b>
                        {(() => {
                          if (!selectedTask.dueDate) {
                            return (
                              <p className="text-gray-700">— Не задан —</p>
                            );
                          }
                          const now = new Date();
                          const due = new Date(selectedTask.dueDate);
                          const isOverdue = now.getTime() > due.getTime();
                          const diffMs = due - now;
                          const diffDays = diffMs / (1000 * 60 * 60 * 24);
                          let badgeClass =
                            'bg-gradient-to-r from-yellow-100 to-yellow-300 border border-yellow-200 text-gray-700';
                          let icon = (
                            <FaRegClock className="text-yellow-500 text-lg" />
                          );
                          let text = dateFormatter(selectedTask.dueDate);
                          if (isOverdue) {
                            badgeClass =
                              'bg-gradient-to-r from-red-200 to-red-400 border border-red-300 text-red-700';
                            icon = (
                              <FaExclamationTriangle className="text-red-700 text-lg" />
                            );
                            text =
                              'Просрочено! ' +
                              dateFormatter(selectedTask.dueDate);
                          } else if (diffDays < 2) {
                            badgeClass =
                              'bg-gradient-to-r from-yellow-300 to-yellow-500 border border-yellow-400 text-yellow-900';
                            icon = (
                              <FaExclamationTriangle className="text-yellow-700 text-lg" />
                            );
                            text =
                              'Скоро! ' + dateFormatter(selectedTask.dueDate);
                          }
                          return (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className={`group flex items-center px-1 py-1 gap-1 md:gap-3 text-center text-sm sm:text-base rounded-2xl md:px-5 md:py-2 w-fit shadow-lg font-semibold ${badgeClass}`}
                            >
                              {icon}
                              {text}
                            </motion.span>
                          );
                        })()}
                      </motion.div>
                    ) : (
                      <div className="md:min-h-[78px]"></div>
                    )}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex flex-col gap-2 min-w-0 w-full"
                    >
                      <b className="text-lg">Описание:</b>
                      <div className="md:min-h-[300px] bg-gray-50 rounded-2xl p-2 md:p-5 max-h-[300px] md:max-h-[300px] overflow-y-auto border border-gray-200 text-base max-w-full break-words">
                        {selectedTask.description || (
                          <p className="text-gray-700">— Нет описания —</p>
                        )}
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex mt-auto flex-col flex-wrap sm:flex-row gap-1 md:mt-auto border-t md:pt-4 items-center justify-center w-full"
                    >
                      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1 md:p-3 border border-gray-200 shadow">
                        <FaRegCalendarAlt className="text-sm sm:text-lg opacity-70" />
                        <p className="text-[13px] sm:text-[14px] text-gray-700">
                          <b>Создана:</b>{' '}
                          {dateFormatter(selectedTask.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1 md:p-3 border border-gray-200 shadow">
                        <FaRegCalendarAlt className="text-sm sm:text-lg opacity-70" />
                        <p className="text-[13px] sm:text-[14px] text-gray-700">
                          <b>Обновлена:</b>{' '}
                          {dateFormatter(selectedTask.updatedAt)}
                        </p>
                      </div>
                    </motion.div>
                    <motion.button
                      className="primary-btn !p-1 sm:!p-4"
                      onClick={() => setIsDetailsTaskModalOpen(false)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      Закрыть
                    </motion.button>
                  </motion.div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
