import { showToast } from '@utils/toast';

export async function apiResponsesHandler(requestFn, options = {}) {
  const {
    successMessage,
    errorMessage,
    silent = false,
    onSuccess,
    onError,
  } = options;
  try {
    const response = await requestFn();

    if (response.status === 200 || response.status === 201) {
      const message = successMessage || response.data?.message;
      if (message && !silent) {
        showToast(message, 'success');
      }
      if (onSuccess) {
        const maybe = onSuccess(response.data);
        if (maybe !== undefined) return maybe;
        return response.data;
      }
      return response.data;
    }

    const fallbackError = errorMessage || 'Неизвестная ошибка сервера';
    const error = response.data?.error || fallbackError;

    if (!silent) {
      showToast(error, 'error');
    }
    if (onError) onError(response.data);

    return null;
  } catch (error) {
    const status = error.response?.status;
    const serverMessage =
      error.response?.data?.error || error.response?.data?.message;

    if (!silent) {
      let message =
        serverMessage ||
        errorMessage ||
        'Ошибка сервера. Пожалуйста, повторите попытку позже';

      switch (status) {
        case 400:
          message ||= 'Неверный запрос';
          break;
        case 401:
          message ||= 'Неавторизован. Пожалуйста, войдите в систему';
          break;
        case 403:
          message ||= 'Доступ запрещён';
          break;
        case 404:
          message ||= 'Ресурс не найден';
          break;
        case 409:
          message ||= 'Конфликт данных';
          break;
        case 422:
          message ||= 'Ошибка валидации';
          break;
        case 429:
          message ||= 'Слишком много запросов. Повторите позже';
          break;
        case 500:
          message ||= 'Внутренняя ошибка сервера';
          break;
        default:
          message ||= `Ошибка: ${status}`;
          break;
      }

      showToast(message, 'error');
    }

    if (onError) onError(error.response?.data);
    return null;
  }
}
