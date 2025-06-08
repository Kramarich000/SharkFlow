import { motion } from 'framer-motion';
import { advantages } from '../../data/advantages';

export default function Advantages() {
  return (
    <section className="py-12 mx-auto">
      <h2 className="text-3xl mb-8">Преимущества</h2>
      <p className="mb-8">
        TaskFlow — надёжный инструмент для управления задачами
      </p>
      <ul className="space-y-6">
        {advantages.map((adv) => (
          <motion.li
            key={adv.id}
            className={`rounded-4xl p-4 ${
              adv.id % 2 === 0 ? 'text-right' : 'text-left'
            }`}
            initial={{ transform: 'translateY(100px)', opacity: 0 }}
            whileInView={{ transform: 'translateY(0)', opacity: 1 }}
            transition={{ delay: 0.25 * adv.id, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className={`flex items-center ${
                adv.id % 2 === 0 ? 'justify-end' : 'justify-start'
              } gap-3 mb-2`}
            >
              {adv.icon}
              <h3 className="text-xl font-semibold">{adv.title}</h3>
            </div>
            <p>{adv.description}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
