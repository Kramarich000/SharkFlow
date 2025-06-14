import { work } from '@data/work';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section className="py-12 mx-auto text-center">
      <h2 className="text-3xl mb-8">Как это работает</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {work.map((item) => (
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(50px)' }}
            whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ delay: 0.2 * item.id }}
            viewport={{ once: true }}
            key={item.id}
            className="space-y-2"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#111111] to-gray-400 text-white flex items-center justify-center text-3xl font-bold">
              {item.id}
            </div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
