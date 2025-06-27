import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Неверный формат почты')
    .required('Обязательное поле'),

  password: Yup.string().required('Обязательное поле'),
});
