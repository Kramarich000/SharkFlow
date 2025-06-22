import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaPlayCircle,
} from 'react-icons/fa';
import { PiEmpty } from 'react-icons/pi';
import { MdAssignment } from 'react-icons/md';
import { statusStyles } from 'features/tasks/data/taskOptions';

const statusIconBg = {
  COMPLETED: 'from-green-400 to-green-600 shadow-green-400/40',
  CANCELLED: 'from-red-400 to-red-600 shadow-red-400/40',
  PENDING: 'from-yellow-300 to-yellow-500 shadow-yellow-300/40',
  IN_PROGRESS: 'from-blue-400 to-blue-600 shadow-blue-400/40',
  DEFAULT: 'from-gray-300 to-gray-500 shadow-gray-300/40',
};

export const TaskStatusSidebar = ({ task }) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateX(-200px)' }}
      animate={{ opacity: 1, transform: 'translateX(0px)' }}
      transition={{ duration: 1 }}
      className={`hidden lg:flex flex-col items-center justify-center min-w-[140px] ${
        statusStyles[task.status] || statusStyles.DEFAULT
      } border-0 relative`}
    >
      <div className="flex flex-col items-center gap-10 mt-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            boxShadow: '0 0 32px 0 rgba(0,0,0,0.12)',
          }}
          className={`bg-gradient-to-br ${
            statusIconBg[task.status] || statusIconBg.DEFAULT
          } rounded-full p-5 shadow-lg`}
        >
          {task.status === 'COMPLETED' && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <FaCheckCircle size={38} className="text-white drop-shadow-lg" />
            </motion.span>
          )}
          {task.status === 'CANCELLED' && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <FaTimesCircle size={38} className="text-white drop-shadow-lg" />
            </motion.span>
          )}
          {task.status === 'PENDING' && (
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
          {task.status === 'IN_PROGRESS' && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <FaPlayCircle size={38} className="text-white drop-shadow-lg" />
            </motion.span>
          )}
          {task.status === null && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <PiEmpty size={38} className="drop-shadow-lg" />
            </motion.span>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(-10px)' }}
          animate={{ opacity: 0.7, transform: 'translateY(0px)' }}
        >
          <MdAssignment size={28} color="black" />
        </motion.div>
      </div>
    </motion.div>
  );
};
