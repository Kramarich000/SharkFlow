import React from 'react';
import { motion } from 'framer-motion';
import { security } from 'features/home/data/security';

export function Security() {
  return (
    <section className="py-12 mx-auto">
      <h2 className="text-3xl mb-8">Безопасность</h2>
      <p className="mb-8">TaskFlow — это безопасный инструмент.</p>

      <div className="hidden xl:flex justify-between text-left">
        <ul>
          {security.map((feature, index) => (
            <motion.li
              key={feature.title}
              className="rounded-4xl p-4 text-left"
              initial={{ opacity: 0, transform: 'translateY(-50px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <p>{feature.title}</p>
            </motion.li>
          ))}
        </ul>

        <span className="border-1 border-[#111111]"></span>

        <ul>
          {security.map((feature, index) => (
            <motion.li
              key={feature.title + '-desc'}
              className="rounded-4xl p-4 text-left"
              initial={{ opacity: 0, transform: 'translateY(50px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <p>{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="flex xl:hidden justify-between flex-col">
        <ul>
          {security.map((feature, index) => (
            <motion.li
              key={feature.title + '-mobile'}
              className="rounded-4xl p-4 text-center"
              initial={{ opacity: 0, transform: 'translateX(-50px)' }}
              whileInView={{ opacity: 1, transform: 'translateX(0px)' }}
              transition={{ delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
