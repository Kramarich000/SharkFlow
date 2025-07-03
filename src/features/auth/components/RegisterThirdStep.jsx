import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function RegisterThirdStep({ onMount }) {
  useEffect(() => {
    onMount?.();
  }, [onMount]);
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
      <div className="p-12 border-2 border-[var(--main-primary)] mt-8 rounded-2xl flex flex-col items-center justify-center gap-4 bg-surface shadow-glow">
        <IoIosCheckmarkCircle
          size={100}
          className="text-[var(--main-primary)]"
        />
        <p className="text-[20px]">Вы успешно зарегистрировались</p>
      </div>
    </motion.div>
  );
}
