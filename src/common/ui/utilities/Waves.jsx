import Wave from 'react-wavify';
import { useMemo } from 'react';
import { useResponsive } from '@common/hooks';

export function Waves() {
  const { isMobile } = useResponsive();
  const waveOptions = useMemo(
    () => ({
      height: isMobile ? 50 : 30,
      amplitude: isMobile ? 20 : 50,
      speed: 0.2,
      points: isMobile ? 2 : 5,
    }),
    [],
  );

  const waveStyleBase = useMemo(
    () => ({
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '100%',
      willChange: 'transform',
    }),
    [],
  );

  return (
    <div className="absolute w-full h-40 left-0 bottom-0 -z-1">
      <Wave
        style={{ ...waveStyleBase, bottom: 0 }}
        fill="url(#waveGradient)"
        paused={false}
        options={waveOptions}
      />

      <Wave
        style={{ ...waveStyleBase, bottom: '-160px', transform: 'scaleY(-1)' }}
        fill="url(#waveGradient)"
        paused={false}
        options={waveOptions}
      />

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="70%" stopColor="var(--main-primary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
