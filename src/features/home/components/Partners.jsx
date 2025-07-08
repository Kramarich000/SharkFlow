import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { partners } from '@features/home';
import { Button } from '@common/ui/utilities/Button';

export default function Partners() {
  return (
    <section className="py-16 mx-auto">
      <h2 className="text-3xl mb-8">Наши партнёры</h2>
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 justify-items-center">
        {partners.map((item) => (
          <motion.a
            initial={{
              x: item.id % 2 === 0 ? 100 : -100,
              opacity: 0,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: item.id * 0.12 }}
            viewport={{ once: true }}
            className="max-w-full w-30 hover:scale-110 duration-400 !transition-transform"
            key={item.id}
            href={item.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
      <motion.div
        className="mt-6"
        initial={{ transform: 'translateY(100px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        viewport={{ once: true }}
      >
        <Button className="text-xl !w-fit mx-auto" variant="primary" asChild>
          <Link to="/register">Начать охоту</Link>
        </Button>
      </motion.div>
    </section>
  );
}
