import successSound from '@assets/sounds/success.ogg';
import errorSound from '@assets/sounds/error.ogg';
import { canPlaySound } from '@utils/sounds/canPlaySound';

const success = new Audio(successSound);
const error = new Audio(errorSound);

success.volume = 0.5;
error.volume = 0.5;

export const playSuccess = () => {
  if (!canPlaySound() || !success.paused) return;
  success.currentTime = 0;
  success.play().catch((e) => {
    console.warn('Не удалось воспроизвести success звук:', e);
  });
};

export const playError = () => {
  if (!canPlaySound() || !error.paused) return;
  error.currentTime = 0;
  error.play().catch((e) => {
    console.warn('Не удалось воспроизвести error звук:', e);
  });
};
