import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Wave from 'react-wavify';

import Separator from '@common/ui/utilities/Separator';
import { Bubbles, Waves, SharkFin } from '@common/ui';

export default function Hero() {
  const [showSecondFin, setShowSecondFin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondFin(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="flex min-h-screen flex-col items-center justify-center">
      <Bubbles />
      <SharkFin />
      {showSecondFin && <SharkFin />}

      <motion.h1
        className="mb-8 !text-3xl sm:!text-5xl "
        initial={{ transform: 'translateY(30px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <span className="text-[var(--main-primary)]">SharkFlow</span> — управляй
        задачами как акула
      </motion.h1>
      <div className="flex text-xl sm:text-3xl mb-8 justify-center flex-wrap gap-x-20">
        {['Нацелься', 'Планируй', 'Действуй'].map((text, idx) => (
          <motion.p
            key={text}
            initial={{ transform: 'translateY(100px)', opacity: 0 }}
            whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
            transition={{ duration: 0.7, delay: idx * 0.5 }}
            viewport={{ once: true }}
          >
            {text}
          </motion.p>
        ))}
      </div>
      <motion.div
        className="mt-6"
        initial={{ transform: 'translateY(100px)', opacity: 0 }}
        whileInView={{ transform: 'translateY(0px)', opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        viewport={{ once: true }}
      >
        <Link
          className="btn-primary !text-[var(--main-button-text)] !no-underline"
          to="/register"
        >
          Начать охоту
        </Link>
      </motion.div>

      <Waves />
    </section>
  );
}
