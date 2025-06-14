import { toast, Slide } from 'react-toastify';

export const showToast = (message, type = 'success') => {
  toast(message, {
    type,
    autoClose: 3500,
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
