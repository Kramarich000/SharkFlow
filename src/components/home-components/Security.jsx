import { motion } from 'framer-motion';

export default function Security() {
  return (
    <section className="py-12 mx-auto">
      <h2 className="text-3xl mb-8">Безопасность</h2>
      <p className="mb-8">TaskFlow — это безопасный инструмент.</p>
      <div className="hidden xl:flex justify-between text-left">
        <ul>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>Шифрование паролей</p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>Защищённое соединение</p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.6 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>Доступ к базе</p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.9 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>Конфиденциальность</p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 1.2 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>Резервное копирование</p>
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
            <p>
              Пароли пользователей никогда не хранятся в открытом виде —
              используется bcrypt с солью.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>
              Все данные передаются по HTTPS с TLS-шифрованием, исключая
              возможность перехвата.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.6 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>
              Доступ к данным имеют только авторизованные пользователи и сервисы
              с ограниченными правами.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.9 }}
            className="rounded-4xl p-4 text-left"
            viewport={{ once: true }}
          >
            <p>
              Мы не передаём, не продаём и не используем персональные данные в
              сторонних целях.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-left"
            transition={{ delay: 1.2 }}
            viewport={{ once: true }}
          >
            <p>
              База данных регулярно резервируется для защиты от сбоев и потери
              информации.
            </p>
          </motion.li>
        </ul>
      </div>

      <div className="flex xl:hidden justify-between flex-col">
        <ul>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            className="rounded-4xl p-4 text-center"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Шифрование паролей</h3>
            <p>
              Пароли пользователей никогда не хранятся в открытом виде —
              используется bcrypt с солью.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.3 }}
            className="rounded-4xl p-4 text-center"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Защищённое соединение</h3>
            <p>
              Все данные передаются по HTTPS с TLS-шифрованием, исключая
              возможность перехвата.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.6 }}
            className="rounded-4xl p-4 text-center"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Доступ к базе</h3>{' '}
            <p>
              Доступ к данным имеют только авторизованные пользователи и сервисы
              с ограниченными правами.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 0.9 }}
            className="rounded-4xl p-4 text-center"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Конфиденциальность</h3>{' '}
            <p>
              Мы не передаём, не продаём и не используем персональные данные в
              сторонних целях.
            </p>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, transform: 'translateX(-50px)' }}
            whileInView={{ opacity: 1, transform: 'translateX(0)' }}
            transition={{ delay: 1.2 }}
            className="rounded-4xl p-4 text-center"
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">Резервное копирование</h3>
            <p>
              База данных регулярно резервируется для защиты от сбоев и потери
              информации.
            </p>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
