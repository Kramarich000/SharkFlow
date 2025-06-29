import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@common/hooks';

export function Bubbles() {
  const { isMobile } = useResponsive();

  const bubbles = useMemo(() => {
    return Array.from({ length: isMobile ? 25 : 50 }, () => {
      const baseSize = 8 + Math.random() * 10;
      return {
        width: baseSize * (0.8 + Math.random() * 0.4),
        height: baseSize * (0.8 + Math.random() * 0.4),
        blurAmount: 0.3 + Math.random() * 1.2,
        left: Math.random() * 99,
        rise: 300 + Math.random() * 300,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 4,
      };
    });
  }, []);

  return (
    <>
      {bubbles.map((bubble, i) => (
        <motion.span
          key={i}
          className="absolute z-50 bubble"
          initial={{ bottom: -100, opacity: 0, scale: 0.7 }}
          animate={{
            bottom: bubble.rise,
            opacity: [0, 0.9, 0],
            scale: [0.8, 1, 1.2],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.width}px`,
            height: `${bubble.height}px`,
            filter: `blur(${bubble.blurAmount}px)`,
            borderRadius: '50% / 60%',
            backgroundColor: 'rgba(30,144,255,0.3)',
            boxShadow: '0 0 5px 1px rgba(30,144,255,0.15)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}
