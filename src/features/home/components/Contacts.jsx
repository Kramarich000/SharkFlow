import { motion } from 'framer-motion';

export default function Contacts() {
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
        className="space-y-3 sm:grid grid-cols-2"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <li>
          <a href="mailto:support@sharkflow.app">
            E-mail: support@sharkflow.app
          </a>
        </li>
        <li>
          <a
            href="https://t.me/sharkflow_support"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram: @sharkflow_support
          </a>
        </li>
        <li className="col-span-2">
          <a
            href="https://discord.gg/sharkflow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord: discord.gg/sharkflow
          </a>
        </li>
      </motion.ul>
      <p className="my-4 text-lg">
        Если же у вас специфичный вопрос — заполните форму:
      </p>
      <motion.form
        className="p-4 sm:p-8 rounded-2xl space-y-4 bg-[var(--main-form-bg)]"
        initial={{ opacity: 0, transform: 'translateY(30px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            className="p-4 outline-0 rounded-2xl border-1 focus:border-[var(--main-input-border-focus)] !transition-colors"
            placeholder="Ваша почта"
            required
            aria-label="E-mail"
          />
          <input
            type="text"
            name="username"
            className="p-4 outline-0 rounded-2xl border-1 focus:border-[var(--main-input-border-focus)] !transition-colors"
            placeholder="Ваше имя"
            aria-label="Имя"
          />
        </div>
        <textarea
          name="question"
          className="p-4 min-h-[200px] outline-0 rounded-2xl resize-none w-full border-1 focus:!border-[var(--main-input-border-focus)] !transition-colors"
          placeholder="Ваш вопрос"
          required
          aria-label="Вопрос"
        />
        <button title="Отправить" type="submit" className="btn-primary">
          Отправить
        </button>
      </motion.form>
    </section>
  );
}
