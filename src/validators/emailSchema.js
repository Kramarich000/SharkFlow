import * as Yup from 'yup';

export const emailSchema = Yup.string()
  .email('Неверный формат email')
  .required('Обязательное поле');
