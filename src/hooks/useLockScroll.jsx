import { useEffect } from 'react';

export function useLockScroll(lock) {
  useEffect(() => {
    const html = document.documentElement;
    let scrollY = 0;

    if (lock) {
      scrollY = window.scrollY;
      html.style.position = 'fixed';
      html.style.top = `-${scrollY}px`;
      html.style.left = '0';
      html.style.right = '0';
    } else {
      const top = html.style.top;
      html.style.position = '';
      html.style.top = '';
      html.style.left = '';
      html.style.right = '';
      window.scrollTo(0, parseInt(top || '0') * -1);
    }
  }, [lock]);
}
