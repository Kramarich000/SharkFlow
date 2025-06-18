import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(20px)' }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          className="fixed flex items-center justify-center bottom-8 right-8 w-14 h-12 rounded-full bg-[#1A1A1A] hover:bg-gray-600 text-white shadow-lg z-50 !transition-colors"
          aria-label="Наверх"
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
