import { motion } from 'framer-motion';

const TaskDescription = ({ task }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col gap-2 min-w-0 w-full"
    >
      <b className="text-lg">Описание:</b>
      <div className="md:min-h-[300px] bg-gray-50 rounded-2xl p-2 md:p-5 max-h-[300px] md:max-h-[300px] overflow-y-auto border border-gray-200 text-base max-w-full break-words">
        {task.description || (
          <p className="text-gray-700">— Нет описания —</p>
        )}
      </div>
    </motion.div>
  );
};

export default TaskDescription; 