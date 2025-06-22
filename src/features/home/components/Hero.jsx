import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <motion.h1
        className="mb-8 !text-3xl sm:!text-5xl"
        initial={{ transform: 'translateY(30px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        TaskFlow — управление задачами без хаоса.
      </motion.h1>
      <div className="flex text-xl sm:text-3xl mb-8 justify-center flex-wrap">
        <motion.p
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Контролируйте.
        </motion.p>
        <motion.p
          initial={{ transform: 'translateY(150px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Планируйте.
        </motion.p>
        <motion.p
          initial={{ transform: 'translateY(200px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          Достигайте.
        </motion.p>
      </div>
      <motion.div
        className="mt-6"
        initial={{ transform: 'translateY(100px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        viewport={{ once: true }}
      >
        <Link
          className="bg-[#111111] text-[16px] sm:text-[20px] rounded-4xl p-4 text-xl text-white hover:!text-white hover:bg-gray-600 !transition-colors"
          to="/register"
        >
          Попробовать сейчас
        </Link>
      </motion.div>
    </section>
  );
}
