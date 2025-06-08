import { motion } from 'framer-motion';

export default function Security() {
  return (
    <section className="py-12 mx-auto">
      <h2 className="text-3xl mb-8">Безопасность</h2>
      <p className="mb-8">TaskFlow — это безопасный инструмент.</p>
      <div className="flex justify-between text-left">
        <ul>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Шифрование паролей
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Защищённое соединение
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.6 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Доступ к базе
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.9 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Конфиденциальность
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 1.2 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Резервное копирование
          </motion.li>
        </ul>
        <span className="border-1 border-[#111111]"></span>
        <ul>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Пароли пользователей никогда не хранятся в открытом виде —
            используется bcrypt с солью.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Все данные передаются по HTTPS с TLS-шифрованием, исключая
            возможность перехвата.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.6 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Доступ к данным имеют только авторизованные пользователи и сервисы с
            ограниченными правами.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.9 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            Мы не передаём, не продаём и не используем персональные данные в
            сторонних целях.
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-left"
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
          >
            База данных регулярно резервируется для защиты от сбоев и потери
            информации.
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
