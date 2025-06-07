import { useEffect, useState } from 'react';

export default function useMediaQuery(query) {
  const getInitialMatches = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getInitialMatches);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia(query);
    const handler = (e) => {
      setMatches('matches' in e ? e.matches : mq.matches);
    };

    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
    } else if (mq.addListener) {
      console.warn('Using legacy addListener for media query.');
      mq.addListener(handler);
    } else {
      console.warn(
        'Media query listener not supported; only initial match will be used.',
      );
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener('change', handler);
      } else if (mq.removeListener) {
        mq.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
