let userHasInteracted = false;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointerdown',
    () => {
      userHasInteracted = true;
    },
    { once: true },
  );
}

export const canPlaySound = () => userHasInteracted;
