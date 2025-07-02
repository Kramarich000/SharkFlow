import { useEffect, useState } from 'react';

export function useDelayedUnmount(isOpen, delay = 300) {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    let timeoutId;
    if (isOpen) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => setShouldRender(false), delay);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen, delay]);

  return shouldRender;
} 