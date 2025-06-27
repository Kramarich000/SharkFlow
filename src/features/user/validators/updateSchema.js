import * as Yup from 'yup';

export const updateSchema = Yup.object().shape({
  confirmationCode: Yup.string()
    .matches(/^\d{6}$/, 'Код должен состоять из 6 цифр')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
  login: Yup.string()
    .max(30, 'Логин не может быть длиннее 30 символов')
    .optional(),
});
