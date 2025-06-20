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

import { motion } from 'framer-motion';

import { statusCardStyles } from '@data/taskOptions';

import TaskStatusSidebar from '@components/task-components/details/TaskStatusSidebar';
import TaskDetailsHeader from '@components/task-components/details/TaskDetailsHeader';
import TaskDeadline from '@components/task-components/details/TaskDeadline';
import TaskDescription from '@components/task-components/details/TaskDescription';
import TaskTimestamps from '@components/task-components/details/TaskTimestamps';

export default function TaskDetailsModal() {
  const { isDetailsTaskModalOpen, setIsDetailsTaskModalOpen } = useModalsStore(
    useShallow((state) => ({
      setIsDetailsTaskModalOpen: state.setIsDetailsTaskModalOpen,
      isDetailsTaskModalOpen: state.isDetailsTaskModalOpen,
    })),
  );

  const selectedTask = useTaskStore((state) => state.selectedTask);

  if (!selectedTask) return null;

  const showDeadline =
    selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'CANCELLED';

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
              <DialogPanel
                // className={`px-3 sm:px-5 py-1 inline-flex items-center gap-2 rounded-2xl font-semibold text-sm sm:text-base shadow-lg bg-gradient-to-r from-white/80 to-white/40 border-2 border-white/60 ${
                //   statusStyles[selectedTask.status] || statusStyles.DEFAULT
                // }`}
                className={`w-full xl:w-[75%] h-full z-9998 flex flex-col !bg-white !border-4 !border-l-0 !border-b-0 transform overflow-hidden relative rounded-2xl rounded-b-none p-0 text-left align-middle shadow-2xl !transition-all ${
                  statusCardStyles[selectedTask.status] ||
                  statusCardStyles.DEFAULT
                }`}
              >
                <div className="flex h-full overflow-hidden min-h-0">
                  <TaskStatusSidebar task={selectedTask} />
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col p-4 md:p-10 gap-2 md:gap-8 md:min-h-0 min-w-0 w-full overflow-y-auto"
                  >
                    <TaskDetailsHeader task={selectedTask} />

                    {showDeadline ? (
                      <TaskDeadline task={selectedTask} />
                    ) : (
                      <div className="md:min-h-[78px]"></div>
                    )}

                    <TaskDescription task={selectedTask} />

                    <TaskTimestamps task={selectedTask} />

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
