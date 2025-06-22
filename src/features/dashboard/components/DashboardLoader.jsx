import { motion } from 'framer-motion';
import { AiOutlineSync } from 'react-icons/ai';

export const DashboardLoader = () => {
  return (
    <div className="h-full flex-col flex items-center justify-center">
      <motion.div
        key="loader"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: 'linear',
        }}
        className="text-7xl flex gap-8 text-center"
      >
        <AiOutlineSync />
      </motion.div>
      <p className="text-4xl mt-4 animate-pulse">Загрузка ваших досок</p>
    </div>
  );
};
