import { toast, Slide } from 'react-toastify';

let currentToastId = null;

export const showToast = (message, type = 'success') => {
  const options = {
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
  };

  if (currentToastId && toast.isActive(currentToastId)) {
    toast.update(currentToastId, {
      render: message,
      ...options,
    });
  } else {
    currentToastId = toast(message, options);
  }
};
