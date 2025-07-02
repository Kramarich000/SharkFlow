import { toast, Slide } from 'react-toastify';
import { canPlaySound, playError, playSuccess } from '@utils/sounds';

export const showToast = (message, type = 'success', autoClose = 3500) => {
  if (type === 'success') {
    playSuccess();
  } else {
    playError();
  }

  toast(message, {
    type,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    closeButton: false,
    pauseOnFocusLoss: false,
    transition: Slide,
  });
};
