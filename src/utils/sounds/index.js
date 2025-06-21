import successSound from '@assets/sounds/success.ogg';
import errorSound from '@assets/sounds/error.ogg';
import { canPlaySound } from '@utils/sounds/canPlaySound';

const success = new Audio(successSound);
const error = new Audio(errorSound);

success.volume = 0.5;
error.volume = 0.5;

export const playSuccess = () => {
  if (!canPlaySound()) return;
  try {
    const audio = new Audio(successSound);
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.warn('Не удалось воспроизвести success звук:', e);
    });
  } catch (e) {
    console.warn('Ошибка создания success звука:', e);
  }
};

export const playError = () => {
  if (!canPlaySound()) return;
  try {
    const audio = new Audio(errorSound);
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch((e) => {
      console.warn('Не удалось воспроизвести error звук:', e);
    });
  } catch (e) {
    console.warn('Ошибка создания error звука:', e);
  }
};
