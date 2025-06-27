import { motion } from 'framer-motion';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { dateFormatter } from '@utils/date';

export const TaskTimestamps = ({ task }) => {
  return (
    <motion.div
      initial={{ transform: 'translateY(30px)', opacity: 0 }}
      animate={{ transform: 'translateY(0px)', opacity: 1 }}
      className="flex mt-auto flex-col flex-wrap sm:flex-row gap-2 md:mt-auto border-t md:pt-4 items-center justify-center w-full"
    >
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1 md:p-3 border border-gray-200 shadow">
        <FaRegCalendarAlt className="text-sm sm:text-lg opacity-70" />
        <p className="text-[13px] sm:text-[14px] text-gray-700">
          <b>Создана:</b> {dateFormatter(task.createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1 md:p-3 border border-gray-200 shadow">
        <FaRegCalendarAlt className="text-sm sm:text-lg opacity-70" />
        <p className="text-[13px] sm:text-[14px] text-gray-700">
          <b>Обновлена:</b> {dateFormatter(task.updatedAt)}
        </p>
      </div>
    </motion.div>
  );
};
