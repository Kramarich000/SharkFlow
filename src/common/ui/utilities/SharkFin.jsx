import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function SharkFin() {
  const size = 150;
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => -prev);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none"
      style={{ height: size }}
    >
      <motion.div
        key={direction}
        initial={{
          x: direction === 1 ? -size : '100vw',
          scaleX: direction,
        }}
        animate={{
          x: direction === 1 ? '100vw' : -size,
        }}
        transition={{
          duration: 10,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0"
        style={{ width: size, height: size }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 1024 1024"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(1024,1024) scale(-0.1,-0.1)"
            fill="var(--main-primary)"
            stroke="none"
          >
            <path d="M7340 8479 c-241 -31 -585 -125 -890 -244 -870 -338 -1758 -956 -2388 -1660 -576 -644 -1103 -1443 -1395 -2115 -135 -310 -189 -449 -288 -740 -147 -434 -308 -1059 -325 -1268 -8 -97 3 -132 50 -157 32 -17 141 -18 2317 -12 1256 4 2590 10 2964 13 l680 6 52 23 c28 13 59 35 69 50 25 38 30 124 10 163 -9 17 -82 99 -162 184 -258 269 -392 429 -534 633 -362 523 -576 1114 -629 1740 -16 180 -13 571 4 747 29 278 97 627 180 913 122 418 265 765 543 1315 112 222 123 249 119 287 -10 97 -70 133 -217 132 -52 -1 -124 -5 -160 -10z" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
