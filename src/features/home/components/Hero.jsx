import Separator from '@common/ui/utilities/Separator';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <motion.h1
        className="mb-8 !text-3xl sm:!text-5xl"
        initial={{ transform: 'translateY(30px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className="text-[var(--main-primary)]">SharkFlow</span> — управляй
        задачами как акула
      </motion.h1>
      <div className="flex text-xl sm:text-3xl mb-8 justify-center flex-wrap gap-x-20">
        <motion.p
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Нацелься
        </motion.p>
        <motion.p
          initial={{ transform: 'translateY(150px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          Планируй
        </motion.p>
        <motion.p
          initial={{ transform: 'translateY(200px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
        >
          Действуй
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
          className="btn-primary !text-[var(--main-button-text)] !no-underline"
          to="/register"
        >
          Начать охоту
        </Link>
      </motion.div>
    </section>
  );
}
