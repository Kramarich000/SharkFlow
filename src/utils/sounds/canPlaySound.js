let userHasInteracted = false;

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointerdown',
    () => {
      userHasInteracted = true;
      console.log('User interacted — can play sound now');
    },
    { once: true },
  );
}

export const canPlaySound = () => userHasInteracted;
