import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="relative mx-auto py-12">
      <h2 className="text-3xl mb-8">Ключевые особенности</h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.li
          className="li-styles"
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl mb-4">Планирование задач</h3>
          <p>
            Создавайте и распределяйте задачи, устанавливайте приоритеты и сроки
            — всё в одном месте.
          </p>
        </motion.li>
        <motion.li
          className="li-styles"
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl mb-4">Командная работа</h3>
          <p>
            Общайтесь, назначайте роли и следите за вкладом каждого участника в
            проект.
          </p>
        </motion.li>
        <motion.li
          className="li-styles"
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl mb-4">Напоминания/дедлайны</h3>
          <p>
            Не упускайте важные сроки — автоматические уведомления всегда
            напомнят о приближении дедлайна.
          </p>
        </motion.li>
        <motion.li
          className="li-styles"
          initial={{ transform: 'translateY(100px)', opacity: 0 }}
          whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl mb-4">Прогресс и метрики</h3>
          <p>
            Отслеживайте выполнение задач, анализируйте эффективность и
            улучшайте рабочие процессы.
          </p>
        </motion.li>
      </ul>
    </section>
  );
}
