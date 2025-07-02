import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

import { Button } from '@common/ui/utilities/Button';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const MotionButton = motion(Button);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => {
    const target = document.documentElement;
    const start = target.scrollTop;
    const duration = 800;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function scrollFrame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      target.scrollTop = start * (1 - eased);

      if (progress < 1) {
        requestAnimationFrame(scrollFrame);
      }
    }

    requestAnimationFrame(scrollFrame);
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionButton
          key="back-to-top"
          initial={{ opacity: 0, transform: 'translateY(20px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(20px)' }}
          transition={{ duration: 0.3 }}
          onClick={scrollUp}
          variant="tertiary"
          className="fixed flex items-center justify-center bottom-8 right-8 w-14 h-12 rounded-full shadow-lg z-50 !transition-colors"
          aria-label="Наверх"
        >
          <FaArrowUp />
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
