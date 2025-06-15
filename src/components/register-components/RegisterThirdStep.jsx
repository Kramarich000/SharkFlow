import { motion } from 'framer-motion';
import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function RegisterThirdStep() {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, transform: 'translateX(50px)' }}
      animate={{ opacity: 1, transform: 'translateX(0)' }}
      exit={{ opacity: 0, transform: 'translateX(-50px)' }}
    >
      <motion.h2
        initial={{ opacity: 0, transform: 'translateX(50px)' }}
        animate={{ opacity: 1, transform: 'translateX(0)' }}
        exit={{ opacity: 0, transform: 'translateX(-50px)' }}
        className="text-7xl"
      >
        Шаг 3/3
      </motion.h2>
      <div className="bg-white p-12 mt-8 rounded-2xl flex flex-col items-center justify-center gap-4">
        <IoIosCheckmarkCircle size={100} />
        <p className="text-[20px]">Вы успешно зарегистрировались</p>
      </div>
    </motion.div>
  );
}
