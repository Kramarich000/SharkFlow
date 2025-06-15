import { toast, Slide } from 'react-toastify';

export const showToast = (message, type = 'success', autoClose = 3500) => {
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
