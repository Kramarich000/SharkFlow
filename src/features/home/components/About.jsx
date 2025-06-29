import { motion } from 'framer-motion';
import { team } from '@features/home';

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center py-12 mx-auto">
      <h2 className="text-2xl sm:text-3xl mb-8">О нас</h2>
      <div className="w-full">
        <div className="grid sm:grid-cols-2 gap-4">
          {team.map((item) => (
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(75px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.5, delay: item.id * 0.2 }}
              viewport={{ once: true }}
              className="rounded-4xl border-2 border-[var(--main-primary)]"
              key={item.id}
            >
              <div className="p-4">
                <div className="relative w-full h-full text-center">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    className="rounded-full mx-auto mb-2.5 object-cover transition-opacity duration-500"
                  />
                </div>
                <h4 className="font-semibold mt-2  text-[var(--main-text)]">
                  {item.name}
                </h4>
                <p className="mb-2">Должность: {item.post}</p>
                <p className="text-[var(--main-text)]">
                  Описание: {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
