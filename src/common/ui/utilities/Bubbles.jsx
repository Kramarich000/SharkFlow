import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '@common/hooks';

export function Bubbles() {
  const { isMobile } = useResponsive();
  const bubbles = useMemo(() => {
    return Array.from({ length: isMobile ? 25 : 50 }, () => {
      const baseSize = 8 + Math.random() * 10;

      const scaleXValues = [
        1,
        1 + Math.random() * 0.2,
        0.9 + Math.random() * 0.2,
        1,
      ];
      const scaleYValues = [
        1,
        0.9 + Math.random() * 0.2,
        1 + Math.random() * 0.2,
        1,
      ];

      return {
        baseSize,
        width: baseSize,
        height: baseSize,
        scaleXValues,
        scaleYValues,
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
            opacity: [0, 1, 1],
            scaleX: bubble.scaleXValues,
            scaleY: bubble.scaleYValues,
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.width}px`,
            height: `${bubble.height}px`,
            borderRadius: '50% / 60%',
            backgroundColor: 'rgba(30,144,255,1)',
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            zIndex: -1,
          }}
        />
      ))}
    </>
  );
}
