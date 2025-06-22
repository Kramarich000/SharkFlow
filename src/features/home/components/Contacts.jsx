import { motion } from 'framer-motion';

export function Contacts() {
  return (
    <section className="py-12 mx-auto">
      <motion.h2
        className="text-3xl mb-8"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Поддержка и обратная связь
      </motion.h2>

      <motion.p
        className="mb-2"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.1, duration: 0.5 }}
        viewport={{ once: true }}
      >
        Мы открыты для связи и готовы помочь.
      </motion.p>

      <motion.p
        className="mb-4"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        Если у вас возникли вопросы, предложения или технические сложности —
        свяжитесь с нами удобным способом:
      </motion.p>

      <motion.ul
        className="space-y-3 underline sm:grid grid-cols-2"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <li>
          <a href="mailto:support@taskflow.app">E-mail: support@taskflow.app</a>
        </li>
        <li>
          <a
            href="https://t.me/taskflow_support"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram: @taskflow_support
          </a>
        </li>
        <li className="col-span-2">
          <a
            href="https://discord.gg/taskflow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord: discord.gg/taskflow
          </a>
        </li>
      </motion.ul>
      <p className="my-4 text-lg">
        Если же у вас специфичный вопрос — заполните форму:
      </p>
      <motion.form
        className="p-4 sm:p-8 bg-[#111111] rounded-2xl space-y-4"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            className="bg-[#1A1A1A] p-4 text-white outline-0 rounded-2xl"
            placeholder="Ваша почта"
            required
            aria-label="E-mail"
          />
          <input
            type="text"
            name="username"
            className="bg-[#1A1A1A] p-4 text-white outline-0 rounded-2xl"
            placeholder="Ваше имя"
            aria-label="Имя"
          />
        </div>
        <textarea
          name="question"
          className="bg-[#1A1A1A] p-4 text-white min-h-[200px] outline-0 rounded-2xl resize-none w-full"
          placeholder="Ваш вопрос"
          required
          aria-label="Вопрос"
        />
        <button title="Отправить" type="submit" className="primary-btn">
          Отправить
        </button>
      </motion.form>
    </section>
  );
}
