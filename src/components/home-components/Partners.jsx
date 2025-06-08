import { partners } from '../../data/logos';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function Partners() {
  return (
    <section className="py-16 mx-auto">
      <h2 className="text-3xl mb-8">Наши партнёры</h2>
      <div className="grid sm:grid-cols-2 gap-10 justify-items-center">
        {partners.map((item) => (
          <motion.a
            initial={{
              transform: `translateX(${
                item.id % 2 === 0 ? '100px' : '-100px'
              })`,
              opacity: 0,
            }}
            whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
            transition={{ delay: item.id * 0.12 }}
            viewport={{ once: true }}
            className="max-w-full w-30 hover:scale-110 duration-400 !transition-transform"
            key={item.id}
            href={item.link}
            rel="noopener norefferer"
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
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Link
          className="bg-[#111111] rounded-4xl p-4 text-xl text-white hover:!text-white hover:bg-gray-600 !transition-colors"
          to="/register"
        >
          Попробовать сейчас
        </Link>
      </motion.div>
    </section>
  );
}
